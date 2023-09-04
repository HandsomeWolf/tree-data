## 功能

计算给定树的深度和宽度。

- 树的深度（depth）
- 树的宽度（width）

## 语法

```TypeScript
getTreeDimensions(tree)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| childrenKey | String | children的键名，默认为 `children` |

## 示例

```TypeScript
import { modifyNodesByIds } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    children: [
      { id: 2, children: [{ id: 4 }, { id: 5 }] },
      { id: 3, children: [{ id: 6 }, { id: 7 }] },
    ],
  },
];

const { depth, width } = getTreeDimensions(tree);
console.log(`depth:${depth},width:${width}`)

// 输出：
// depth:3,width:4
```