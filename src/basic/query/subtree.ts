// 获取子树 (Get subtree)
export function getSubtree(
  tree: TreeNode[],
  id: string | number,
): TreeNode | null {
  for (const node of tree) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const result = getSubtree(node.children, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
