# @handsomewolf/tree-data

[README](README.md) | [中文文档](README_zh-CN.md)

这个npm包名为@handsomewolf/tree-data。它提供了一系列的功能，如基础转换（将树形结构转换为数据，将数据转换为树形结构），基础节点操作（修改树节点，插入树节点，删除树节点），基础查询（计算树的深度和广度，获取树路径，搜索树，获取子树）以及基础遍历（过滤树，广度优先遍历，深度优先遍历）等。



## Features

- 数据转换
  - [将树结构转换为扁平数据](./docs/zh-CN/basic/convert/to-data.md)
  - [将扁平数据转换为树结构](./docs/zh-CN/basic/convert/to-tree.md)
- 节点操作
  - [删除树节点](./docs/zh-CN/basic/nodes/delete.md)
  - [插入树节点](./docs/zh-CN/basic/nodes/insert.md)
  - [修改树节点](./docs/zh-CN/basic/nodes/modify.md)
- 查询
  - [计算树的深度与广度](./docs/zh-CN/basic/query/dimensions.md)
  - [获取树节点路径](./docs/zh-CN/basic/query/path.md)
  - [搜索树节点](./docs/zh-CN/basic/query/search.md)
  - [获取子树](./docs/zh-CN/basic/query/subtree.md)
- 遍历
  - [按条件过滤树](./docs/zh-CN/basic/traverse/filter.md)
  - [广度优先遍历](./docs/zh-CN/basic/traverse/bfs.md)
  - [深度优先遍历](./docs/zh-CN/basic/traverse/dfs.md)

## 安装依赖包

```bash
npm install @handsomewolf/tree-data
```

## 使用

从包中导出对应的函数，以数据转换为例：

```TypeScript
import { dataToTree, treeToData } from "@handsomewolf/tree-data";
```

将扁平数据转为树形结构：

```TypeScript
const data = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
];

const result = treeToData(tree);
console.log(result)

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
// ];
```

