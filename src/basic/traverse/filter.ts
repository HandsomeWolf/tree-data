import _ from "lodash";

export function filterTree(
  tree: TreeNode,
  options?: {
    include?: { [key: string]: any[] };
    exclude?: { [key: string]: any[] };
    childrenKey?: string;
    idKey?: string;
    isDeleteEmptyChildren?: boolean;
  },
) {
  const idKey = options?.idKey || "id";
  const childrenKey = options?.childrenKey || "children";
  const isDeleteEmptyChildren = options?.isDeleteEmptyChildren || false;

  const newTree: TreeNode = _.cloneDeep(tree);
  const queue: TreeNode[] = [newTree];
  const parents: { [key: string]: TreeNode[] } = {};

  let includeExists = false; // Add a flag to check if any node satisfies the include condition (添加一个标志来检查是否有任何节点满足 include 条件)

  while (!_.isEmpty(queue)) {
    const node = queue.shift() as TreeNode;

    if (!Object.prototype.hasOwnProperty.call(node, idKey)) {
      console.warn(
        `Node is missing '${idKey}' field. You may need to use the optional parameter {idKey: 'your custom id'}`,
      );
    }

    if (options?.exclude) {
      markNodesForDeletion(node, options.exclude, idKey, parents);
    }

    if (options?.include) {
      const includeResult = markNodesForDeletion(
        node,
        options.include,
        idKey,
        parents,
        true,
      );
      if (includeResult) {
        includeExists = true; // If any node satisfies the include condition, set the flag to true (如果有任何节点满足 include 条件，将标志设置为 true)
      }
    }

    const children = node[childrenKey as keyof TreeNode] as TreeNode[];
    if (children) {
      for (const child of children) {
        if (!parents[child[idKey]]) {
          parents[child[idKey]] = [];
        }
        parents[child[idKey]].push(node);
        queue.push(child);
      }
    }
  }

  // If the include option is set and no node satisfies the include condition, return null (如果设置了 include 选项并且没有节点满足 include 条件，返回 null)
  if (options?.include && !includeExists) {
    return null;
  }

  for (const parentList of Object.values(parents)) {
    for (const parent of parentList) {
      if (parent && parent.toBeDeletedChildren) {
        _.remove(parent[childrenKey], (child: TreeNode) =>
          parent.toBeDeletedChildren.includes(child[idKey]),
        );
        delete parent.toBeDeletedChildren;
      }
    }
  }

  if (isDeleteEmptyChildren) {
    for (const parentList of Object.values(parents)) {
      for (const parent of parentList) {
        if (parent && _.isEmpty(parent[childrenKey])) {
          delete parent[childrenKey];
        }
      }
    }
  }

  return newTree;
}
function markNodesForDeletion(
  node: TreeNode,
  filter: { [key: string]: any[] },
  idKey: string,
  parents: { [key: string]: TreeNode[] },
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
  node: TreeNode,
  includeIds: any[],
  key: string,
): boolean {
  const stack: TreeNode[] = [node];
  while (stack.length > 0) {
    const current = stack.pop() as TreeNode;
    const children = current.children || [];
    for (const child of children) {
      if (includeIds.includes(child[key])) {
        return false;
      }
      if (
        child.children &&
        child.children.some((grandChild: TreeNode) =>
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
