## 功能

在树形结构中查找满足特定条件的节点，并返回从根节点到该节点的路径。使用栈（Stack）来实现深度优先搜索（DFS）。

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()
treeData.getNodePathById(targetId)
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

const treeData = new TreeData(tree);
const result = treeData.getNodePathById(6);
console.log(result);

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
import { TreeData } from "@handsomewolf/tree-data";

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

const treeData = new TreeData(tree, {
  idKey: "myId",
  childrenKey: "myChildren",
});
const result = treeData.getNodePathById(6);
console.log(result);

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

目标节点不存在

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

const result = getNodePathById(tree, 7);
console.log(result); // 输出：null
```