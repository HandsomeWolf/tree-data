# 功能

修改树形结构中的节点。

`modifyNodesByIds`函数通过节点的ID来修改节点。它使用了集合（Set）来存储需要修改的节点的ID。

`modifyNodes`函数通过一个修改函数来修改节点。修改函数接受一个节点作为参数，并返回一个新的节点或修改原始节点。


这两个函数使用队列（queue）代替递归。


## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()
treeData.modifyNodesByIds( ids, keyValuePairs)

treeData.modifyNodes( modifyFunction)
```

## modifyNodesByIds

### 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const tree = [
  { id: 1, value: "node1", children: [] },
  { id: 2, value: "node2", children: [] },
  { id: 3, value: "node3", children: [] },
];

const treeData = new TreeData([
  { id: 1, value: "node1", children: [] },
  { id: 2, value: "node2", children: [] },
  { id: 3, value: "node3", children: [] },
]);

const ids = [1, 3];
const keyValuePairs = { value: "modified" };

treeData.modifyNodesByIds(ids, keyValuePairs);
const result = treeData.getResult();
console.log(result)

// 输出：
// [
//   { id: 1, value: "modified", children: [] },
//   { id: 2, value: "node2", children: [] },
//   { id: 3, value: "modified", children: [] },
// ]
```

## modifyNodes

### 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
  { id: 1, value: "node1", children: [] },
  { id: 2, value: "node2", children: [] },
  { id: 3, value: "node3", children: [] },
]);

treeData.modifyNodes(node => {
  if (node.id === 1 || node.id === 3) {
    return { ...node, value: "modified" };
  }
  return node;
});
const result = treeData.getResult();
console.log(result)

// 输出：
// [
//   { id: 1, value: "modified", children: [] },
//   { id: 2, value: "node2", children: [] },
//   { id: 3, value: "modified", children: [] },
// ]
```