import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";
let treeData: TreeData;
describe("filterTree", () => {
  describe("exclude", () => {
    it("normal", () => {
      const tree = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
          ],
        },
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
          ],
        },
      ];
      const expected = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [] },
            { id: 3, parentId: 1, children: [] },
          ],
        },
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [] },
            { id: 3, parentId: 1, children: [] },
          ],
        },
      ];
      treeData = new TreeData(tree);
      expect(treeData.filterTree({ exclude: { id: [4] } }).getResult()).toEqual(
        expected,
      );
    });
    it("repeat key", () => {
      const tree = [
        {
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
        },
        {
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
        },
      ];
      const expected = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [] },
            { id: 3, parentId: 1, children: [] },
          ],
        },
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [] },
            { id: 3, parentId: 1, children: [] },
          ],
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData.filterTree({ exclude: { name: ["wolf"] } }).getResult(),
      ).toEqual(expected);
    });
    it("many", () => {
      const tree = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1 },
          ],
        },
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
          children: [{ id: 2, parentId: 1, children: [] }],
        },
        {
          id: 1,
          parentId: null,
          children: [{ id: 2, parentId: 1, children: [] }],
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData.filterTree({ exclude: { id: [4, 3] } }).getResult(),
      ).toEqual(expected);
    });

    it("isDeleteEmptyChildren -> true", () => {
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
                },
              ],
            },
            { id: 3, parentId: 1 },
          ],
        },
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
                },
              ],
            },
            { id: 3, parentId: 1 },
          ],
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData
          .filterTree({
            exclude: { id: [5, 6] },
            isDeleteEmptyChildren: true,
          })
          .getResult(),
      ).toEqual(expected);
    });

    it("isDeleteEmptyChildren -> false", () => {
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
              children: [],
            },
            { id: 3, parentId: 1 },
          ],
        },
        {
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
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData
          .filterTree({
            exclude: { id: [4, 6] },
            isDeleteEmptyChildren: false,
          })
          .getResult(),
      ).toEqual(expected);
    });
  });

  describe("include", () => {
    it("normal", () => {
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
        },
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
        },
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
        },
      ];
      treeData = new TreeData(tree);
      expect(treeData.filterTree({ include: { id: [6] } }).getResult()).toEqual(
        expected,
      );
    });
    it("normal", () => {
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
        },
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
        },
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
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData.filterTree({ include: { name: ["wolf"] } }).getResult(),
      ).toEqual(expected);
    });
    it("isDeleteEmptyChildren -> true", () => {
      const tree = [
        {
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
        },
        {
          id: 1,
          parentId: null,
          children: [
            {
              id: 2,
              parentId: 1,
              children: [{ id: 5, parentId: 2 }],
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
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
          ],
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData
          .filterTree({
            include: { id: [4] },
            isDeleteEmptyChildren: true,
          })
          .getResult(),
      ).toEqual(expected);
    });
    it("isDeleteEmptyChildren -> false", () => {
      const tree = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1 },
          ],
        },
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
          children: [{ id: 3, parentId: 1 }],
        },
        {
          id: 1,
          parentId: null,
          children: [{ id: 3, parentId: 1 }],
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData
          .filterTree({
            include: { id: [3] },
            isDeleteEmptyChildren: false,
          })
          .getResult(),
      ).toEqual(expected);
    });
    it("many", () => {
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
        },
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
        },
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
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData
          .filterTree({
            include: { id: [6, 8, 3] },
            isDeleteEmptyChildren: true,
          })
          .getResult(),
      ).toEqual(expected);
    });
  });

  describe("exclude and include", () => {
    it("normal", () => {
      const tree = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
          ],
        },
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
          ],
        },
      ];
      const expected = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
          ],
        },
        {
          id: 1,
          parentId: null,
          children: [
            { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
          ],
        },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData
          .filterTree({ exclude: { id: [4] }, include: { parentId: [3] } })
          .getResult(),
      ).toEqual(expected);
    });
  });

  describe("include does not exist", () => {
    it("normal", () => {
      const tree = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
          ],
        },
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1, children: [{ id: 4, parentId: 3 }] },
          ],
        },
      ];
      const expected = null;
      treeData = new TreeData(tree);
      expect(
        treeData
          .filterTree({
            include: { parentId: [888] },
          })
          .getResult(),
      ).toEqual(expected);
    });
  });

  describe("custom", () => {
    it("normal", () => {
      const tree = [
        {
          myId: 1,
          myParentId: null,
          children: [
            { myId: 2, myParentId: 1, children: [{ myId: 4, myParentId: 2 }] },
            { myId: 3, myParentId: 1, children: [{ myId: 6, myParentId: 3 }] },
          ],
        },
        {
          myId: 8,
          myParentId: null,
          children: [
            { myId: 2, myParentId: 1, children: [{ myId: 4, myParentId: 2 }] },
            { myId: 3, myParentId: 1, children: [{ myId: 5, myParentId: 3 }] },
          ],
        },
      ];
      const expected = [
        {
          myId: 1,
          myParentId: null,
          children: [
            {
              myId: 3,
              myParentId: 1,
              children: [{ myId: 6, myParentId: 3 }],
            },
          ],
        },
      ];
      treeData = new TreeData(tree, {
        idKey: "myId",
        parentIdKey: "myParentId",
        childrenKey: "children",
      });
      expect(
        treeData
          .filterTree({
            include: { myId: [6] },
          })
          .getResult(),
      ).toEqual(expected);
    });
  });
});
