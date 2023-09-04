export function getTreeDimensions(
  tree: TreeNode[],
  childrenKey: string = "children",
): { depth: number; width: number } {
  let maxDepth = 0;
  let maxWidth = 0;

  function dfs(node: TreeNode | null | undefined, depth: number): void {
    if (node == null) {
      // 节点可能为 null 或 undefined (Node could be null or undefined)
      return;
    }

    maxDepth = Math.max(maxDepth, depth);
    maxWidth = Math.max(maxWidth, node[childrenKey]?.length || 0);

    const children = node[childrenKey] as TreeNode[];
    if (children) {
      for (const child of children) {
        dfs(child, depth + 1);
      }
    }
  }

  for (const node of tree) {
    dfs(node, 1);
  }

  return { depth: maxDepth, width: maxWidth };
}
