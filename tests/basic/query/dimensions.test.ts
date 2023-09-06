import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";

let treeData: TreeData;
describe("Tree Measurement", () => {
  const tree = [
    {
      id: 1,
      children: [
        {
          id: 2,
          children: [
            {
              id: 4,
              children: [{ id: 5, children: [{ id: 6 }] }],
            },
          ],
        },
        { id: 3 },
      ],
    },
  ];

  it("tree depth", () => {
    treeData = new TreeData(tree);
    const [{ depth }] = treeData.getTreeDimensions();

    expect(depth).toEqual(5);
  });

  it("tree width", () => {
    treeData = new TreeData(tree);
    const [{ width }] = treeData.getTreeDimensions();
    expect(width).toEqual(2);
  });
  // 新的测试用例 (New test cases)
  it("empty tree", () => {
    const tree = [{}];
    treeData = new TreeData(tree);
    const [{ depth, width }] = treeData.getTreeDimensions();
    expect(depth).toEqual(0);
    expect(width).toEqual(0);
  });

  it("single node tree", () => {
    const tree = [{ id: 1 }];
    treeData = new TreeData(tree);
    const [{ depth, width }] = treeData.getTreeDimensions();
    expect(depth).toEqual(1);
    expect(width).toEqual(1);
  });

  it("binary tree", () => {
    const tree = [
      {
        id: 1,
        children: [
          { id: 2, children: [{ id: 4 }, { id: 5 }] },
          { id: 3, children: [{ id: 6 }, { id: 7 }] },
        ],
      },
    ];
    treeData = new TreeData(tree);
    const [{ depth, width }] = treeData.getTreeDimensions();
    expect(depth).toEqual(3);
    expect(width).toEqual(4);
  });

  it("unbalanced tree", () => {
    const tree = [
      {
        id: 1,
        children: [
          { id: 2, children: [{ id: 4 }, { id: 5, children: [{ id: 6 }] }] },
          { id: 3 },
        ],
      },
    ];
    treeData = new TreeData(tree);
    const [{ depth, width }] = treeData.getTreeDimensions();

    expect(depth).toEqual(4);
    expect(width).toEqual(2);
  });

  it("unbalanced tree", () => {
    const tree = [
      {
        id: 1,
        children: [
          { id: 2, children: [{ id: 4 }, { id: 5, children: [{ id: 6 }] }] },
          { id: 3 },
        ],
      },
      {
        id: 1,
        children: [
          { id: 2, children: [{ id: 4 }] },
          { id: 3 },
          { id: 5, children: [{ id: 6 }] },
        ],
      },
    ];
    treeData = new TreeData(tree);
    const [{ depth: depth1, width: width1 }, { depth: depth2, width: width2 }] =
      treeData.getTreeDimensions();

    expect(depth1).toEqual(4);
    expect(width1).toEqual(2);
    expect(depth2).toEqual(3);
    expect(width2).toEqual(3);
  });
});
