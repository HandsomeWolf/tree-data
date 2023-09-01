import { describe, expect, it } from "vitest";
import { modifyNodes, modifyNodesById } from "../../../src/index";
interface TreeNode {
  [key: string]: any;
}
describe("modifyNodes", () => {
  it("all nodes should be modified", () => {
    const tree: TreeNode[] = [
      {
        id: 1,
        children: [
          { id: 2 },
          {
            id: 3,
            children: [
              {
                id: 4,
                children: [{ id: 5, children: [{ id: 6 }] }, { id: 7 }],
              },
            ],
          },
        ],
      },
    ];

    const modifiedTree = modifyNodes(tree, (node) => {
      node.newKey = "newValue";
      return node;
    });

    expect(modifiedTree).toEqual([
      {
        id: 1,
        children: [
          { id: 2, newKey: "newValue" },
          {
            id: 3,
            children: [
              {
                id: 4,
                children: [
                  {
                    id: 5,
                    children: [{ id: 6, newKey: "newValue" }],
                    newKey: "newValue",
                  },
                  { id: 7, newKey: "newValue" },
                ],
                newKey: "newValue",
              },
            ],
            newKey: "newValue",
          },
        ],
        newKey: "newValue",
      },
    ]);
  });

  it("custom key all nodes should be modified", () => {
    const tree: TreeNode[] = [
      {
        id: 1,
        children: [{ id: 2 }, { id: 3, children: [{ id: 4 }] }],
      },
    ];

    const newTree = modifyNodes(
      tree,
      (node) => {
        node.newKey = "newValue";
        return node;
      },
      {
        childrenKey: "children",
      },
    );
    expect(newTree[0].newKey).toBe("newValue");
    expect(newTree[0].children[0].newKey).toBe("newValue");
    expect(newTree[0].children[1].newKey).toBe("newValue");
    expect(newTree[0].children[1].children[0].newKey).toBe("newValue");
  });

  it("Modify the specified tree node", () => {
    const tree: TreeNode[] = [
      {
        id: 1,
        children: [{ id: 2 }, { id: 3, children: [{ id: 4 }] }],
      },
      { id: 1, value: "node1", children: [] },
      { id: 2, value: "node2", children: [] },
      { id: 3, value: "node3", children: [] },
    ];

    const newTree = modifyNodes(
      tree,
      (node) => {
        if (node.id === 1 || node.id === 3) {
          node.newKey = "newValue";
        }
        return node;
      },
      {
        childrenKey: "children",
      },
    );

    expect(newTree).toEqual([
      {
        id: 1,
        children: [
          { id: 2 },
          { id: 3, children: [{ id: 4 }], newKey: "newValue" },
        ],
        newKey: "newValue",
      },
      { id: 1, value: "node1", children: [], newKey: "newValue" },
      { id: 2, value: "node2", children: [] },
      { id: 3, value: "node3", children: [], newKey: "newValue" },
    ]);
  });
});

describe("modifyNodesById", () => {
  it("should modify nodes with specified ids", () => {
    const tree = [
      { id: 1, value: "node1", children: [] },
      { id: 2, value: "node2", children: [] },
      { id: 3, value: "node3", children: [] },
    ];

    const ids = [1, 3];
    const keyValuePairs = { value: "modified" };

    const modifiedTree = modifyNodesById(tree, ids, keyValuePairs);

    expect(modifiedTree).toEqual([
      { id: 1, value: "modified", children: [] },
      { id: 2, value: "node2", children: [] },
      { id: 3, value: "modified", children: [] },
    ]);
  });
});
