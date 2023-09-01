// 树形数据过滤 (Filter tree data)
export function filterTree(
  tree: TreeNode[],
  options?: {
    include?: { [key: string]: any[] };
    exclude?: { [key: string]: any[] };
    childrenKey?: string;
    isDeleteEmptyChildren?: boolean;
  },
): TreeNode[] {
  const childrenKey = options?.childrenKey || "children";
  const isDeleteEmptyChildren = options?.isDeleteEmptyChildren || false;

  function filter(node: TreeNode): TreeNode | null {
    if (options?.exclude) {
      for (const key of Object.keys(options.exclude)) {
        if (options.exclude[key].includes(node[key])) {
          return null;
        }
      }
    }

    if (options?.include) {
      for (const key of Object.keys(options.include)) {
        if (!options.include[key].includes(node[key])) {
          return null;
        }
      }
    }

    const children = node[childrenKey as keyof TreeNode] as TreeNode[];
    if (children) {
      node[childrenKey as keyof TreeNode] = children
        .map((child) => filter(child))
        .filter((child: TreeNode | null): child is TreeNode => child !== null);
      if (
        isDeleteEmptyChildren &&
        node[childrenKey as keyof TreeNode].length === 0
      ) {
        return null;
      }

      // 如果子节点数组为空，删除children属性 (If the children array is empty, delete the children property)
      if (node[childrenKey as keyof TreeNode].length === 0) {
        delete node[childrenKey as keyof TreeNode];
      }
    }

    return node;
  }

  return tree
    .map((child) => filter(child))
    .filter((node: TreeNode | null): node is TreeNode => node !== null);
}
