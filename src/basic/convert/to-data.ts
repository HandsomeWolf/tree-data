import {
  type KeyValueObject,
  type TreeToDataOptions,
} from "../../interfaces/options";
import {
  DEFAULT_CHILDREN_KEY,
  TREE_TO_DATA_OPTIONS,
} from "../../constants/parameters";

function treeToData(
  tree: KeyValueObject,
  options: TreeToDataOptions = TREE_TO_DATA_OPTIONS,
) {
  if (typeof tree !== "object" || Object.keys(tree).length === 0) {
    throw new Error("Invalid tree: Tree must be a non-empty object."); // 抛出错误：树必须是非空对象
  }

  const { childrenKey = DEFAULT_CHILDREN_KEY, traversalMethod = "BFS" } =
    options;
  const data: KeyValueObject[] = [];
  const queueOrStack: KeyValueObject[] = [tree];

  const getNode = (
    traversalMethod === "BFS" ? queueOrStack.shift : queueOrStack.pop
  ).bind(queueOrStack);

  while (queueOrStack.length > 0) {
    const node: KeyValueObject | undefined = getNode();

    if (!node) {
      throw new Error("Unexpected error: Node is undefined."); // 抛出错误：节点未定义
    }

    if (node[childrenKey]) {
      const childrenNodes =
        traversalMethod === "BFS" ? node[childrenKey] : node[childrenKey];
      queueOrStack.push(...childrenNodes);
      delete node[childrenKey];
    }
    data.push(node);
  }

  return data;
}

export function treesToData(
  trees: KeyValueObject | KeyValueObject[],
  options: TreeToDataOptions = TREE_TO_DATA_OPTIONS,
): KeyValueObject[] | KeyValueObject[][] {
  // 如果trees是一个数组，那么我们处理多个树
  // If trees is an array, then we process multiple trees
  return Array.isArray(trees)
    ? trees.map((tree) => treeToData(tree, options))
    : treeToData(trees, options);
}
