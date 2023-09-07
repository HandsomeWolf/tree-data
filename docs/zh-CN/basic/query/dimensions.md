## 功能

计算树的深度和宽度。

- 树的深度（depth）
- 树的宽度（width）

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()

treeData.getTreeDimensions()
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| index  | Number | 用于指定要计算尺寸的树的索引 |

## 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
  {
    id: 1,
    children: [
      { id: 2, children: [{ id: 4 }, { id: 5 }] },
      { id: 3, children: [{ id: 6 }, { id: 7 }] },
    ],
  },
]);

const dimensions = treeData.getTreeDimensions();
console.log(dimensions);

// 输出：
// [{ depth: 3, width: 4 }]
```

计算多个树

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
  {
    id: 1,
    children: [
      { id: 2, children: [{ id: 4 }, { id: 5 }] },
      { id: 3, children: [{ id: 6 }, { id: 7 }] },
    ],
  },
  {
    id: 10,
    children: [
      { id: 20, children: [{ id: 40 }, { id: 50 }] },
      { id: 30, children: [{ id: 60 }, { id: 70 }] },
    ],
  },
]);

const dimensions = treeData.getTreeDimensions();
console.log(dimensions);

// 输出：
// [{ depth: 3, width: 4 },{ depth: 3, width: 4 }]
```