## 功能

将树形结构数据转换为扁平结构数据。

此函数使用队列（Queue）或栈（Stack）的方式来处理数据，而非递归。


## 语法 

```TypeScript
treeToData(tree, options)
```

## 可选参数

| 参数名      | 值类型 | 作用                         |
| ----------- | ------ | ---------------------------- |
| childrenKey | String | 子节点的键名，默认为 `children` |
| method | String | 数据处理方式，可选值为 `"BFS"` 或 `"DFS"`，默认为 `"BFS"` |

## 示例

```TypeScript
import { treeToData } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    parentId: null,
    children: [
      { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
      { id: 3, parentId: 1 },
    ],
  },
];

const result = treeToData(tree);
console.log(result);
// 输出：
// [
//   { id: 1, parentId: null },
//   { id: 2, parentId: 1 },
//   { id: 3, parentId: 1 },
//   { id: 4, parentId: 2 },
// ]
```

自定义键名：

```TypeScript
import { treeToData } from "@handsomewolf/tree-data";

const tree = [
  {
    myId: 1,
    myParentId: null,
    customChildren: [
      {
        myId: 2,
        myParentId: 1,
        customChildren: [{ myId: 4, myParentId: 2 }],
      },
      { myId: 3, myParentId: 1 },
    ],
  },
];

const result = treeToData(tree, { childrenKey: "customChildren" })
console.log(result)

// 输出：
// [
//   { myId: 1, myParentId: null },
//   { myId: 2, myParentId: 1 },
//   { myId: 3, myParentId: 1 },
//   { myId: 4, myParentId: 2 },
// ]
```

深度优先搜索

```TypeScript
import { treeToData } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    parentId: null,
    children: [
      { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
      { id: 3, parentId: 1 },
    ],
  },
];

const result = treeToData(tree, {method: "DFS"});
console.log(result);

// 输出：
// [
//   { id: 1, parentId: null },
//   { id: 2, parentId: 1 },
//   { id: 4, parentId: 2 },
//   { id: 3, parentId: 1 },
// ]
```