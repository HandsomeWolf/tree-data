import _ from "lodash";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
  DEFAULT_PARENT_ID_KEY,
  DELETED_OPTIONS,
  FILTERTREE_OPTIONS,
  GETNODES_OPTIONS,
  PARENTNODEBYID_OPTIONS,
  TREEDIMENSIONS__OPTIONS,
  TREE_TO_DATA_OPTIONS,
} from "./constants/parameters";
import {
  type DefaultOptions,
  type DeleteOptions,
  type FilterTree,
  type GetNodesOptions,
  type GetParentNodeByIdOptions,
  type KeyValueObject,
  type TreeDimensionsOptions,
  type TreeToDataOptions,
} from "./interfaces/options";
import { isArray2D } from "./utils";
export {
  TraversalMethod,
  DefaultOptions,
  DeleteOptions,
  FilterTree,
  GetNodesOptions,
  GetParentNodeByIdOptions,
  KeyValueObject,
  TreeDimensionsOptions,
  TreeToDataOptions,
} from "./interfaces/options";

export class TreeData {
  public result: KeyValueObject[] | null = null;
  public idKey: string = "id";
  public parentIdKey: string = "parentId";
  public childrenKey: string = "children";
  constructor(
    public trees: KeyValueObject[] = [],
    options: DefaultOptions = DEFAULT_OPTIONS,
  ) {
    this.trees = trees;
    this.idKey = options.idKey || DEFAULT_ID_KEY;
    this.parentIdKey = options.parentIdKey || DEFAULT_PARENT_ID_KEY;
    this.childrenKey = options.childrenKey || DEFAULT_CHILDREN_KEY;
  }

  static printTree(
    node: KeyValueObject,
    prefix: string = "",
    isLast: boolean = true,
  ): void {
    // eslint-disable-next-line no-console
    console.log(prefix + (isLast ? "└── " : "├── ") + node.value);

    const childPrefix = prefix + (isLast ? "    " : "│   ");

    if (node.children) {
      const length_ = node.children.length;
      for (const [index, child] of node.children.entries()) {
        this.printTree(child, childPrefix, index === length_ - 1);
      }
    }
  }

  treeToData(
    tree: KeyValueObject,
    options: TreeToDataOptions = TREE_TO_DATA_OPTIONS,
  ): KeyValueObject[] {
    if (typeof tree !== "object" || Object.keys(tree).length === 0) {
      throw new Error("Invalid tree: Tree must be a non-empty object."); // 抛出错误：树必须是非空对象
    }

    const { traversalMethod = "BFS" } = options;
    const data: KeyValueObject[] = [];
    const queueOrStack: KeyValueObject[] = [tree];

    const getNode = (
      traversalMethod === "BFS" ? queueOrStack.shift : queueOrStack.pop
    ).bind(queueOrStack);

    while (queueOrStack.length > 0) {
      const node: KeyValueObject | undefined = getNode();

      if (!node) {
        throw new Error("Unexpected error: Node is undefined."); // 抛出错误：节点未定义
      }

      if (node[this.childrenKey]) {
        const childrenNodes =
          traversalMethod === "BFS"
            ? node[this.childrenKey]
            : node[this.childrenKey];
        queueOrStack.push(...childrenNodes);
        delete node[this.childrenKey];
      }
      data.push(node);
    }
    return data;
  }

  treesToData(
    options: TreeToDataOptions = TREE_TO_DATA_OPTIONS,
  ): KeyValueObject[] | KeyValueObject[][] {
    const currentTree = this.result || this.trees;
    const newTree = _.cloneDeep(currentTree);
    const result = Array.isArray(newTree)
      ? newTree.map((tree) => this.treeToData(tree, options))
      : this.treeToData(newTree, options);
    return isArray2D(result) && result.length === 1
      ? (result[0] as KeyValueObject[])
      : result;
  }
  static traverseBFS(
    tree: KeyValueObject[],
    callback: (node: KeyValueObject) => void,
  ) {
    const queue: KeyValueObject[] = [...tree];
    while (queue.length > 0) {
      const node = queue.shift() as KeyValueObject;
      callback(node);
      if (node.children) {
        queue.push(...node.children);
      }
    }
  }
  static traverseDFS(
    tree: KeyValueObject[],
    callback: (node: KeyValueObject) => void,
  ) {
    for (const node of tree) {
      callback(node);
      if (node.children) {
        this.traverseDFS(node.children, callback);
      }
    }
  }

