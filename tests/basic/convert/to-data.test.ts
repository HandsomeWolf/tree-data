import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";
import { TraversalMethod } from "../../../src/interfaces/options";

describe("treesToData", () => {
  // let treeData;
  // let tree;
  // let options;
  // beforeEach(() => {
  //   options = { childrenKey: "children", traversalMethod: "BFS" };
  //   treeData = new TreeData(tree);
  // });
  describe("basic one tree", () => {
    it("normal", () => {
      const tree = [
        {
          id: 1,
          children: [{ id: 2, children: [{ id: 4 }] }, { id: 3 }],
        },
      ];
      const expected = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

      const treeData = new TreeData(tree);
      expect(treeData.treesToData()).toEqual(expected);
    });

    it("deep tree", () => {
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
                          children: [
                            {
                              id: 7,
                              parentId: 6,
                              children: [
                                {
                                  id: 8,
                                  parentId: 7,
                                  children: [
                                    {
                                      id: 9,
                                      parentId: 8,
                                      children: [{ id: 10, parentId: 9 }],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
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
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: 1 },
        { id: 4, parentId: 2 },
        { id: 5, parentId: 4 },
        { id: 6, parentId: 5 },
        { id: 7, parentId: 6 },
        { id: 8, parentId: 7 },
        { id: 9, parentId: 8 },
        { id: 10, parentId: 9 },
      ];
      const treeData = new TreeData(tree);
      expect(treeData.treesToData()).toEqual(expected);
    });

    it("multiple trees", () => {
      const trees = [
        {
          id: 1,
          children: [{ id: 2 }, { id: 3, children: [{ id: 4 }] }],
        },
        {
          id: 5,
          children: [{ id: 6 }, { id: 7, children: [{ id: 8 }] }],
        },
      ];

      const expectedOutput = [
        [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }],
      ];
      const treeData = new TreeData(trees);
      expect(treeData.treesToData()).toEqual(expectedOutput);
    });
  });

  describe("DFS", () => {
    it("normal", () => {
      const tree = [
        {
          id: 1,
          children: [{ id: 2, children: [{ id: 4 }] }, { id: 3 }],
        },
      ];
      const expected = [{ id: 1 }, { id: 3 }, { id: 2 }, { id: 4 }];
      const treeData = new TreeData(tree);
      expect(
        treeData.treesToData({ traversalMethod: TraversalMethod.DFS }),
      ).toEqual(expected);
    });

    it("deep tree", () => {
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
                          children: [
                            {
                              id: 7,
                              parentId: 6,
                              children: [
                                {
                                  id: 8,
                                  parentId: 7,
                                  children: [
                                    {
                                      id: 9,
                                      parentId: 8,
                                      children: [{ id: 10, parentId: 9 }],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
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
        { id: 1, parentId: null },
        { id: 3, parentId: 1 },
        { id: 2, parentId: 1 },
        { id: 4, parentId: 2 },
        { id: 5, parentId: 4 },
        { id: 6, parentId: 5 },
        { id: 7, parentId: 6 },
        { id: 8, parentId: 7 },
        { id: 9, parentId: 8 },
        { id: 10, parentId: 9 },
      ];
      const treeData = new TreeData(tree);
      expect(
        treeData.treesToData({ traversalMethod: TraversalMethod.DFS }),
      ).toEqual(expected);
    });
  });

  describe("custom Children Key", () => {
    it("normal", () => {
      const tree = [
        {
          myId: 1,
          myParentId: null,
          customChildren: [
            {
              myId: 2,
              myParentId: 1,
              customChildren: [{ myId: 4, myParentId: 2 }],
            },
            { myId: 3, myParentId: 1 },
          ],
        },
      ];
      const expected = [
        { myId: 1, myParentId: null },
        { myId: 2, myParentId: 1 },
        { myId: 3, myParentId: 1 },
        { myId: 4, myParentId: 2 },
      ];
      const treeData = new TreeData(tree, { childrenKey: "customChildren" });

      expect(treeData.treesToData()).toEqual(expected);
    });
    it("deep tree", () => {
      const tree = [
        {
          id: 1,
          customChildren: [
            {
              id: 2,
              customChildren: [
                {
                  id: 4,
                  customChildren: [
                    {
                      id: 5,
                      customChildren: [
                        {
                          id: 6,
                          customChildren: [
                            {
                              id: 7,
                              customChildren: [
                                {
                                  id: 8,
                                  customChildren: [
                                    {
                                      id: 9,
                                      customChildren: [{ id: 10 }],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            { id: 3 },
          ],
        },
      ];
      const expected = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
      ];
      const treeData = new TreeData(tree, { childrenKey: "customChildren" });
      expect(treeData.treesToData()).toEqual(expected);
    });
  });

  describe("empty object and one element", () => {
    it("empty object", () => {
      const tree = [{}];
      const treeData = new TreeData(tree);
      expect(() => treeData.treesToData()).toThrow();
    });

    it("object with one element", () => {
      const tree = [{ id: 1, parentId: null }];
      const expected = [{ id: 1, parentId: null }];
      const treeData = new TreeData(tree);
      expect(treeData.treesToData()).toEqual(expected);
    });
  });

  // it("parameter is not object", () => {
  //   const tree = undefined;
  //   const treeData = new TreeData(tree);
  //   console.log(JSON.stringify(treeData.treesToData(tree as any)));

  //   expect(() => treeData.treesToData(tree as any)).toThrow();
  // });
});
