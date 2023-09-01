import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";

// 修改树节点 (Modify tree nodes)
export function modifyNodes(
  tree: TreeNode[],
  modifyFunction: (node: TreeNode) => TreeNode,
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY } = options;
  const childrenKeyAsKeyOfTreeNode = childrenKey as keyof TreeNode;

  const queue = [...tree];
  const result: TreeNode[] = [];

  while (queue.length > 0) {
    const node = queue.shift() as TreeNode;

    // 创建一个新的节点或修改原始节点 (Create a new node or modify the original node)
    const newNode = { ...node };
    const modifiedNode = modifyFunction(newNode);

    // 修改子节点 (Modify the child nodes)
    const children = modifiedNode[childrenKeyAsKeyOfTreeNode] as TreeNode[];
    if (children) {
      for (let index = 0; index < children.length; index++) {
        children[index] = modifyFunction({ ...children[index] });
      }
      queue.push(...children);
      modifiedNode[childrenKeyAsKeyOfTreeNode] = children;
    }

    // 只有当节点是根节点时，才将其添加到结果数组中 (Only add the node to the result array when it is a root node)
    if (tree.includes(node)) {
      result.push(modifiedNode);
    }
  }

  return result;
}

// 根据ID修改节点 (Modify nodes by ID)
export function modifyNodesById(
  tree: TreeNode[],
  ids: number[],
  keyValuePairs: Partial<TreeNode>,
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY } = options;

  const childrenKeyAsKeyOfTreeNode = childrenKey as keyof TreeNode;

  const queue = [...tree];
  const result: TreeNode[] = [];
  while (queue.length > 0) {
    const node = queue.shift() as TreeNode;

    // 如果节点的ID在ids数组中，修改节点数据 (If the node's ID is in the ids array, modify the node data)
    if (ids.includes(node.id)) {
      for (const key of Object.keys(keyValuePairs)) {
        node[key as keyof TreeNode] = keyValuePairs[key as keyof TreeNode];
      }
    }

    // 修改子节点 (Modify the child nodes)
    const children = node[childrenKeyAsKeyOfTreeNode] as TreeNode[];
    if (children) {
      for (let index = 0; index < children.length; index++) {
        children[index] = modifyNodesById(
          [children[index]],
          ids,
          keyValuePairs,
          options,
        )[0];
      }
      queue.push(...children);
      node[childrenKeyAsKeyOfTreeNode] = children;
    }

    result.push(node);
  }

  return result;
}
