import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
import { createMap } from "../utils/create-map";

export function insertNodesById(
  tree: TreeNode[],
  parentId: number | string,
  newNodes: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const childrenKey = options.childrenKey || DEFAULT_CHILDREN_KEY;
  const idKey = options.idKey || DEFAULT_OPTIONS.idKey;
  const nodeMap = createMap(tree, options);
  const parentNode = nodeMap.get(parentId);

  const newTree = JSON.parse(JSON.stringify(tree));

  if (parentNode) {
    const newParentNode = newTree.find(
      (node: TreeNode) => node[idKey] === parentId,
    );
    newParentNode[childrenKey] = newParentNode[childrenKey] || [];
    newParentNode[childrenKey].push(...newNodes);
  }

  return newTree;
}

export function insertNodes(
  tree: TreeNode[],
  queryFunction: (node: TreeNode) => boolean,
  newNodes: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const childrenKey = options.childrenKey || DEFAULT_CHILDREN_KEY;

  const nodeMap = createMap(tree, options);

  const newTree = JSON.parse(JSON.stringify(tree));

  for (const [_, node] of nodeMap) {
    if (queryFunction(node)) {
      const newNode = newTree.find((n: TreeNode) => n.id === node.id);
      newNode[childrenKey] = newNode[childrenKey] || [];
      newNode[childrenKey].push(...newNodes);
    }
  }

  return newTree;
}
