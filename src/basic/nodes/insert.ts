import _ from "lodash";
import { produce } from "immer";

import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
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

  const nodeMap = createMap(tree, options);

  const newTree = produce(tree, () => {
    for (const parentId of parentIds) {
      const parentNode = nodeMap.get(parentId);

      if (parentNode) {
        parentNode[childrenKey] = parentNode[childrenKey] || [];
        parentNode[childrenKey].push(...newNodes);
      }
    }
  });

  return newTree;
}

export function insertNodes(
  tree: TreeNode[],
  queryFunction: (node: TreeNode) => boolean,
  newNodes: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { idKey = DEFAULT_ID_KEY, childrenKey = DEFAULT_CHILDREN_KEY } =
    options;

  const nodeMap = createMap(tree, options);

  const newTree = produce(tree, (draftTree) => {
    for (const [_key, node] of nodeMap) {
      if (queryFunction(node)) {
        const newNode = _.find(draftTree, { [idKey]: node[idKey] });
        if (newNode) {
          newNode[childrenKey] = newNode[childrenKey] || [];
          newNode[childrenKey].push(...newNodes);
        }
      }
    }
  });

  return newTree;
}
