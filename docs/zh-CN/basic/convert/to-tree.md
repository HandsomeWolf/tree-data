## 功能

将扁平结构的数据转换为树形结构的数据。

它首先创建一个映射，将每个节点的ID映射到对应的节点对象。

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData();
treeData.dataToTree(data);
```

## 可选参数

在创建 TreeData 实例时，可以给`new TreeData([], options)`第二个参数传入一个选项对象，该对象的属性如下：

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| idKey | String | id的键名，默认为 id |
| parentIdKey | String | parentId的键名，默认为 parentId |
| childrenKey | String | children的键名，默认为 children |

## 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const data = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
];

const treeData = new TreeData();
const result = treeData.dataToTree(data).getResult();
console.log(result);
// 输出：
// [
//   {
//     id: 1,
//     parentId: null,
//     children: [
//       { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
//       { id: 3, parentId: 1 },
//     ],
//   },
// ]
```

自定义键名：

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const data = [
  { myId: 1, myParentId: null, },
  { myId: 2, myParentId: 1 },
  { myId: 3, myParentId: 1 },
  { myId: 4, myParentId: 2 },
];

const treeData = new TreeData([], {
                  idKey: "myId",
                  parentIdKey: "myParentId",
                  childrenKey: "customChildren",
               });
const result = treeData.dataToTree(data).getResult();
console.log(result);
// 输出：
// [
//   {
//     myId: 1,
//     myParentId: null,
//     customChildren: [
//       {
//         myId: 2,
//         myParentId: 1,
//         customChildren: [{ myId: 4, myParentId: 2 }],
//       },
//       { myId: 3, myParentId: 1 },
//     ],
//   },
// ]
```

处理多棵树

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const data = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 10, parentId: null },
  { id: 20, parentId: 10 },
  { id: 30, parentId: 10 },
  { id: 40, parentId: 20 },
  { id: 100, parentId: null },
  { id: 200, parentId: 100 },
  { id: 300, parentId: 100 },
  { id: 400, parentId: 200 },
];

const result = treeData.dataToTree(data).getResult();
console.log(result);
// 输出：
// [
//   {
//     id: 1,
//     parentId: null,
//     children: [
//       { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
//       { id: 3, parentId: 1 },
//     ],
//   },
//   {
//     id: 10,
//     parentId: null,
//     children: [
//       { id: 20, parentId: 10, children: [{ id: 40, parentId: 20 }] },
//       { id: 30, parentId: 10 },
//     ],
//   },
//   {
//     id: 100,
//     parentId: null,
//     children: [
//       { id: 200, parentId: 100, children: [{ id: 400, parentId: 200 }] },
//       { id: 300, parentId: 100 },
//     ],
//   }
// ]
```