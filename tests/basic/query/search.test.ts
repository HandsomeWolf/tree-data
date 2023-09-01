import { describe, expect, it } from "vitest";
import { searchTree } from "../../../src/index";

describe("searchTree", () => {
  const tree = [
    {
      id: 1,
      name: "one",
      children: [
        {
          id: 2,
          name: "two",
          children: [
            {
              id: 3,
              name: "three",
            },
          ],
        },
        {
          id: 4,
          name: "four",
        },
      ],
    },
    {
      id: 5,
    },
  ];

  it("should return the first node that matches the condition", () => {
    const node = searchTree(
      tree,
      { id: 2 },
      { findAll: false, includeChildren: true },
    );
    expect(node).toEqual({
      id: 2,
      name: "two",
      children: [
        {
          id: 3,
          name: "three",
        },
      ],
    });
  });

  it("should return the first node that matches the condition", () => {
    const node = searchTree(
      tree,
      { id: 2 },
      { findAll: false, includeChildren: false },
    );
    expect(node).toEqual({
      id: 2,
      name: "two",
    });
  });

  it("should return all nodes that match the condition", () => {
    const nodes = searchTree(
      tree,
      { id: 2 },
      { findAll: true, includeChildren: true },
    );
    expect(nodes).toEqual([
      {
        id: 2,
        name: "two",
        children: [
          {
            id: 3,
            name: "three",
          },
        ],
      },
    ]);
  });

  it("should return null if no nodes match the condition", () => {
    const node = searchTree(tree, { id: 100 }, { findAll: false });
    expect(node).toBeNull();
  });
});
