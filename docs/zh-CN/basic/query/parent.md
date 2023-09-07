## 功能

获取指定 ID 的节点的父节点。

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()
treeData.getParentNodeById(id, options)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| levelsUp | Boolean | 向上查找的层数。默认值为 1，即返回直接父节点 |
| returnRootIfAbsent | Boolean | 如果找不到父节点，是否返回根节点。默认值为 false |
| includeChildren  | Boolean | 返回的父节点对象是否应包含其子节点。默认值为 false |

## 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
  {
    id: 1,
    parentId: null,
    children: [{ id: 2, parentId: 1, children: [{ id: 3, parentId: 2 }] }],
  },
  {
    id: 10,
    parentId: null,
    children: [{ id: 20, parentId: 10, children: [{ id: 30, parentId: 20 }] }],
  },
]);

// 返回指定层级的父节点
let parentNode = treeData.getParentNodeById(3, { levelsUp: 1 }).getResult();
console.log(parentNode); // 输出：{ id: 2, parentId: 1 }

// 如果找不到指定层级的父节点，返回根节点
let rootNode = treeData.getParentNodeById(3, { levelsUp: 5, returnRootIfAbsent: true }).getResult();
console.log(rootNode); // 输出：{ id: 1, parentId: null }

// 如果找不到指定层级的父节点，且 returnRootIfAbsent 为 false，返回 null
let result = treeData.getParentNodeById(3, { levelsUp: 5, returnRootIfAbsent: false }).getResult();
console.log(result); // 输出：null

// 如果 includeChildren 为 true，返回的父节点将包含其子节点
let parentNodeWithChildren = treeData.getParentNodeById(3, { levelsUp: 1, returnRootIfAbsent: false, includeChildren: true }).getResult();
console.log(parentNodeWithChildren); // 输出：{ id: 2, parentId: 1, children: [{ id: 3, parentId: 2 }] }
```