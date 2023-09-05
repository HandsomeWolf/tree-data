import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";

export function treeToData(
  tree: TreeNode,
  options: DefaultOptions = DEFAULT_OPTIONS,
) {
  if (typeof tree !== "object" || Object.keys(tree).length === 0) {
    throw new Error("Invalid tree: Tree must be a non-empty object."); // 抛出错误：树必须是非空对象
  }

  const { childrenKey = DEFAULT_CHILDREN_KEY, method = "BFS" } = options;
  const data: TreeNode[] = [];
  const queueOrStack: TreeNode[] = [tree];

  const getNode = (
    method === "BFS" ? queueOrStack.shift : queueOrStack.pop
  ).bind(queueOrStack);

  while (queueOrStack.length > 0) {
    const node: TreeNode | undefined = getNode();

    if (!node) {
      throw new Error("Unexpected error: Node is undefined."); // 抛出错误：节点未定义
    }

    if (node[childrenKey]) {
      const childrenNodes =
        method === "BFS" ? node[childrenKey] : node[childrenKey];
      queueOrStack.push(...childrenNodes);
      delete node[childrenKey];
    }
    data.push(node);
  }

  return data;
}
