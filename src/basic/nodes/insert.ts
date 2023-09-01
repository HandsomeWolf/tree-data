import _ from "lodash";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
import { createMap } from "../utils/create-map";

export function insertNodesById(
  tree: TreeNode[],
  parentId: number | string,
  newNodes: TreeNode[],
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY, idKey = DEFAULT_ID_KEY } =
    options;
  const nodeMap = createMap(tree, options);
  const parentNode = nodeMap.get(parentId);

  const newTree = _.cloneDeep(tree);

  if (parentNode) {
    const newParentNode = _.find(newTree, { [idKey]: parentId });
    if (newParentNode) {
      newParentNode[childrenKey] = newParentNode[childrenKey] || [];
      newParentNode[childrenKey].push(...newNodes);
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

  const nodeMap = createMap(tree, options);

  const newTree = _.cloneDeep(tree);

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
