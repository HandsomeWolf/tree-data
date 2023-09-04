## 功能

在指定的树形结构中查找特定的节点，并返回从根节点到该节点的路径。使用栈（Stack）来实现深度优先搜索（DFS）。

## 语法

```TypeScript
getNodePathById(tree, targetId, options)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| idKey | String | id的键名，默认为 `id` |
| childrenKey | String | children的键名，默认为 `children` |

## 示例

```TypeScript
import { getNodePathById } from "@handsomewolf/tree-data";

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

const result = getNodePathById(tree, 6)
console.log(result)

// 输出：
// [
//   {
//     id: 1,
//     children: [
//       {
//         id: 2,
//         children: [
//           { id: 4, children: [{ id: 5, children: [{ id: 6 }] }] },
//         ],
//       },
//       { id: 3 },
//     ],
//   },
//   {
//     id: 2,
//     children: [{ id: 4, children: [{ id: 5, children: [{ id: 6 }] }] }],
//   },
//   { id: 4, children: [{ id: 5, children: [{ id: 6 }] }] },
//   { id: 5, children: [{ id: 6 }] },
//   { id: 6 },
// ]
```

自定义键名

```TypeScript
import { getNodePathById } from "@handsomewolf/tree-data";

const tree = [
  {
    myId: 1,
    myChildren: [
      {
        myId: 2,
        myChildren: [
          {
            myId: 4,
            myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }],
          },
        ],
      },
      { myId: 3 },
    ],
  },
];

const result =  getNodePathById(tree, 6, {
                  idKey: "myId",
                  childrenKey: "myChildren",
                })
console.log(result)

// 输出：
// [
//   {
//     myId: 1,
//     myChildren: [
//       {
//         myId: 2,
//         myChildren: [
//           {
//             myId: 4,
//             myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }],
//           },
//         ],
//       },
//       { myId: 3 },
//     ],
//   },
//   {
//     myId: 2,
//     myChildren: [
//       { myId: 4, myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }] },
//     ],
//   },
//   { myId: 4, myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }] },
//   { myId: 5, myChildren: [{ myId: 6 }] },
//   { myId: 6 },
// ]
```