  getResult(): KeyValueObject | KeyValueObject[] | null {
    return this.result;
  }

  dataToTree(data: KeyValueObject[]): this {
    const newData = _.cloneDeep(data);
    const tree: KeyValueObject[] = [];

    // Use createMap to create a map (使用 createMap 创建映射)
    const nodeMap = this.createMap(newData);

    for (const datum of newData) {
      const parentId = datum[this.parentIdKey];
      if (parentId) {
        // Get the parent node from the map (从映射中获取父节点)
        const parent = nodeMap.get(parentId);
        if (parent) {
          // If the parent node doesn't have a children array, create one (如果父节点没有子节点数组，创建一个)
          if (!parent[this.childrenKey]) {
            parent[this.childrenKey] = [];
          }
          // Add the current node to the parent's children array (将当前节点添加到父节点的子节点数组中)
          parent[this.childrenKey].push(datum);
        }
      } else {
        // If the node doesn't have a parent ID, add it to the root of the tree (如果节点没有父节点ID，将其添加到树的根部)
        tree.push(datum);
      }
    }
    this.result = tree;

    return this;
  }

  deleteNodesByIds(
    ids: number[],
    options: DeleteOptions = DELETED_OPTIONS,
  ): this {
    const currentTree = this.result || this.trees;
    this.result = this.deleteNodesCommon(currentTree, new Set(ids), options);
    return this;
  }

  deleteNodes(
    predicate: (node: KeyValueObject) => boolean,
    options: DeleteOptions = DELETED_OPTIONS,
  ): this {
    const currentTree = this.result || this.trees;
    const idsToDelete = new Set<number>();
    for (const tree of currentTree) {
      const queue: KeyValueObject[] = [tree];
      while (!_.isEmpty(queue)) {
        const node = queue.shift() as KeyValueObject;
        if (predicate(node)) {
          idsToDelete.add(node.id);
        }
        const children = node.children as KeyValueObject[];
        if (children) {
          queue.push(...children);
        }
      }
    }
    this.result = this.deleteNodesCommon(currentTree, idsToDelete, options);
    return this;
  }

  insertNodesByIds(
    parentIds: (number | string)[],
    newNodes: KeyValueObject[],
  ): this {
    const currentTree = this.result || this.trees;
    const newTree = _.cloneDeep(currentTree);
    const nodeMap = this.createMap(newTree);

    for (const parentId of parentIds) {
      const parentNode = nodeMap.get(parentId);

      if (parentNode) {
        parentNode[this.childrenKey] = parentNode[this.childrenKey] || [];
        parentNode[this.childrenKey].push(...newNodes);
      }
    }

    this.result = newTree;
    return this;
  }
  insertNodes(
    queryFunction: (node: KeyValueObject) => boolean,
    newNodes: KeyValueObject[],
  ): this {
    const currentTree = this.result || this.trees;
    const newTree = _.cloneDeep(currentTree);
    const nodeMap = this.createMap(newTree);

    for (const [_key, node] of nodeMap) {
      if (queryFunction(node)) {
        const newNode = _.find(newTree, { [this.idKey]: node[this.idKey] });
        if (newNode) {
          newNode[this.childrenKey] = newNode[this.childrenKey] || [];
          newNode[this.childrenKey].push(...newNodes);
        }
      }
    }

    this.result = newTree;
    return this;
  }

  modifyNodesByIds(
    ids: number[],
    keyValuePairs: Partial<KeyValueObject>,
  ): this {
    const currentTree = this.result || this.trees;
    const idsToModify = new Set(ids);
    const newTree: KeyValueObject[] = _.cloneDeep(currentTree);
    const queue = [...newTree];

    while (queue.length > 0) {
      const node = queue.shift() as KeyValueObject;

      if (idsToModify.has(node[this.idKey])) {
        for (const key of Object.keys(keyValuePairs)) {
          node[key as keyof KeyValueObject] =
            keyValuePairs[key as keyof KeyValueObject];
        }
      }

      // 修改子节点 (Modify the child nodes)
      const children = node[this.childrenKey] as KeyValueObject[];
      if (children) {
        queue.push(...children);
      }
    }
    this.result = newTree;
    return this;
  }

