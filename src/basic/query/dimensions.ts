export function getTreeDimensions(
  tree: TreeNode[],
  childrenKey: string = "children",
): { depth: number; width: number } {
  let maxDepth = 0;
  let maxWidth = 0;

  // 使用队列来实现 BFS (Use a queue to implement BFS)
  const queue: TreeNode[] = [...tree];

  while (queue.length > 0) {
    const levelSize = queue.length;
    maxWidth = Math.max(maxWidth, levelSize);
    maxDepth++;

    // 处理当前层的所有节点 (Process all nodes at the current level)
    for (let index = 0; index < levelSize; index++) {
      const node = queue.shift();
      if (node) {
        // 确保 node 不是 undefined (Ensure node is not undefined)
        const children = node[childrenKey] as TreeNode[];
        if (children) {
          queue.push(...children);
        }
      }
    }
  }

  return { depth: maxDepth, width: maxWidth };
}
