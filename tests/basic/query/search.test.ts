import { describe, expect, it } from "vitest";
import { getNodes } from "../../../src/index";

describe("getNodes", () => {
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
  describe("basic", () => {
    it("findAll -> false ; includeChildren -> true ", () => {
      const node = getNodes(
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

    it("findAll -> false ; includeChildren -> false", () => {
      const node = getNodes(tree, { id: 2 });
      expect(node).toEqual({
        id: 2,
        name: "two",
      });
    });

    it("findAll -> true ; includeChildren -> true", () => {
      const nodes = getNodes(
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

    it("custom", () => {
      const tree = [
        {
          id: 1,
          name: "one",
          myChildren: [
            {
              id: 2,
              name: "two",
              myChildren: [
                {
                  id: 3,
                  name: "three",
                  myChildren: [
                    {
                      id: 2,
                      name: "two",
                      myChildren: [
                        {
                          id: 4,
                          name: "three",
                        },
                      ],
                    },
                  ],
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
        {
          id: 2,
          name: "two",
        },
      ];

      const nodes = getNodes(
        tree,
        { id: 2 },
        { findAll: true, includeChildren: true, childrenKey: "myChildren" },
      );
      expect(nodes).toEqual([
        { id: 2, name: "two" },
        {
          id: 2,
          name: "two",
          myChildren: [
            {
              id: 3,
              name: "three",
              myChildren: [
                { id: 2, name: "two", myChildren: [{ id: 4, name: "three" }] },
              ],
            },
          ],
        },
        { id: 2, name: "two", myChildren: [{ id: 4, name: "three" }] },
      ]);
    });
  });

  it("should return null if no nodes match the condition", () => {
    const node = getNodes(tree, { id: 100 }, { findAll: false });
    expect(node).toBeNull();
  });
});
