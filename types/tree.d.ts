interface TreeNode {
  [key: string]: any;
}

type method="BFS" | "DFS"

interface DefaultOptions{
  childrenKey?: string;
  parentIdKey?: string;
  idKey?: string;
  rootParentIdValue?:any
  method: method,
}

interface DeleteOptions extends DefaultOptions {
  isDeleteEmptyChildren?: boolean; // Determine whether to delete empty children arrays (确定是否删除空的子元素数组)
  deleteSelf?: boolean; // Determine whether to delete itself (确定是否删除自己)
}

interface TreeToDataOption {
  childrenKey?:string;
  method:method
}
