import { getParentNodeById } from "./parent";

// 查找兄弟节点的函数
export function findSiblingNodes(root: TreeNode, id: string): TreeNode[] {
  const parentNode = getParentNodeById(root, id);
  if (!parentNode || !parentNode.children) {
    return [];
  }

  return parentNode.children.filter((child) => child.id !== id);
}
