// 树形数据搜索 (Search tree data)
export function searchTree(
  tree: TreeNode[],
  match: { [key: string]: any },
  options?: {
    findAll?: boolean;
    childrenKey?: string;
    includeChildren?: boolean;
  },
): TreeNode[] | TreeNode | null {
  const findAll = options?.findAll || false;
  const childrenKey = options?.childrenKey || "children";
  const includeChildren = options?.includeChildren || false;
  const result: TreeNode[] = [];
  for (const node of tree) {
    if (Object.keys(match).every((key) => node[key] === match[key])) {
      if (includeChildren) {
        if (findAll) {
          result.push(node);
        } else {
          return node;
        }
      } else {
        const { [childrenKey]: _, ...nodeWithoutChildren } = node;
        if (findAll) {
          result.push(nodeWithoutChildren);
        } else {
          return nodeWithoutChildren;
        }
      }
    }

    const children = node[childrenKey as keyof TreeNode] as TreeNode[];
    if (children) {
      const childResult = searchTree(children, match, options);
      if (childResult) {
        if (findAll) {
          result.push(...(childResult as TreeNode[]));
        } else {
          return childResult;
        }
      }
    }
  }

  return findAll ? result : null;
}
