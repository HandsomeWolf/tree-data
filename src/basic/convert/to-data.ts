import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";

// Convert tree structure to data (树形结构转数据)
export function treeToData(
  tree: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY } = options;
  const data: TreeNode[] = [];
  const queue: TreeNode[] = [...tree];

  // Loop until the queue is empty (循环直到队列为空)
  while (queue.length > 0) {
    // Dequeue a node and clone it (出队一个节点并克隆它)
    const node: TreeNode = { ...(queue.shift() as TreeNode) };
    // If the node has children (如果节点有子节点)
    if (node[childrenKey]) {
      // Enqueue the children nodes (将子节点入队)
      queue.push(...node[childrenKey]);
      // Remove the children from the node (从节点中移除子节点)
      delete node[childrenKey];
    }
    data.push(node);
  }
  return data;
}
