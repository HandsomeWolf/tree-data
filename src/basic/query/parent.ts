import {
  type GetParentNodeByIdOptions,
  type KeyValueObject,
} from "../../interfaces/options";
import { PARENTNODEBYID_OPTIONS } from "../../constants/parameters";
import { getNodePathById } from "./path";

export function getParentNodeById(
  tree: KeyValueObject[],
  id: string | number,
  options: GetParentNodeByIdOptions = PARENTNODEBYID_OPTIONS,
): KeyValueObject | null {
  const {
    levelsUp = 1,
    returnRootIfAbsent = false,
    includeChildren = false,
  } = options;

  const path = getNodePathById(tree, id, options);

  if (path && path.length > levelsUp) {
    const parentNode = { ...path.at(-1 - levelsUp) } || null; // 创建一个新的父节点对象 (Create a new parent node object)
    if (includeChildren && parentNode) {
      parentNode.children = path.at(-1 - levelsUp)?.children || []; // 从当前节点的子节点中过滤 (Filter from the children of the current node)
    } else if (parentNode) {
      delete parentNode.children; // 删除children属性 (Delete the children property)
    }
    return parentNode;
  } else if (returnRootIfAbsent && path && path.length > 0) {
    const rootNode = { ...path.at(0) } ?? null; // 创建一个新的根节点对象 (Create a new root node object)
    if (includeChildren && rootNode) {
      rootNode.children = path.at(0)?.children || []; // 从根节点的子节点中过滤 (Filter from the children of the root node)
    } else if (rootNode) {
      delete rootNode.children; // 删除children属性 (Delete the children property)
    }
    return rootNode;
  }
  return null;
}
