import { describe, expect, it } from "vitest";
import { filterTree } from "../../../src/index";

describe("filterTree", () => {
  describe("exclude", () => {
    it("normal", () => {
      const tree = {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
          { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
        ],
      };
      const expected = {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [] },
          { id: 3, parentId: 1, children: [] },
        ],
      };

      expect(filterTree(tree, { exclude: { id: [4] } })).toEqual(expected);
    });
    it("repeat key", () => {
      const tree = {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [{ id: 4, parentId: 2, name: "wolf" }],
          },
          {
            id: 3,
            parentId: 1,
            children: [{ id: 5, parentId: 3, name: "wolf" }],
          },
        ],
      };
      const expected = {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [] },
          { id: 3, parentId: 1, children: [] },
        ],
      };
      expect(filterTree(tree, { exclude: { name: ["wolf"] } })).toEqual(
        expected,
      );
    });
    it("many", () => {
      const tree = {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
          { id: 3, parentId: 1 },
        ],
      };
      const expected = {
        id: 1,
        parentId: null,
        children: [{ id: 2, parentId: 1, children: [] }],
      };
      expect(filterTree(tree, { exclude: { id: [4, 3] } })).toEqual(expected);
    });

    it("isDeleteEmptyChildren -> true", () => {
      const tree = {
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
      };
      const expected = {
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
              },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      };
      expect(
        filterTree(tree, {
          exclude: { id: [5, 6] },
          isDeleteEmptyChildren: true,
        }),
      ).toEqual(expected);
    });

    it("isDeleteEmptyChildren -> false", () => {
      const tree = {
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
      };
      const expected = {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [],
          },
          { id: 3, parentId: 1 },
        ],
      };
      expect(
        filterTree(tree, {
          exclude: { id: [4, 6] },
          isDeleteEmptyChildren: false,
        }),
      ).toEqual(expected);
    });
  });

  describe("include", () => {
    it("normal", () => {
      const tree = {
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
                  {
                    id: 5,
                    parentId: 4,
                    children: [
                      {
                        id: 6,
                        parentId: 5,
                        children: [{ id: 7, parentId: 6 }],
                      },
                      {
                        id: 8,
                        parentId: 5,
                        children: [{ id: 9, parentId: 8 }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      };
      const expected = {
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
                  {
                    id: 5,
                    parentId: 4,
                    children: [
                      {
                        id: 6,
                        parentId: 5,
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(filterTree(tree, { include: { id: [6] } })).toEqual(expected);
    });
    it("normal", () => {
      const tree = {
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
                  {
                    id: 5,
                    parentId: 4,
                    children: [
                      {
                        id: 6,
                        parentId: 5,
                        name: "wolf",
                        children: [{ id: 7, parentId: 6 }],
                      },
                      {
                        id: 6,
                        parentId: 5,
                        name: "wolf",
                        children: [{ id: 7, parentId: 6 }],
                      },
                      {
                        id: 8,
                        parentId: 5,
                        children: [{ id: 9, parentId: 8 }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      };
      const expected = {
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
                  {
                    id: 5,
                    parentId: 4,
                    children: [
                      { id: 6, parentId: 5, name: "wolf", children: [] },
                      { id: 6, parentId: 5, name: "wolf", children: [] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      // expect(filterTree(tree, { include: { id: [6] } })).toEqual(expected);
      expect(filterTree(tree, { include: { name: ["wolf"] } })).toEqual(
        expected,
      );
    });
    it("isDeleteEmptyChildren -> true", () => {
      const tree = {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              { id: 4, parentId: 2 },
              { id: 5, parentId: 2 },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      };
      const expected = {
        id: 1,
        parentId: null,
        children: [{ id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] }],
      };
      expect(
        filterTree(tree, {
          include: { id: [4] },
          isDeleteEmptyChildren: true,
        }),
      ).toEqual(expected);
    });
    it("isDeleteEmptyChildren -> false", () => {
      const tree = {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
          { id: 3, parentId: 1 },
        ],
      };
      const expected = {
        id: 1,
        parentId: null,
        children: [{ id: 3, parentId: 1 }],
      };
      expect(
        filterTree(tree, {
          include: { id: [3] },
          isDeleteEmptyChildren: false,
        }),
      ).toEqual(expected);
    });
    it("many", () => {
      const tree = {
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
                  {
                    id: 5,
                    parentId: 4,
                    children: [
                      {
                        id: 6,
                        parentId: 5,
                        children: [{ id: 7, parentId: 6 }],
                      },
                      {
                        id: 8,
                        parentId: 5,
                        children: [{ id: 9, parentId: 8 }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      };
      const expected = {
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
                  {
                    id: 5,
                    parentId: 4,
                    children: [
                      { id: 6, parentId: 5 },
                      { id: 8, parentId: 5 },
                    ],
                  },
                ],
              },
            ],
          },
          { id: 3, parentId: 1 },
        ],
      };
      expect(
        filterTree(tree, {
          include: { id: [6, 8, 3] },
          isDeleteEmptyChildren: true,
        }),
      ).toEqual(expected);
    });
  });

  describe("exclude and include", () => {
    it("normal", () => {
      const tree = {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
          { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
        ],
      };
      const expected = {
        id: 1,
        parentId: null,
        children: [{ id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] }],
      };
      expect(
        filterTree(tree, { exclude: { id: [4] }, include: { parentId: [3] } }),
      ).toEqual(expected);
    });
  });
});