  modifyNodes(modifyFunction: (node: KeyValueObject) => KeyValueObject): this {
    const currentTree = this.result || this.trees;
    const childrenKeyAsKeyOfKeyValueObject = this.childrenKey;

    const newTree: KeyValueObject[] = _.cloneDeep(currentTree);
    const queue = [...newTree];

    while (queue.length > 0) {
      const node = queue.shift() as KeyValueObject;

      // 创建一个新的节点或修改原始节点 (Create a new node or modify the original node)
      const modifiedNode = modifyFunction(node);

      // 修改子节点 (Modify the child nodes)
      const children = modifiedNode[
        childrenKeyAsKeyOfKeyValueObject
      ] as KeyValueObject[];
      if (children) {
        queue.push(...children);
      }
    }
    this.result = newTree;
    return this;
  }

  getTreeDimensions(
    options: TreeDimensionsOptions = TREEDIMENSIONS__OPTIONS,
  ): { depth: number; width: number }[] {
    const { index = undefined } = options;
    const currentTree = this.result || this.trees;

    // 如果 this.trees 是数组，根据 index 参数选择特定的树或所有的树
    // (If this.trees is an array, select a specific tree or all trees based on the index parameter)
    const trees = Array.isArray(currentTree)
      ? typeof index === "number"
        ? [currentTree[index]]
        : currentTree
      : [currentTree];

    const dimensions = trees.map((tree) => {
      let maxDepth = 0;
      let maxWidth = 0;

      // 使用队列来实现 BFS (Use a queue to implement BFS)
      const queue: KeyValueObject[] = [];

      // 确保节点至少有一个属性 (Ensure the node has at least one property)
      if (Object.keys(tree).length > 0) {
        queue.push(tree);
      }

      while (queue.length > 0) {
        const levelSize = queue.length;
        maxWidth = Math.max(maxWidth, levelSize);
        maxDepth++;

        // 处理当前层的所有节点 (Process all nodes at the current level)
        for (let index_ = 0; index_ < levelSize; index_++) {
          const node = queue.shift();
          if (node) {
            // 确保 node 不是 undefined (Ensure node is not undefined)
            const children = node[this.childrenKey];
            if (Array.isArray(children)) {
              queue.push(...children);
            }
          }
        }
      }

      return { depth: maxDepth, width: maxWidth };
    });

    return dimensions;
  }

  getNodePathById(targetId: number | string) {
    const currentTree = this.result || this.trees;
    // 创建一个栈，用于存储节点和路径 (Create a stack to store nodes and paths)
    const stack: { node: KeyValueObject; path: KeyValueObject[] }[] =
      currentTree.map((node) => ({
        node,
        path: [node],
      }));

    while (stack.length > 0) {
      const { node, path } = stack.pop()!;

      if (node[this.idKey] === targetId) {
        return path;
      }

      const children = node[this.childrenKey] as KeyValueObject[];
      if (children) {
        for (const child of children) {
          stack.push({ node: child, path: [...path, child] });
        }
      }
    }

    return null;
  }

  getParentNodeById(
    id: string | number,
    options: GetParentNodeByIdOptions = PARENTNODEBYID_OPTIONS,
  ): this {
    const {
      levelsUp = 1,
      returnRootIfAbsent = false,
      includeChildren = false,
    } = options;

    const path = this.getNodePathById(id);

    if (path && path.length > levelsUp) {
      const parentNode = { ...path.at(-1 - levelsUp) } || null; // 创建一个新的父节点对象 (Create a new parent node object)
      if (includeChildren && parentNode) {
        parentNode.children = path.at(-1 - levelsUp)?.children || []; // 从当前节点的子节点中过滤 (Filter from the children of the current node)
      } else if (parentNode) {
        delete parentNode.children; // 删除children属性 (Delete the children property)
      }
      this.result = [parentNode];
      return this;
    } else if (returnRootIfAbsent && path && path.length > 0) {
      const rootNode = { ...path.at(0) } ?? null; // 创建一个新的根节点对象 (Create a new root node object)
      if (includeChildren && rootNode) {
        rootNode.children = path.at(0)?.children || []; // 从根节点的子节点中过滤 (Filter from the children of the root node)
      } else if (rootNode) {
        delete rootNode.children; // 删除children属性 (Delete the children property)
      }
      this.result = [rootNode];
      return this;
    }
    this.result = null;
    return this;
  }

