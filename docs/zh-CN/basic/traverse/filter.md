## 功能

单树的数据过滤

选项对象可以包含以下属性：
- include：一个对象，其键是节点对象的属性，值是一个数组，只有节点对象的对应属性值在这个数组中，节点才会被包含在过滤后的结果中。
- exclude：一个对象，其键是节点对象的属性，值是一个数组，只有节点对象的对应属性值不在这个数组中，节点才会被包含在过滤后的结果中。
- childrenKey：一个字符串，表示节点对象中表示子节点的属性的键，默认为"children"。
- isDeleteEmptyChildren：一个布尔值，表示是否删除没有子节点的节点，默认为false。
这个函数会返回一个新的树形结构的数组，只包含满足过滤条件的节点。

## 语法

```TypeScript
filterTree(tree, options)
```

## 可选参数

| 参数名 | 值类型 | 作用 |
| --- | --- | --- |
| include | [{k:v}] | 如果节点的某个属性值不在对应的include数组中，那么这个节点就会被过滤掉 |
| exclude | [{k:v}] | 如果节点的某个属性值在对应的exclude数组中，那么这个节点就会被过滤掉。 |
| childrenKey | String | children的键名，默认为 `children` |
| isDeleteEmptyChildren | Boolean | 如果一个节点的子节点数组为空（即所有子节点都被过滤掉了），那么这个节点也会被过滤掉，默认值为`false` |

## 示例

```TypeScript
import { filterTree } from "@handsomewolf/tree-data";

const tree = {
    id: 1,
    parentId: null,
    children: [
      { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
      { id: 3, parentId: 1 },
    ],
  }

const result = filterTree(tree, { exclude: { id: [3] } })
console.log(result)

// 输出：
// {
//   id: 1,
//   parentId: null,
//   children: [{ id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] }],
// },