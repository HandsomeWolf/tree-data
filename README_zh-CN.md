# @handsomewolf/tree-data

[README](README.md) | [中文文档](README_zh-CN.md)

这个npm包名为@handsomewolf/tree-data。它提供了一系列的功能，如基础转换（将树形结构转换为扁平结构，将扁平结构数据转换为树形结构），基础节点操作（修改树节点，插入树节点，删除树节点），基础查询（计算树的深度和广度，获取树路径，搜索树，获取子树）以及基础遍历（过滤树，广度优先遍历，深度优先遍历）等。



## 功能

- 数据转换
  - [将树形结构转换为扁平结构](./docs/zh-CN/basic/convert/to-data.md)（实例方法）
  - [将扁平结构转换为树结构](./docs/zh-CN/basic/convert/to-tree.md)（实例方法）
- 节点操作
  - [删除树节点](./docs/zh-CN/basic/nodes/delete.md)（实例方法）
  - [插入树节点](./docs/zh-CN/basic/nodes/insert.md)（实例方法）
  - [修改树节点](./docs/zh-CN/basic/nodes/modify.md)（实例方法）
- 查询
  - [计算树的深度与广度](./docs/zh-CN/basic/query/dimensions.md)（实例方法）
  - [获取父级节点](./docs/zh-CN/basic/query/parent.md)（实例方法）
  - [获取树节点路径](./docs/zh-CN/basic/query/path.md)（实例方法）
  - [搜索树节点](./docs/zh-CN/basic/query/search.md)（实例方法）
- 遍历
  - [广度优先遍历](./docs/zh-CN/basic/traverse/bfs.md)（静态方法）
  - [深度优先遍历](./docs/zh-CN/basic/traverse/dfs.md)（静态方法）
  - [按条件过滤树](./docs/zh-CN/basic/traverse/filter.md)（实例方法）
  - [排序](./docs/zh-CN/basic/traverse/sort.md)（实例方法）
- 打印
  - [控制台查看树结构](./docs/zh-CN/basic//out/print.md)（静态方法）

## 安装依赖包

```bash
npm install @handsomewolf/tree-data
```

## 使用

首先，你需要导入 TreeData 类：

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";
```

然后，你可以创建一个 TreeData 对象：

```TypeScript
const treeData = new TreeData(trees, options);
```

TreeData 构造函数接受两个参数：

- trees：一个对象数组，表示树形结构的数据。
- options：一个可选的配置对象，包含以下属性：
  - idKey：一个字符串，表示节点对象中表示 id 的属性的键，默认为 "id"。
  - parentIdKey：一个字符串，表示节点对象中表示父节点 id 的属性的键，默认为 "parentId"。
  - childrenKey：一个字符串，表示节点对象中表示子节点的属性的键，默认为 "children"。

你可以通过修改 options 参数来自定义这些键名。例如：

```TypeScript
const options = {
  idKey: 'myId',
  parentIdKey: 'myParentId',
  childrenKey: 'myChildren'
};

const treeData = new TreeData(trees, options);
```

链式调用

TreeData 类的实例方法支持链式调用，这意味着你可以将多个操作链接在一起。例如：

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

treeData
  .sortNodes((a, b) => a.id - b.id)
  .filterTree({ exclude: { id: [3] } });

const result = treeData.getResult();
console.log(result);
// 输出：
// [
//   {
//     id: 1,
//     children: [{ id: 2 }],
//   },
//   {
//     id: 4,
//     children: [{ id: 5 }, { id: 6 }],
//   },
// ]
```

