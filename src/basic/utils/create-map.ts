import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";

// 创建节点映射 (Create node mapping)
export function createMap(
  tree: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): Map<number | string, TreeNode> {
  const childrenKey = options.childrenKey || DEFAULT_CHILDREN_KEY;
  const idKey = options.idKey || DEFAULT_ID_KEY;
  const map = new Map<number | string, TreeNode>();

  // 使用队列代替堆栈 (Use queue instead of stack)
  const queue: TreeNode[] = [...tree];
  while (queue.length > 0) {
    const node = queue.shift()!;
    map.set(node[idKey], node);
    if (node[childrenKey]) {
      queue.push(...node[childrenKey]);
    }
  }

  return map;
}