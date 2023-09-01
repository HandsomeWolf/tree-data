// 获取节点路径 (Get Node Path)
export function getNodePath(
  tree: TreeNode[],
  targetId: any,
  idKey: string = "id",
  childrenKey: string = "children",
): TreeNode[] | null {
  let path: TreeNode[] | null = null;

  function dfs(
    node: TreeNode,
    currentPath: TreeNode[],
    depth: number,
  ): boolean {
    currentPath.push(node);

    if (node[idKey] === targetId) {
      path = currentPath.slice(0, depth + 1);
      return true;
    }

    const children = node[childrenKey] as TreeNode[];
    if (children) {
      for (const child of children) {
        if (dfs(child, [...currentPath], depth + 1)) {
          return true;
        }
      }
    }

    return false;
  }

  for (const node of tree) {
    if (dfs(node, [], 0)) {
      break;
    }
  }

  return path;
}
