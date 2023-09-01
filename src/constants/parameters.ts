// 定义默认选项 (Define default options)
export const DEFAULT_OPTIONS = {
  childrenKey: "children",
  parentIdKey: "parentId",
  idKey: "id",
  rootParentIdValue: null,
};
export const DELETED_OPTIONS = {
  ...DEFAULT_OPTIONS,
  isDeleteEmptyChildren: false,
  deleteSelf: true,
};

export const DEFAULT_ID_KEY = "id";
export const DEFAULT_CHILDREN_KEY = "children";
export const DEFAULT_PARENT_ID_KEY = "parentId";
