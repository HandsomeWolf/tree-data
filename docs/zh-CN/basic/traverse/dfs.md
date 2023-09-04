## 功能

深度优先遍历 (Depth-First Search)


## 语法

```TypeScript
traverseDFS(tree, callback)
```

## 示例

```TypeScript
import { traverseDFS } from "@handsomewolf/tree-data";

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

const result = traverseDFS(tree, (node) => result.push(node.id));
console.log(result)

// 输出：[1, 2, 4, 5, 6, 3]

```