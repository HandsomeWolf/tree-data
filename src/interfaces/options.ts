type TraversalMethod = "BFS" | "DFS";

export interface KeyValueObject {
  [key: string]: any;
}

export interface DefaultOptions {
  /**
   * 树形数据结构中节点唯一标识的键名，默认值为id
   */
  idKey?: string;
  /**
   * 树形数据结构中父节点的键名，默认值为parentId
   */
  parentIdKey?: string;
  /**
   * 树形数据结构中子节点的键名，默认值为children
   */
  childrenKey?: string;
}

export interface TreeToDataOptions
  extends Omit<DefaultOptions, "idKek" | "parentIdKey"> {
  /**
   * 深度优先遍历(DFS)  广度优先遍历(BFS)
   */
  traversalMethod?: TraversalMethod;
}

export interface TreeDimensionsOptions
  extends Omit<DefaultOptions, "idKek" | "parentIdKey"> {}

export interface DataToTreeOptions extends DefaultOptions {}
export interface InsertOptions extends Omit<DefaultOptions, "parentIdKey"> {}
export interface ModifyOptions extends Omit<DefaultOptions, "parentIdKey"> {}
export interface PathOptions extends Omit<DefaultOptions, "parentIdKey"> {}

export interface CreateMapOptions extends DefaultOptions {}

export interface DeleteOptions extends Omit<DefaultOptions, "parentIdKey"> {
  /**
   * 是否删除空的子元素数组，默认为false
   */
  isDeleteEmptyChildren?: boolean;
  /**
   * 是否删除自己，默认为true
   */
  deleteSelf?: boolean; // Determine whether to delete itself (确定是否删除自己)
}

export interface GetParentNodeByIdOptions extends PathOptions {
  /**
   * 向上查找的级数，默认值为1
   */
  levelsUp?: number;
  /**
   * 如果没有找到指定级别的父节点，是否返回根节点，默认值为false
   */
  returnRootIfAbsent?: boolean;
  /**
   * 是否返回的父节点对象是否包含其子节点，默认值为false
   */
  includeChildren?: boolean;
}
