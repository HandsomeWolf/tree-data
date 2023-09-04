# 功能

修改树形结构中的节点。

`modifyNodesByIds`函数通过节点的ID来修改节点。这个函数的优点在于，它使用了集合（Set）来存储需要修改的节点的ID，这样可以快速地通过ID找到对应的节点，从而提高了修改节点的效率。

`modifyNodes`函数通过一个修改函数来修改节点。修改函数接受一个节点作为参数，并返回一个新的节点或修改原始节点。这个函数的优点在于，它提供了更大的灵活性，可以根据具体的需求来决定修改节点的方式。


这两个函数的优化点主要在于使用队列（queue）代替递归。在处理树形结构数据时，递归是一种常见的方法。但是，递归可能会导致调用栈过深，从而引发堆栈溢出的问题。而使用队列，可以避免这个问题，因为它只需要常量级的额外空间。此外，使用队列还可以方便地实现广度优先搜索（BFS），这对于某些场景可能更为合适。


## 语法

```TypeScript
modifyNodesByIds(tree, ids, keyValuePairs, options)

modifyNodes(tree, modifyFunction, options)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| idKey | String | id的键名，默认为 `id` |
| childrenKey | String | children的键名，默认为 `children` |

## modifyNodesByIds

### 示例

```TypeScript
import { modifyNodesByIds } from "@handsomewolf/tree-data";

```