import _ from "lodash";
import {
  DEFAULT_CHILDREN_KEY,
  DEFAULT_ID_KEY,
  DEFAULT_OPTIONS,
} from "../../constants/parameters";
import {
  type DeleteOptions,
  type KeyValueObject,
} from "../../interfaces/options";
// 删除树节点的函数，通过ID
export function deleteNodesByIds(
  trees: KeyValueObject[],
  ids: number[],
  options: DeleteOptions = DEFAULT_OPTIONS,
): (KeyValueObject | null)[] {
  const {
    idKey = DEFAULT_ID_KEY,
    childrenKey = DEFAULT_CHILDREN_KEY,
    deleteSelf = true,
    isDeleteEmptyChildren = false,
  } = options;

  const idsToDelete = new Set(ids);
  const newTrees: KeyValueObject[] = _.cloneDeep(trees); // Create a new tree object (创建新的tree对象)

  for (const tree of newTrees) {
    const queue: KeyValueObject[] = [tree];
    const parents: { [key: string]: KeyValueObject | null } = {};

    while (!_.isEmpty(queue)) {
      const node = queue.shift() as KeyValueObject;

      if (idsToDelete.has(node[idKey])) {
        if (deleteSelf) {
          const parent = _.get(parents, node[idKey]);
          if (parent) {
            if (!parent.toBeDeletedChildren) {
              parent.toBeDeletedChildren = [];
            }
            parent.toBeDeletedChildren.push(node[idKey]); // Store the id of the child node to be deleted (存储待删除子节点的 id)
          }
        } else {
          // Delete all children of the node if deleteSelf is false (如果deleteSelf为false，删除节点的所有子节点)
          node[childrenKey] = [];
        }
      } else {
        const children = node[childrenKey] as KeyValueObject[];
        if (children) {
          for (const child of children) {
            parents[child[idKey]] = node;
            queue.push(child);
          }
        }
      }
    }

    for (const parent of Object.values(parents)) {
      if (parent && parent.toBeDeletedChildren) {
        _.remove(parent[childrenKey], (child: KeyValueObject) =>
          parent.toBeDeletedChildren.includes(child[idKey]),
        );
        delete parent.toBeDeletedChildren;
      }
    }

    if (isDeleteEmptyChildren) {
      const queue: KeyValueObject[] = [tree];
      while (!_.isEmpty(queue)) {
        const node = queue.shift() as KeyValueObject;
        const children = node[childrenKey] as KeyValueObject[];
        if (children) {
          if (children.length === 0) {
            delete node[childrenKey];
          } else {
            queue.push(...children);
          }
        }
      }
    }
  }

  return _.remove(newTrees, (node) => !idsToDelete.has(node[idKey]));
}

// 删除树节点的函数，通过删除函数
// 删除树节点的函数，通过回调函数
export function deleteNodes(
  trees: KeyValueObject[],
  predicate: (node: KeyValueObject) => boolean,
  options: DeleteOptions = DEFAULT_OPTIONS,
): (KeyValueObject | null)[] {
  const {
    idKey = DEFAULT_ID_KEY,
    childrenKey = DEFAULT_CHILDREN_KEY,
    deleteSelf = true,
    isDeleteEmptyChildren = false,
  } = options;

  const newTrees: KeyValueObject[] = _.cloneDeep(trees); // Create a new tree object (创建新的tree对象)

  for (const tree of newTrees) {
    const queue: KeyValueObject[] = [tree];
    const parents: { [key: string]: KeyValueObject | null } = {};

    while (!_.isEmpty(queue)) {
      const node = queue.shift() as KeyValueObject;

      if (predicate(node)) {
        if (deleteSelf) {
          const parent = _.get(parents, node[idKey]);
          if (parent) {
            if (!parent.toBeDeletedChildren) {
              parent.toBeDeletedChildren = [];
            }
            parent.toBeDeletedChildren.push(node[idKey]); // Store the id of the child node to be deleted (存储待删除子节点的 id)
          }
        } else {
          // Delete all children of the node if deleteSelf is false (如果deleteSelf为false，删除节点的所有子节点)
          node[childrenKey] = [];
        }
      } else {
        const children = node[childrenKey] as KeyValueObject[];
        if (children) {
          for (const child of children) {
            parents[child[idKey]] = node;
            queue.push(child);
          }
        }
      }
    }

    for (const parent of Object.values(parents)) {
      if (parent && parent.toBeDeletedChildren) {
        _.remove(parent[childrenKey], (child: KeyValueObject) =>
          parent.toBeDeletedChildren.includes(child[idKey]),
        );
        delete parent.toBeDeletedChildren;
      }
    }

    if (isDeleteEmptyChildren) {
      const queue: KeyValueObject[] = [tree];
      while (!_.isEmpty(queue)) {
        const node = queue.shift() as KeyValueObject;
        const children = node[childrenKey] as KeyValueObject[];
        if (children) {
          if (children.length === 0) {
            delete node[childrenKey];
          } else {
            queue.push(...children);
          }
        }
      }
    }
  }

  return _.remove(newTrees, (node) => !predicate(node));
}

// TODO:将两个函数的公共部分提取出来，以减少代码重复。此外，我们也可以考虑添加一些错误处理和边界条件检查，以提高代码的健壮性。