  getNodes(
    match: { [key: string]: any },
    options: GetNodesOptions = GETNODES_OPTIONS,
  ): this {
    const currentTree = this.result || this.trees;

    const findAll = options?.findAll || false;
    const includeChildren = options?.includeChildren || false;
    const result: KeyValueObject[] = [];
    const stack: KeyValueObject[] = [...currentTree];

    while (stack.length > 0) {
      const node = stack.pop()!;
      if (Object.keys(match).every((key) => node[key] === match[key])) {
        if (includeChildren) {
          if (findAll) {
            result.push(node);
          } else {
            this.result = [node];
            return this;
          }
        } else {
          const { [this.childrenKey]: _, ...nodeWithoutChildren } = node;
          if (findAll) {
            result.push(nodeWithoutChildren);
          } else {
            this.result = [nodeWithoutChildren];
            return this;
          }
        }
      }

      const children = node[
        this.childrenKey as keyof KeyValueObject
      ] as KeyValueObject[];
      if (children) {
        stack.push(...children);
      }
    }
    this.result = findAll ? result : null;
    return this;
  }
  filterTree(options: FilterTree = FILTERTREE_OPTIONS): this {
    const currentTree = this.result || this.trees;
    const isDeleteEmptyChildren = options?.isDeleteEmptyChildren || false;

    const newTree: KeyValueObject[] = _.cloneDeep(currentTree);
    const queue: KeyValueObject[] = [...newTree];
    const parents: { [key: string]: KeyValueObject[] } = {};

    let includeExists = false; // Add a flag to check if any node satisfies the include condition (添加一个标志来检查是否有任何节点满足 include 条件)

    while (!_.isEmpty(queue)) {
      const node = queue.shift() as KeyValueObject;

      if (!Object.prototype.hasOwnProperty.call(node, this.idKey)) {
        console.warn(
          `Node is missing '${this.idKey}' field. You may need to use the optional parameter {idKey: 'your custom id'}`,
        );
      }

      if (options?.exclude) {
        markNodesForDeletion(node, options.exclude, this.idKey, parents);
      }

      if (options?.include) {
        const includeResult = markNodesForDeletion(
          node,
          options.include,
          this.idKey,
          parents,
          true,
        );
        if (includeResult) {
          includeExists = true; // If any node satisfies the include condition, set the flag to true (如果有任何节点满足 include 条件，将标志设置为 true)
        }
      }

      const children = node[this.childrenKey] as KeyValueObject[];
      if (children) {
        for (const child of children) {
          if (!parents[child[this.idKey]]) {
            parents[child[this.idKey]] = [];
          }
          parents[child[this.idKey]].push(node);
          queue.push(child);
        }
      }
    }

    // If the include option is set and no node satisfies the include condition, return null (如果设置了 include 选项并且没有节点满足 include 条件，返回 null)
    if (options?.include && !includeExists) {
      this.result = null;
      return this;
    }

    for (const parentList of Object.values(parents)) {
      for (const parent of parentList) {
        if (parent && parent.toBeDeletedChildren) {
          _.remove(parent[this.childrenKey], (child: KeyValueObject) =>
            parent.toBeDeletedChildren.includes(child[this.idKey]),
          );
          delete parent.toBeDeletedChildren;
        }
      }
    }

    if (isDeleteEmptyChildren) {
      for (const parentList of Object.values(parents)) {
        for (const parent of parentList) {
          if (parent && _.isEmpty(parent[this.childrenKey])) {
            delete parent[this.childrenKey];
          }
        }
      }
    }
    this.result = newTree;
    return this;
  }
  // utils
  createMap(tree: KeyValueObject[]): Map<number | string, KeyValueObject> {
    const map = new Map<number | string, KeyValueObject>();

    // 使用队列代替堆栈 (Use queue instead of stack)
    const queue: KeyValueObject[] = [...tree];
    while (!_.isEmpty(queue)) {
      const node = queue.shift()!;
      map.set(node[this.idKey], node);
      if (node[this.childrenKey]) {
        queue.push(...node[this.childrenKey]);
      }
    }

    return map;
  }
  deleteNodesCommon(
    trees: KeyValueObject[],
    idsToDelete: Set<number>,
    options: DeleteOptions = DELETED_OPTIONS,
  ): KeyValueObject[] {
    const { deleteSelf = true, isDeleteEmptyChildren = false } = options;

    const newTrees: KeyValueObject[] = _.cloneDeep(trees); // 创建新的tree对象

    for (const tree of newTrees) {
      const queue: KeyValueObject[] = [tree];
      const parents: Map<number, KeyValueObject> = new Map();

      while (!_.isEmpty(queue)) {
        const node = queue.shift() as KeyValueObject;

        if (idsToDelete.has(node[this.idKey])) {
          if (deleteSelf) {
            const parent = parents.get(node[this.idKey]);
            if (parent) {
              if (!parent.toBeDeletedChildren) {
                parent.toBeDeletedChildren = new Set();
              }
              parent.toBeDeletedChildren.add(node[this.idKey]); // 存储待删除子节点的 id
            }
          } else {
            // 如果deleteSelf为false，删除节点的所有子节点
            node[this.childrenKey] = [];
          }
        } else {
          const children = node[this.childrenKey] as KeyValueObject[];
          if (children) {
            for (const child of children) {
              parents.set(child[this.idKey], node);
              queue.push(child);
            }
          }
        }
      }

      for (const parent of parents.values()) {
        if (parent && parent.toBeDeletedChildren) {
          _.remove(parent[this.childrenKey], (child: KeyValueObject) =>
            parent.toBeDeletedChildren.has(child[this.idKey]),
          );
          delete parent.toBeDeletedChildren;
        }
      }

      if (isDeleteEmptyChildren) {
        const queue: KeyValueObject[] = [tree];
        while (!_.isEmpty(queue)) {
          const node = queue.shift() as KeyValueObject;
          const children = node[this.childrenKey] as KeyValueObject[];
          if (children) {
            if (children.length === 0) {
              delete node[this.childrenKey];
            } else {
              queue.push(...children);
            }
          }
        }
      }
    }
    return _.remove(newTrees, (node) => !idsToDelete.has(node[this.idKey]));
  }

