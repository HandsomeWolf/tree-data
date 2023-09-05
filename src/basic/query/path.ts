import {
  type KeyValueObject,
  type PathOptions,
} from "../../interfaces/options";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
// 使用栈实现深度优先搜索 (Implement DFS using stack)
export function getNodePathById(
  tree: KeyValueObject[],
  targetId: any,
  options: PathOptions = DEFAULT_OPTIONS,
): KeyValueObject[] | null {
  const { idKey = DEFAULT_ID_KEY, childrenKey = DEFAULT_CHILDREN_KEY } =
    options;

  // 创建一个栈，用于存储节点和路径 (Create a stack to store nodes and paths)
  const stack: { node: KeyValueObject; path: KeyValueObject[] }[] = tree.map(
    (node) => ({
      node,
      path: [node],
    }),
  );

  while (stack.length > 0) {
    const { node, path } = stack.pop()!;

    if (node[idKey] === targetId) {
      return path;
    }

    const children = node[childrenKey] as KeyValueObject[];
    if (children) {
      for (const child of children) {
        stack.push({ node: child, path: [...path, child] });
      }
    }
  }

  return null;
}
