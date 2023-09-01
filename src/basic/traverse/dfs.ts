// 深度优先遍历 (Depth-First Search)
export function traverseDFS(
  tree: TreeNode[],
  callback: (node: TreeNode) => void,
) {
  for (const node of tree) {
    callback(node);
    if (node.children) {
      traverseDFS(node.children, callback);
    }
  }
}
