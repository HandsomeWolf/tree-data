interface TreeNode {
  [key: string]: any;
}

interface DefaultOptions{
  childrenKey?: string;
  parentIdKey?: string;
  idKey?: string;
  rootParentIdValue?:any
}

interface DeleteOptions extends DefaultOptions {
  isDeleteEmptyChildren?: boolean; // Determine whether to delete empty children arrays (确定是否删除空的子元素数组)
  deleteSelf?: boolean; // Determine whether to delete itself (确定是否删除自己)
}
