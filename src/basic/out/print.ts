interface TreeNode {
  value: any;
  children?: TreeNode[];
}

export function printTree(node: TreeNode, prefix: string = '', isLast: boolean = true): void {
  console.log(prefix + (isLast ? '└── ' : '├── ') + node.value);
  const childPrefix = prefix + (isLast ? '    ' : '│   ');

  if (node.children) {
      const len = node.children.length;
      node.children.forEach((child, i) => {
          printTree(child, childPrefix, i === len - 1);
      });
  }
}
