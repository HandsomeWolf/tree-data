## 功能

将树形结构数据转换为扁平结构数据。

此函数使用队列（Queue）或栈（Stack）的方式来处理数据，而非递归。


## 语法 （静态方法）

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData(tree, options);
treeData.treesToData();
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| ----------- | ------ | ---------------------------- |
| childrenKey | String | 子节点的键名，默认为 children |
| traversalMethod | String | 遍历方法，可以是"BFS"或"DFS"，默认值为BFS |

## 示例

广度优先遍历

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const tree = [{
  id: 1,
  parentId: null,
  children: [
    { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
    { id: 3, parentId: 1 },
  ],
}]

const treeData = new TreeData(tree);
const result = treeData.treesToData();
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
import { TreeData } from "@handsomewolf/tree-data";

const tree = [{
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
}]


const treeData = new TreeData(tree, { childrenKey: "customChildren" });
const result = treeData.treesToData();
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
import { TreeData, TraversalMethod } from "@handsomewolf/tree-data";

const tree = {
  id: 1,
  parentId: null,
  children: [
    { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
    { id: 3, parentId: 1 },
  ],
}


const treeData = new TreeData(tree);
const result = treeData.treesToData({ traversalMethod: TraversalMethod.DFS });
console.log(result);

// 输出：
// [
//   { id: 1, parentId: null },
//   { id: 2, parentId: 1 },
//   { id: 4, parentId: 2 },
//   { id: 3, parentId: 1 },
// ]
```

处理多树

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const trees = [
  {
    id: 1,
    children: [{ id: 2 }, { id: 3, children: [{ id: 4 }] }],
  },
  {
    id: 5,
    children: [{ id: 6 }, { id: 7, children: [{ id: 8 }] }],
  },
];

const treeData = new TreeData(trees);
const result = treeData.treesToData();
console.log(result);

// 输出：
// [
//   [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
//   [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }],
// ]
```