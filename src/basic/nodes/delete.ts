import _ from "lodash";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
// 删除树节点的函数，通过ID
export function deleteNodesByIds(
  tree: TreeNode[],
  ids: number[],
  options: DeleteOptions = DEFAULT_OPTIONS,
): (TreeNode | null)[] {
  const {
    idKey = DEFAULT_ID_KEY,
    childrenKey = DEFAULT_CHILDREN_KEY,
    deleteSelf = true,
    isDeleteEmptyChildren = false,
  } = options;

  const idsToDelete = new Set(ids);
  const newTree: TreeNode[] = _.cloneDeep(tree); // Create a new tree object (创建新的tree对象)
  const queue: TreeNode[] = [...newTree];
  const parents: { [key: string]: TreeNode | null } = {};

  while (!_.isEmpty(queue)) {
    const node = queue.shift() as TreeNode;

    if (idsToDelete.has(node[idKey])) {
      if (deleteSelf) {
        const parent = _.get(parents, node[idKey]);
        if (parent) {
          if (!parent.toBeDeletedChildren) {
            parent.toBeDeletedChildren = [];
          }
          parent.toBeDeletedChildren.push(node[idKey]); // Store the id of the child node to be deleted (存储待删除子节点的 id)
        }
      } else {
        // Delete all children of the node if deleteSelf is false (如果deleteSelf为false，删除节点的所有子节点)
        node[childrenKey] = [];
      }
    } else {
      const children = node[childrenKey] as TreeNode[];
      if (children) {
        for (const child of children) {
          parents[child[idKey]] = node;
          queue.push(child);
        }
      }
    }
  }
  for (const parent of Object.values(parents)) {
    if (parent && parent.toBeDeletedChildren) {
      _.remove(parent[childrenKey], (child: TreeNode) =>
        parent.toBeDeletedChildren.includes(child[idKey]),
      );
      delete parent.toBeDeletedChildren;
    }
  }

  if (isDeleteEmptyChildren) {
    const queue: TreeNode[] = [...newTree];
    while (!_.isEmpty(queue)) {
      const node = queue.shift() as TreeNode;
      const children = node[childrenKey] as TreeNode[];
      if (children) {
        if (children.length === 0) {
          delete node[childrenKey];
        } else {
          queue.push(...children);
        }
      }
    }
  }

  return _.remove(newTree, (node) => !idsToDelete.has(node[idKey]));
}

// 删除树节点的函数，通过删除函数
export function deleteNodes(
  tree: TreeNode[],
  deleteFunction: (node: TreeNode) => boolean,
  options: DeleteOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const {
    idKey = DEFAULT_ID_KEY,
    childrenKey = DEFAULT_CHILDREN_KEY,
    deleteSelf = true,
    isDeleteEmptyChildren = false,
  } = options;

  const newTree: TreeNode[] = _.cloneDeep(tree); // 创建新的tree对象
  const queue: TreeNode[] = [...newTree];
  const parents: { [key: string]: TreeNode | null } = {};

  while (!_.isEmpty(queue)) {
    const node = queue.shift() as TreeNode;

    if (deleteFunction(node)) {
      if (deleteSelf) {
        const parent = _.get(parents, node[idKey]);
        if (parent) {
          if (!parent.toBeDeletedChildren) {
            parent.toBeDeletedChildren = [];
          }
          parent.toBeDeletedChildren.push(node[idKey]); // 存储待删除子节点的 id
        }
      }
    } else {
      const children = node[childrenKey] as TreeNode[];
      if (children) {
        for (const child of children) {
          parents[child[idKey]] = node;
          queue.push(child);
        }
      }
    }
  }

  for (const parent of Object.values(parents)) {
    if (parent && parent.toBeDeletedChildren) {
      _.remove(parent[childrenKey], (child: TreeNode) =>
        parent.toBeDeletedChildren.includes(child[idKey]),
      );
      delete parent.toBeDeletedChildren;
    }
  }

  if (isDeleteEmptyChildren) {
    for (const parent of Object.values(parents)) {
      if (parent && _.isEmpty(parent[childrenKey])) {
        delete parent[childrenKey];
      }
    }
  }

  return _.remove(newTree, (node) => !deleteFunction(node));
}

// TODO:将两个函数的公共部分提取出来，以减少代码重复。此外，我们也可以考虑添加一些错误处理和边界条件检查，以提高代码的健壮性。