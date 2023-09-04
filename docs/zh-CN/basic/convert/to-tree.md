## 功能

将扁平结构的数据转换为树形结构的数据。

它首先创建一个映射，将每个节点的ID映射到对应的节点对象。

## 语法

```TypeScript
dataTOTree(data, options)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| idKey | String | id的键名，默认为 `id` |
| parentIdKey | String | parentId的键名，默认为 `parentId` |
| childrenKey | String | children的键名，默认为 `children` |

## 示例

```TypeScript
import { dataToTree } from "@handsomewolf/tree-data";

const data = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
];

const result = dataToTree(data)
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
import { dataToTree } from "@handsomewolf/tree-data";

const data = [
  { myId: 1, myParentId: null, },
  { myId: 2, myParentId: 1 },
  { myId: 3, myParentId: 1 },
  { myId: 4, myParentId: 2 },
];

const result = dataToTree(data, {
                  idKey: "myId",
                  parentIdKey: "myParentId",
                  childrenKey: "customChildren",
               })
console.log(result);
// 输出：
// [
//   {
//     myId: 1,
//     test: false,
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