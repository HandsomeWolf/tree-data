import { describe, expect, it } from "vitest";
import { getTreeDimensions } from "../../../src/index";

describe("Tree Measurement", () => {
  const tree = {
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
  };

  it("tree depth", () => {
    const { depth } = getTreeDimensions(tree);

    expect(depth).toEqual(5);
  });

  it("tree width", () => {
    const { width } = getTreeDimensions(tree);
    expect(width).toEqual(2);
  });
  // 新的测试用例 (New test cases)
  it("empty tree", () => {
    const tree = {};
    const { depth, width } = getTreeDimensions(tree);
    expect(depth).toEqual(0);
    expect(width).toEqual(0);
  });

  it("single node tree", () => {
    const tree = { id: 1 };
    const { depth, width } = getTreeDimensions(tree);
    expect(depth).toEqual(1);
    expect(width).toEqual(1);
  });

  it("binary tree", () => {
    const tree = {
      id: 1,
      children: [
        { id: 2, children: [{ id: 4 }, { id: 5 }] },
        { id: 3, children: [{ id: 6 }, { id: 7 }] },
      ],
    };

    const { depth, width } = getTreeDimensions(tree);
    expect(depth).toEqual(3);
    expect(width).toEqual(4);
  });

  it("unbalanced tree", () => {
    const tree = {
      id: 1,
      children: [
        { id: 2, children: [{ id: 4 }, { id: 5, children: [{ id: 6 }] }] },
        { id: 3 },
      ],
    };

    const { depth, width } = getTreeDimensions(tree);

    expect(depth).toEqual(4);
    expect(width).toEqual(2);
  });
});
