import _ from "lodash";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
import { createMap } from "../utils/create-map";

export function insertNodesById(
  tree: TreeNode[],
  parentIds: (number | string)[],
  newNodes: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY } = options;

  const newTree = _.cloneDeep(tree);
  const nodeMap = createMap(newTree, options);

  for (const parentId of parentIds) {
    const parentNode = nodeMap.get(parentId);

    if (parentNode) {
      parentNode[childrenKey] = parentNode[childrenKey] || [];
      parentNode[childrenKey].push(...newNodes);
    }
  }

  return newTree;
}

export function insertNodes(
  tree: TreeNode[],
  queryFunction: (node: TreeNode) => boolean,
  newNodes: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY } = options;

  const newTree = _.cloneDeep(tree);
  const nodeMap = createMap(newTree, options);

  for (const [_key, node] of nodeMap) {
    if (queryFunction(node)) {
      const newNode = _.find(newTree, { id: node.id });
      if (newNode) {
        newNode[childrenKey] = newNode[childrenKey] || [];
        newNode[childrenKey].push(...newNodes);
      }
    }
  }

  return newTree;
}
