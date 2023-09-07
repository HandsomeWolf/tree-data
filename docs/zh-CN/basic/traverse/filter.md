## 功能

在树形结构中过滤出满足特定条件的节点。

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()
treeData.filterTree(options)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| include | Object | 一个对象，其键是节点对象的属性，值是一个数组，只有节点对象的对应属性值在这个数组中，节点才会被包含在过滤后的结果中 |
| exclude | Object | 一个对象，其键是节点对象的属性，值是一个数组，只有节点对象的对应属性值不在这个数组中，节点才会被包含在过滤后的结果中 |
| isDeleteEmptyChildren | Boolean | 如果一个节点的子节点数组为空（即所有子节点都被过滤掉了），那么这个节点也会被过滤掉，默认值为`false` |

## 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    parentId: null,
    children: [
      { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
      { id: 3, parentId: 1 },
    ],
  },
  {
    id: 1,
    parentId: null,
    children: [
      { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
      { id: 3, parentId: 1 },
    ],
  },
];

const treeData = new TreeData(tree);

// 过滤出 id 不为 4 的节点
const result = treeData.filterTree({ exclude: { id: [4] } }).getResult();
console.log(result);

// 输出：
// [
//   {
//     id: 1,
//     parentId: null,
//     children: [
//       { id: 2, parentId: 1, children: [] },
//       { id: 3, parentId: 1 },
//     ],
//   },
//   {
//     id: 1,
//     parentId: null,
//     children: [
//       { id: 2, parentId: 1, children: [] },
//       { id: 3, parentId: 1 },
//     ],
//   },
// ]

// 过滤出 parentId 为 3 的节点
const result2 = treeData.filterTree({ include: { parentId: [3] } }).getResult();
console.log(result2);

// 输出：
// [
//   {
//     id: 1,
//     parentId: null,
//     children: [
//       { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
//     ],
//   },
//   {
//     id: 1,
//     parentId: null,
//     children: [
//       { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
//     ],
//   },
// ]

// 如果没有节点满足条件，返回 null
const nonExistentNode = treeData.filterTree({ include: { parentId: [888] } }).getResult();
console.log(nonExistentNode); // 输出：null
```

