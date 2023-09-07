## 功能

深度优先遍历 (DFS: Depth-First Search)


## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

TreeData.traverseDFS(tree, callback)
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
TreeData.traverseDFS(tree, (node) => result.push(node.id));
console.log(result)

// 输出：[1, 2, 4, 5, 6, 3]
```