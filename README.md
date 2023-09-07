# @handsomewolf/tree-data

[README](README.md) | [中文文档](README_zh-CN.md)

This npm package is named @handsomewolf/tree-data. It provides a series of features, such as basic conversion (converting tree structure to flat structure, converting flat structure data to tree structure), basic node operations (modifying tree nodes, inserting tree nodes, deleting tree nodes), basic queries (calculating tree depth and breadth, getting tree path, searching tree, getting subtree) and basic traversal (filtering tree, breadth-first traversal, depth-first traversal), etc.



## Features

- Data Conversion
  - [Convert tree structure to flat structure](./docs/en-US/basic/convert/to-data.md) (Instance method)
  - [Convert flat structure to tree structure](./docs/en-US/basic/convert/to-tree.md) (Instance method)
- Node Operations
  - [Delete tree nodes](./docs/en-US/basic/nodes/delete.md) (Instance method)
  - [Insert tree nodes](./docs/en-US/basic/nodes/insert.md) (Instance method)
  - [Modify tree nodes](./docs/en-US/basic/nodes/modify.md) (Instance method)
- Queries
  - [Calculate tree depth and breadth](./docs/en-US/basic/query/dimensions.md) (Instance method)
  - [Get parent nodes](./docs/en-US/basic/query/parent.md) (Instance method)
  - [Get tree node path](./docs/en-US/basic/query/path.md) (Instance method)
  - [Search tree nodes](./docs/en-US/basic/query/search.md) (Instance method)
- Traversal
  - [Breadth-first traversal](./docs/en-US/basic/traverse/bfs.md) (Static method)
  - [Depth-first traversal](./docs/en-US/basic/traverse/dfs.md) (Static method)
  - [Filter tree by condition](./docs/en-US/basic/traverse/filter.md) (Instance method)
  - [Sort](./docs/en-US/basic/traverse/sort.md) (Instance method)
- Print
  - [View tree structure in console](./docs/en-US/basic//out/print.md) (Static method)

## Install Dependencies

```bash
npm install @handsomewolf/tree-data
```

## Usage

First, you need to import the TreeData class:

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";
```

Then, you can create a `TreeData` object:

```TypeScript
const treeData = new TreeData(trees, options);
```


The TreeData constructor accepts two parameters:

- trees: An array of objects, representing the tree structure data.
- options: An optional configuration object, containing the following properties:
  - idKey: A string, representing the key of the id property in the node object, default is "id".
  - parentIdKey: A string, representing the key of the parent node id property in the node object, default is "parentId".
  - childrenKey: A string, representing the key of the children property in the node object, default is "children".

You can customize these key names by modifying the options parameter. For example:


```TypeScript
const options = {
  idKey: 'myId',
  parentIdKey: 'myParentId',
  childrenKey: 'myChildren'
};

const treeData = new TreeData(trees, options);
```


Chaining

The instance methods of the TreeData class support chaining, which means you can link multiple operations together. For example:


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
// Output：
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


