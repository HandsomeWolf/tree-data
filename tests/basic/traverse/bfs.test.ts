import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";

describe("Tree Traversal", () => {
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

  it("should traverse tree in depth-first order", () => {
    const result: number[] = [];
    TreeData.traverseDFS(tree, (node) => result.push(node.id));
    expect(result).toEqual([1, 2, 4, 5, 6, 3]);
  });

  it("should traverse tree in breadth-first order", () => {
    const result: number[] = [];
    TreeData.traverseBFS(tree, (node) => result.push(node.id));
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
