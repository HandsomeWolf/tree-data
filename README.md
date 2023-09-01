# @handsomewolf/tree-data

[README](README.md) | [中文文档](README_zh.md)

A utility for transforming and manipulating hierarchical data, including conversion of flat data to tree structures and data filtering.

## Features

- Convert tree structure to data
- Convert data to tree structure
- Modify tree nodes
- Insert tree nodes
- delete tree nodes
- Calculate tree depth and width
- Get the path of a tree node
- Get tree node
- Get subtree
- Filter tree node
- Deep First Search
- Breath First Search

## Installation

```bash
npm install @handsomewolf/tree-data
```

## Usage

Import the required functions from the package:

```TypeScript
import { dataToTree, treeToData } from "@handsomewolf/tree-data";
```

Convert flat data to a tree structure:

```TypeScript
const data = treeToData(tree);
```