  sortNodes(
    compareFunction: (a: KeyValueObject, b: KeyValueObject) => number,
  ): this {
    const currentTree = this.result || this.trees;
    const newTree: KeyValueObject[] = _.cloneDeep(currentTree);
    const queue: KeyValueObject[] = [...newTree];

    while (queue.length > 0) {
      const node = queue.shift() as KeyValueObject;
      const children = node[this.childrenKey] as KeyValueObject[];
      if (children) {
        children.sort(compareFunction); // 对子节点进行排序
        queue.push(...children);
      }
    }

    this.result = newTree;
    return this;
  }
}

// filter
function markNodesForDeletion(
  node: KeyValueObject,
  filter: { [key: string]: any[] },
  idKey: string,
  parents: { [key: string]: KeyValueObject[] },
  isInclude?: boolean,
) {
  let includeExists = false; // Add a flag to check if the node satisfies the include condition (添加一个标志来检查节点是否满足 include 条件)

  for (const key of Object.keys(filter)) {
    const shouldDelete = isInclude
      ? !filter[key].includes(node[key]) &&
        areAllChildrenExcluded(node, filter[key], key)
      : filter[key].includes(node[key]);
    if (shouldDelete) {
      const parentList = _.get(parents, node[idKey]);
      if (parentList) {
        for (const parent of parentList) {
          if (!parent.toBeDeletedChildren) {
            parent.toBeDeletedChildren = [];
          }
          parent.toBeDeletedChildren.push(node[idKey]);
        }
      }
    } else if (isInclude) {
      includeExists = true; // If the node satisfies the include condition, set the flag to true (如果节点满足 include 条件，将标志设置为 true)
      let parentList = _.get(parents, node[idKey]);
      while (parentList && parentList.length > 0) {
        for (const parent of parentList) {
          _.remove(parent.toBeDeletedChildren, (id) => id === node[idKey]);
        }
        parentList = _.get(parents, parentList[0][idKey]);
      }
    }
  }

  return includeExists; // Return the flag (返回标志)
}

function areAllChildrenExcluded(
  node: KeyValueObject,
  includeIds: any[],
  key: string,
): boolean {
  const stack: KeyValueObject[] = [node];
  while (stack.length > 0) {
    const current = stack.pop() as KeyValueObject;
    const children = current.children || [];
    for (const child of children) {
      if (includeIds.includes(child[key])) {
        return false;
      }
      if (
        child.children &&
        child.children.some((grandChild: KeyValueObject) =>
          includeIds.includes(grandChild[key]),
        )
      ) {
        return false;
      }
      stack.push(child);
    }
  }
  return true;
}
