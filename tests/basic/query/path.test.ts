import { describe, expect, it } from "vitest";
import { getNodePath } from "../../../src/index";

describe("getNodePath", () => {
  it("should return the correct path", () => {
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
    const expected = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [{ id: 4, children: [{ id: 5, children: [{ id: 6 }] }] }],
          },
          { id: 3 },
        ],
      },
      {
        id: 2,
        children: [{ id: 4, children: [{ id: 5, children: [{ id: 6 }] }] }],
      },
      { id: 4, children: [{ id: 5, children: [{ id: 6 }] }] },
      { id: 5, children: [{ id: 6 }] },
      { id: 6 },
    ];
    expect(getNodePath(tree, 6)).toEqual(expected);
  });

  it("should return null if the target node is not found", () => {
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

    expect(getNodePath(tree, 7)).toBeNull();
  });
});
