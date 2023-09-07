# 功能

树形结构中插入新的节点。

`insertNodesByIds`函数通过父节点的ID来插入新的节点。它使用了映射（Map）来存储树中的节点。

`insertNodes`函数则通过一个查询函数来插入新的节点。查询函数接受一个节点作为参数，并返回一个布尔值以决定是否在该节点下插入新的节点。

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()
treeData.insertNodesByIds(parentIds, newNodes)

treeData.insertNodes(queryFunction, newNodes)
```

## insertNodesByIds

### 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
  {
    id: 1,
    children: [{ id: 2 }, { id: 3 }],
  },
  {
    id: 4,
    children: [{ id: 5 }],
  },
]);

const newNodes = [{ id: 6 }, { id: 7 }];

treeData.insertNodesByIds([1], newNodes);
const result = treeData.getResult();
console.log(result);

// 输出：
// [
//   {
//     id: 1,
//     children: [{ id: 2 }, { id: 3 }, { id: 6 }, { id: 7 }],
//   },
//   {
//     id: 4,
//     children: [{ id: 5 }],
//   },
// ]
```

自定义键名

```TypeScript

import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
  {
    myId: 1,
    myChildren: [{ myId: 2 }, { myId: 3 }],
  },
  {
    myId: 4,
    myChildren: [{ myId: 5 }],
  },
],{
  childrenKey: "myChildren",
  idKey: "myId",
});

const newNodes = [{ myId: 6 }, { myId: 7 }];

treeData.insertNodesByIds([1], newNodes);
const result = treeData.getResult();
console.log(result);

// 输出：
// [
//   {
//     myId: 1,
//     myChildren: [{ myId: 2 }, { myId: 3 }, { myId: 6 }, { myId: 7 }],
//   },
//   {
//     myId: 4,
//     myChildren: [{ myId: 5 }],
//   },
// ]

```



## insertNodes

### 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
  { id: 1, name: "Node 1", children: [] },
  { id: 2, name: "Node 2", children: [] },
  { id: 3, name: "Node 3", children: [] },
]);

const newNodes = [
  { id: 4, name: "Node 4", children: [] },
  { id: 5, name: "Node 5", children: [] },
];

treeData.insertNodes((node) => node.id === 2, newNodes);
const result = treeData.getResult();
console.log(result);

// 输出：
// [
//   { id: 1, name: "Node 1", children: [] },
//   {
//     id: 2,
//     name: "Node 2",
//     children: [
//       { id: 4, name: "Node 4", children: [] },
//       { id: 5, name: "Node 5", children: [] },
//     ],
//   },
//   { id: 3, name: "Node 3", children: [] },
// ]
```
