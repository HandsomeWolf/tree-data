// 树形数据搜索 (Search tree data)
export function getNodes(
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
  const stack: TreeNode[] = [...tree];

  while (stack.length > 0) {
    const node = stack.pop()!;
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
      stack.push(...children);
    }
  }

  return findAll ? result : null;
}
