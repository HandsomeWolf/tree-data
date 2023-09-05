import _ from "lodash";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
import {
  type KeyValueObject,
  type ModifyOptions,
} from "../../interfaces/options";

// 根据ID修改节点 (Modify nodes by ID)
export function modifyNodesByIds(
  tree: KeyValueObject[],
  ids: number[],
  keyValuePairs: Partial<KeyValueObject>,
  options: ModifyOptions = DEFAULT_OPTIONS,
): KeyValueObject[] {
  const { idKey = DEFAULT_ID_KEY, childrenKey = DEFAULT_CHILDREN_KEY } =
    options;

  const idsToModify = new Set(ids);
  const newTree: KeyValueObject[] = _.cloneDeep(tree);
  const queue = [...newTree];

  while (queue.length > 0) {
    const node = queue.shift() as KeyValueObject;

    if (idsToModify.has(node[idKey])) {
      for (const key of Object.keys(keyValuePairs)) {
        node[key as keyof KeyValueObject] =
          keyValuePairs[key as keyof KeyValueObject];
      }
    }

    // 修改子节点 (Modify the child nodes)
    const children = node[childrenKey] as KeyValueObject[];
    if (children) {
      queue.push(...children);
    }
  }

  return newTree;
}

// 修改树节点 (Modify tree nodes)
export function modifyNodes(
  tree: KeyValueObject[],
  modifyFunction: (node: KeyValueObject) => KeyValueObject,
  options: ModifyOptions = DEFAULT_OPTIONS,
): KeyValueObject[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY } = options;
  const childrenKeyAsKeyOfKeyValueObject = childrenKey as keyof KeyValueObject;

  const newTree: KeyValueObject[] = _.cloneDeep(tree);
  const queue = [...newTree];

  while (queue.length > 0) {
    const node = queue.shift() as KeyValueObject;

    // 创建一个新的节点或修改原始节点 (Create a new node or modify the original node)
    const modifiedNode = modifyFunction(node);

    // 修改子节点 (Modify the child nodes)
    const children = modifiedNode[
      childrenKeyAsKeyOfKeyValueObject
    ] as KeyValueObject[];
    if (children) {
      queue.push(...children);
    }
  }

  return newTree;
}
