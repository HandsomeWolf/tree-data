## 功能

广度优先遍历 (BFS: Breadth-First Search) 

## 语法（静态方法）

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

TreeData.traverseBFS(tree, callback)
```

## 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 4,
            children: [{ id: 5, children: [{ id: 6 }] }],
          },
        ],
      },
      { id: 3 },
    ],
  },
];

const result: number[] = [];
TreeData.traverseBFS(tree, (node) => result.push(node.id));
console.log(result)

// 输出：[1, 2, 3, 4, 5, 6]

```