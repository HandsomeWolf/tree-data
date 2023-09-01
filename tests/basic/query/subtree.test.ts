import { describe, expect, it } from "vitest";
import { getSubtree } from "../../../src/index";
describe("getSubtree", () => {
  it("should return the subtree with the given id", () => {
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

    const expected = {
      id: 2,
      children: [
        {
          id: 4,
          children: [{ id: 5, children: [{ id: 6 }] }],
        },
      ],
    };

    expect(getSubtree(tree, 2)).toEqual(expected);
  });

  it("should return null if the id does not exist in the tree", () => {
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

    expect(getSubtree(tree, 7)).toBeNull();
  });
});
