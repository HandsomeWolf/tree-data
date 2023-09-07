## 功能

对树形结构中的节点进行排序

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()
treeData.sortNodes(compareFunction)
```

## 参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| compareFunction | Function | 用于确定元素排序顺序的比较函数 |

## 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const trees = [
  {
    id: 1,
    children: [{ id: 3 }, { id: 2 }],
  },
  {
    id: 4,
    children: [{ id: 6 }, { id: 5 }],
  },
];

const treeData = new TreeData(trees);
treeData.sortNodes((a, b) => a.id - b.id);

const result = treeData.getResult();
console.log(result);

// 输出：
// [
//   {
//     id: 1,
//     children: [{ id: 2 }, { id: 3 }],
//   },
//   {
//     id: 4,
//     children: [{ id: 5 }, { id: 6 }],
//   },
// ]
```