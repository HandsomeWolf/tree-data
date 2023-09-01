import { describe, expect, it } from "vitest";
import { getTreeDimensions } from "../../../src/index";

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

  it("should calculate tree depth correctly", () => {
    const { depth } = getTreeDimensions(tree);
    expect(depth).toEqual(5);
  });

  it("should calculate tree width correctly", () => {
    const { width } = getTreeDimensions(tree);
    expect(width).toEqual(2);
  });
});
