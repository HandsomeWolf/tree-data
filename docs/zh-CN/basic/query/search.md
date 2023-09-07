## 功能

树形结构中查找满足特定的节点。它使用了栈（Stack）来实现深度优先搜索（DFS）

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()
treeData.getNodes(condition, options)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| findAll | Boolean | 是否返回所有匹配的节点，默认为 `false` |
| includeChildren | Boolean | 搜索函数在匹配节点时，是否包含其子节点，默认为 `false` |


## 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    name: "one",
    children: [
      {
        id: 2,
        name: "two",
        children: [
          {
            id: 3,
            name: "three",
          },
        ],
      },
      { id: 4, name: "four" },
    ],
  },
  {
    id: 10,
    name: "one",
    children: [
      {
        id: 20,
        name: "two",
        children: [
          {
            id: 30,
            name: "three",
          },
        ],
      },
      { id: 40, name: "four" },
    ],
  },
];

const treeData = new TreeData(tree);

// 查找 id 为 20 的节点，包含其子节点
const node = treeData.getNodes({ id: 20 }, { findAll: false, includeChildren: true }).getResult();
console.log(node);
// 输出：
// {
//   id: 20,
//   name: "two",
//   children: [
//     {
//       id: 30,
//       name: "three",
//     },
//   ],
// }

// 查找 id 为 20 的节点，不包含其子节点
const nodeWithoutChildren = treeData.getNodes({ id: 20 }).getResult();
console.log(nodeWithoutChildren);
// 输出：
// {
//   id: 20,
//   name: "two",
// }

// 查找所有 id 为 20 的节点，包含其子节点
const nodes = treeData.getNodes({ id: 20 }, { findAll: true, includeChildren: true }).getResult();
console.log(nodes);
// 输出：
// [
//   {
//     id: 20,
//     name: "two",
//     children: [
//       {
//         id: 30,
//         name: "three",
//       },
//     ],
//   },
// ]

// 如果没有节点满足条件，返回 null
const nonExistentNode = treeData.getNodes({ id: 100 }, { findAll: false }).getResult();
console.log(nonExistentNode); // 输出：null

```

findAll -> true ; includeChildren -> true