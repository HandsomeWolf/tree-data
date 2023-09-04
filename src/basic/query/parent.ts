import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";

export function getParentNodeById(
  tree: TreeNode[],
  id: string | number,
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode | null {
  const { idKey = DEFAULT_ID_KEY, childrenKey = DEFAULT_CHILDREN_KEY } =
    options;
  const stack = [...tree];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node && node[childrenKey]) {
      for (const child of node[childrenKey]) {
        if (child[idKey] === id) {
          return node;
        }
        stack.push(child);
      }
    }
  }
  return null;
}
