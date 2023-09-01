import { describe, expect, it } from "vitest";
import { filterTree } from "../../../src/index";

describe("filterTree", () => {
  it("should exclude specified nodes", () => {
    const tree = [
      {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
          { id: 3, parentId: 1 },
        ],
      },
    ];
    const expected = [
      {
        id: 1,
        parentId: null,
        children: [{ id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] }],
      },
    ];

    expect(filterTree(tree, { exclude: { id: [3] } })).toEqual(expected);
  });

  it("should exclude specified nodes", () => {
    const tree = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              {
                id: 4,
                parentId: 2,
                children: [
                  { id: 5, parentId: 4, children: [{ id: 6, parentId: 5 }] },
                ],
              },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      },
    ];
    const expected = [
      {
        id: 1,
        parentId: null,
        children: [{ id: 3, parentId: 1 }],
      },
    ];

    expect(
      filterTree(tree, { exclude: { id: [6] }, isDeleteEmptyChildren: true }),
    ).toEqual(expected);
  });

  it("should exclude specified nodes", () => {
    const tree = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              {
                id: 4,
                parentId: 2,
                children: [
                  { id: 5, parentId: 4, children: [{ id: 6, parentId: 5 }] },
                ],
              },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      },
    ];
    const expected = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              {
                id: 4,
                parentId: 2,
                children: [{ id: 5, parentId: 4 }],
              },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      },
    ];

    expect(
      filterTree(tree, { exclude: { id: [6] }, isDeleteEmptyChildren: false }),
    ).toEqual(expected);
  });

  it("should include specified nodes", () => {
    const tree = [
      {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
          { id: 3, parentId: 1 },
        ],
      },
    ];
    const expected = [
      {
        id: 1,
        parentId: null,
        children: [{ id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] }],
      },
    ];
    expect(filterTree(tree, { exclude: { id: [3] } })).toEqual(expected);
  });
});
