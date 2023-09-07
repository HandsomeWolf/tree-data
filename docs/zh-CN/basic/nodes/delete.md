## 功能

删除树节点。

`deleteNodesByIds`函数通过节点ID删除节点，而`deleteNodes`函数则通过一个删除函数来删除节点。删除函数应该接受一个节点作为参数，并返回一个布尔值以决定是否删除该节点。

这两个函数使用队列（queue）代替递归。

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData()

treeData.deleteNodesByIds(ids, option)

treeData.deleteNodes(deleteFunction, option)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| deleteSelf | Boolean | 是否删除自己，默认为 true，即删除子元素也删除自己 |
| isDeleteEmptyChildren | Boolean | 是否删除空的子元素，默认为 false，即当子元素都删除没了之后是否保留children:[] |

## deleteNodesByIds

### 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
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
]);

const result = treeData.deleteNodesByIds([2,4]).getResult();
console.log(result);

// 输出：
// [{ id: 1, children: [] }]
```

若子元素全部删除没，不想要保留 `children:[]` 可以将参数 `isDeleteEmptyChildren` 设置为 `true`

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
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
]);

const result = treeData.deleteNodesByIds([2,4], { isDeleteEmptyChildren: true }).getResult();
console.log(result);

// 输出：
// [{ id: 1, }]
```

自定义键名

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
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
], {
  childrenKey: "myChildren",
  idKey: "myId",
});

const result = treeData.deleteNodesByIds([3, 4]).getResult();
console.log(result);

// 输出：
// [{ myId: 1, myChildren: [ { id: 2 } ] }]
```

## deleteNodes


### 示例

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
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
]);

const result = treeData.deleteNodes((node) => node.id === 2 || node.id === 4).getResult();
console.log(result);

// 输出：
// [{ id: 1, children: [] }]
```

若子元素全部删除没，不想要保留 `children:[]` 可以将参数 `isDeleteEmptyChildren` 设置为 `true`

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
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
]);

const result = treeData.deleteNodes((node) => node.id === 2 || node.id === 4, { isDeleteEmptyChildren: true }).getResult();
console.log(result);

// 输出：
// [{ id: 1, }]
```

自定义键名

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

const treeData = new TreeData([
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
], {
  childrenKey: "myChildren",
  idKey: "myId",
});

const result = treeData.deleteNodes((node) => node.id === 3 || node.id === 4).getResult();
console.log(result);

// 输出：
// [{ myId: 1, myChildren: [ { id: 2 } ] }]
```