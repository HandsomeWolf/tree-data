## 功能

printTree 是一个静态方法，用于打印树形结构的数据。它接收三个参数：


- node：需要打印的节点，类型为 KeyValueObject。
- prefix：前缀字符串，用于控制打印的格式，默认为空字符串。
- isLast：一个布尔值，表示当前节点是否为其父节点的最后一个子节点，默认为 true。

## 语法

```TypeScript
import { TreeData } from "@handsomewolf/tree-data";

TreeData.printTree(treeNode, prefix, isLast);
```

## 示例

```TypeScript
const node = {
  value: "root",
  children: [
    { value: "child1" },
    { value: "child2", children: [{ value: "grandchild1" }] },
  ],
};

TreeData.printTree(node);
```

上述代码将会打印出以下的树形结构：

```
root
├── child1
└── child2
    └── grandchild1
```

注意

- printTree 方法使用了递归的方式来遍历树形结构的数据。
- printTree 方法使用了 console.log 来打印数据，因此它不会返回任何值。
- printTree 方法主要用于调试和可视化树形结构的数据，不建议在生产环境中使用。