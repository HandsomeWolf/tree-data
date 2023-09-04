import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
export function treeToData(
  tree: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY, method = "BFS" } = options;
  const data: TreeNode[] = [];
  const queueOrStack: TreeNode[] = [...tree];

  while (queueOrStack.length > 0) {
    const node: TreeNode =
      method === "BFS"
        ? { ...(queueOrStack.shift() as TreeNode) }
        : { ...(queueOrStack.pop() as TreeNode) };

    if (node[childrenKey]) {
      if (method === "BFS") {
        queueOrStack.push(...node[childrenKey]);
      } else {
        queueOrStack.push(...node[childrenKey].reverse()); // Add all children to the stack for DFS, but in reverse order
      }
      delete node[childrenKey];
    }
    data.push(node);
  }

  return data;
}
