## 功能

这两个函数的主要功能是删除树节点。`deleteNodesByIds`函数通过节点ID删除节点，而`deleteNodes`函数则通过一个删除函数来删除节点。删除函数应该接受一个节点作为参数，并返回一个布尔值以决定是否删除该节点。

这两个函数的优化点主要在于使用队列（queue）代替递归。在处理树形结构数据时，递归是一种常见的方法。但是，递归可能会导致调用栈过深，从而引发堆栈溢出的问题。而使用队列，可以避免这个问题，因为它只需要常量级的额外空间。此外，使用队列还可以方便地实现广度优先搜索（BFS），这对于某些场景可能更为合适。

## 语法

```TypeScript
deleteNodesByIds(tree,ids,option)

deleteNodes(tree,deleteFunction,option)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| idKey | String | id的键名，默认为 `id` |
| childrenKey | String | children的键名，默认为 `children` |
| deleteSelf | Boolean | 是否删除自己，默认为 `true`，即删除子元素也删除自己 |
| isDeleteEmptyChildren | Boolean | 是否删除空的子元素，默认为 `false`，即当子元素都删除没了之后是否保留`children:[]` |

## deleteNodesByIds

### 示例

```TypeScript
import { deleteNodesByIds } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
          },
        ],
      },
      {
        id: 4,
      },
    ],
  },
];

const result=deleteNodesByIds(tree, [2,4])
console.log(result)

// 输出：
// [{ id: 1, children: [] }]
```

若子元素全部删除没，不想要保留 `children:[]` 可以将参数 `isDeleteEmptyChildren` 设置为 `true`

```TypeScript
import { deleteNodesByIds } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
          },
        ],
      },
      {
        id: 4,
      },
    ],
  },
];

const result=deleteNodesByIds(tree, [2,4], { isDeleteEmptyChildren: true })
console.log(result)

// 输出：
// [{ id: 1, }]
```

自定义键名

```TypeScript
import { deleteNodesByIds } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
          },
        ],
      },
      {
        id: 4,
      },
    ],
  },
];

const idsToDelete = [3, 4];

const result = deleteNodesByIds(tree, idsToDelete, {
                  childrenKey: "myChildren",
                  idKey: "myId",
                })
console.log(result)

// 输出：
// [{ myId: 1, myChildren: [ { id: 2 } ] }]
```

## deleteNodes


### 示例

```TypeScript
import { deleteNodes } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
          },
        ],
      },
      {
        id: 4,
      },
    ],
  },
];

const result=deleteNodes(tree,(node) => node.id === 2 || node.id === 4)
console.log(result)

// 输出：
// [{ id: 1, children: [] }]
```

若子元素全部删除没，不想要保留 `children:[]` 可以将参数 `isDeleteEmptyChildren` 设置为 `true`

```TypeScript
import { deleteNodes } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
          },
        ],
      },
      {
        id: 4,
      },
    ],
  },
];

const result=deleteNodes(tree, (node) => node.id === 2 || node.id === 4, { isDeleteEmptyChildren: true })
console.log(result)

// 输出：
// [{ id: 1, }]
```

自定义键名

```TypeScript
import { deleteNodes } from "@handsomewolf/tree-data";

const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
          },
        ],
      },
      {
        id: 4,
      },
    ],
  },
];

const result = deleteNodes(tree, (node) => node.id === 3 || node.id === 4, {
  childrenKey: "myChildren",
  idKey: "myId",
})
console.log(result)

// 输出：
// [{ myId: 1, myChildren: [ { id: 2 } ] }]
```
