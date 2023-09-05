import _ from "lodash";
import {
  type DataToTreeOptions,
  type KeyValueObject,
} from "../../interfaces/options";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_OPTIONS,
  DEFAULT_PARENT_ID_KEY,
} from "../../constants/parameters";
import { createMap } from "../utils/create-map";

// Convert data to tree structure (数据转树形结构)
export function dataToTree(
  data: KeyValueObject[],
  options: DataToTreeOptions = DEFAULT_OPTIONS,
) {
  const {
    parentIdKey = DEFAULT_PARENT_ID_KEY,
    childrenKey = DEFAULT_CHILDREN_KEY,
  } = options;

  const newData = _.cloneDeep(data);
  const tree: KeyValueObject[] = [];

  // Use createMap to create a map (使用 createMap 创建映射)
  const nodeMap = createMap(newData, options);

  for (const datum of newData) {
    const parentId = datum[parentIdKey];
    if (parentId) {
      // Get the parent node from the map (从映射中获取父节点)
      const parent = nodeMap.get(parentId);
      if (parent) {
        // If the parent node doesn't have a children array, create one (如果父节点没有子节点数组，创建一个)
        if (!parent[childrenKey]) {
          parent[childrenKey] = [];
        }
        // Add the current node to the parent's children array (将当前节点添加到父节点的子节点数组中)
        parent[childrenKey].push(datum);
      }
    } else {
      // If the node doesn't have a parent ID, add it to the root of the tree (如果节点没有父节点ID，将其添加到树的根部)
      tree.push(datum);
    }
  }

  return tree;
}
