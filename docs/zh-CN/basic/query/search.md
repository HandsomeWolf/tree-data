## 功能

给定的树形结构中查找特定的节点。它使用了栈（Stack）来实现深度优先搜索（DFS）

## 语法

```TypeScript
getNodes(tree, match, options)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| findAll | Boolean | 是否返回所有匹配的节点，默认为 `false` |
| includeChildren | Boolean | children的键名，默认为 `children` |
| childrenKey | String | 搜索函数在匹配节点时，是否包含其子节点，默认为 `false` |

## 示例

```TypeScript
import { getNodes } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    name: "one",
    children: [
      {
        id: 2,
        name: "two",
        children: [
          {
            id: 3,
            name: "three",
          },
        ],
      },
      {
        id: 4,
        name: "four",
      },
    ],
  },
  {
    id: 5,
  },
];

const result = getNodes(tree, { id: 2 })
console.log(result)

// 输出：
// {
//   id: 2,
//   name: "two",
// }

```

findAll -> true ; includeChildren -> true

```TypeScript
import { getNodes } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    name: "one",
    children: [
      {
        id: 2,
        name: "two",
        children: [
          {
            id: 3,
            name: "three",
          },
        ],
      },
      {
        id: 4,
        name: "four",
      },
    ],
  },
  {
    id: 5,
  },
];

const result = getNodes(
                tree,
                { id: 2 },
                { findAll: true, includeChildren: true },
              );
console.log(result)

// 输出：
// [
//   {
//     id: 2,
//     name: "two",
//     children: [
//       {
//         id: 3,
//         name: "three",
//       },
//     ],
//   },
// ]

```