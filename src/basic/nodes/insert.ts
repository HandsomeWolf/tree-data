import _ from "lodash";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
import { createMap } from "../utils/create-map";
import {
  type InsertOptions,
  type KeyValueObject,
} from "../../interfaces/options";

export function insertNodesByIds(
  tree: KeyValueObject[],
  parentIds: (number | string)[],
  newNodes: KeyValueObject[],
  options: InsertOptions = DEFAULT_OPTIONS,
): KeyValueObject[] {
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
  tree: KeyValueObject[],
  queryFunction: (node: KeyValueObject) => boolean,
  newNodes: KeyValueObject[],
  options: InsertOptions = DEFAULT_OPTIONS,
): KeyValueObject[] {
  const { idKey = DEFAULT_ID_KEY, childrenKey = DEFAULT_CHILDREN_KEY } =
    options;

  const newTree = _.cloneDeep(tree);
  const nodeMap = createMap(newTree, options);

  for (const [_key, node] of nodeMap) {
    if (queryFunction(node)) {
      const newNode = _.find(newTree, { [idKey]: node[idKey] });
      if (newNode) {
        newNode[childrenKey] = newNode[childrenKey] || [];
        newNode[childrenKey].push(...newNodes);
      }
    }
  }

  return newTree;
}
