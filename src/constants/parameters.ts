// export const DEFAULT_OPTIONS = {
//   childrenKey: "children",
//   parentIdKey: "parentId",
//   idKey: "id",
//   rootParentIdValue: null,
//   method: "BFS" as method,
// };

import { TraversalMethod } from "../interfaces/options";

export const DEFAULT_ID_KEY = "id";
export const DEFAULT_CHILDREN_KEY = "children";
export const DEFAULT_PARENT_ID_KEY = "parentId";

// default
export const DEFAULT_OPTIONS = {
  childrenKey: DEFAULT_CHILDREN_KEY,
  parentIdKey: DEFAULT_PARENT_ID_KEY,
  idKey: DEFAULT_ID_KEY,
};

// to-data
export const TREE_TO_DATA_OPTIONS = {
  childrenKey: DEFAULT_CHILDREN_KEY,
  traversalMethod: TraversalMethod.BFS,
};

export const DELETED_OPTIONS = {
  ...DEFAULT_OPTIONS,
  isDeleteEmptyChildren: false,
  deleteSelf: true,
};

export const PARENTNODEBYID_OPTIONS = {
  ...DEFAULT_OPTIONS,
  levelsUp: 1,
  returnRootIfAbsent: false,
  includeChildren: false,
};

export const TREEDIMENSIONS__OPTIONS = {
  index: undefined,
};

export const GETNODES_OPTIONS = {
  findAll: false,
  includeChildren: false,
};

export const FILTERTREE_OPTIONS = {
  isDeleteEmptyChildren: false,
};
