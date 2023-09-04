import _ from "lodash";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";

// 根据ID修改节点 (Modify nodes by ID)
export function modifyNodesByIds(
  tree: TreeNode[],
  ids: number[],
  keyValuePairs: Partial<TreeNode>,
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { idKey = DEFAULT_ID_KEY, childrenKey = DEFAULT_CHILDREN_KEY } =
    options;

  const idsToModify = new Set(ids);
  const newTree: TreeNode[] = _.cloneDeep(tree);
  const queue = [...newTree];

  while (queue.length > 0) {
    const node = queue.shift() as TreeNode;

    if (idsToModify.has(node[idKey])) {
      for (const key of Object.keys(keyValuePairs)) {
        node[key as keyof TreeNode] = keyValuePairs[key as keyof TreeNode];
      }
    }

    // 修改子节点 (Modify the child nodes)
    const children = node[childrenKey] as TreeNode[];
    if (children) {
      queue.push(...children);
    }
  }

  return newTree;
}

// 修改树节点 (Modify tree nodes)
export function modifyNodes(
  tree: TreeNode[],
  modifyFunction: (node: TreeNode) => TreeNode,
  options: DefaultOptions = DEFAULT_OPTIONS,
): TreeNode[] {
  const { childrenKey = DEFAULT_CHILDREN_KEY } = options;
  const childrenKeyAsKeyOfTreeNode = childrenKey as keyof TreeNode;

  const newTree: TreeNode[] = _.cloneDeep(tree);
  const queue = [...newTree];

  while (queue.length > 0) {
    const node = queue.shift() as TreeNode;

    // 创建一个新的节点或修改原始节点 (Create a new node or modify the original node)
    const modifiedNode = modifyFunction(node);

    // 修改子节点 (Modify the child nodes)
    const children = modifiedNode[childrenKeyAsKeyOfTreeNode] as TreeNode[];
    if (children) {
      queue.push(...children);
    }
  }

  return newTree;
}
