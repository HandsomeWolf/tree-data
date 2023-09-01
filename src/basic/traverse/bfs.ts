// 广度优先遍历 (Breadth-First Search)
export function traverseBFS(
  tree: TreeNode[],
  callback: (node: TreeNode) => void,
) {
  const queue: TreeNode[] = [...tree];
  while (queue.length > 0) {
    const node = queue.shift() as TreeNode;
    callback(node);
    if (node.children) {
      queue.push(...node.children);
    }
  }
}
