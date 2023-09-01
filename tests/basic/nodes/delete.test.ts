import { describe, expect, it } from "vitest";
import { deleteNodes, deleteNodesByIds } from "../../../src/index";

describe("deleteNodesByIds", () => {
  describe("basic", () => {
    it("normal", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];

      const idsToDelete = [2, 4];

      const expected = [{ id: 1, children: [] }];

      expect(deleteNodesByIds(tree, idsToDelete)).toEqual(expected);
    });
    it("deep", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [
                    {
                      id: 5,
                      children: [
                        {
                          id: 6,
                          children: [
                            {
                              id: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 8,
                },
                {
                  id: 9,
                  children: [
                    {
                      id: 10,
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];

      const idsToDelete = [5, 10];

      const expected = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                { id: 3, children: [] },
                { id: 8 },
                { id: 9, children: [] },
              ],
            },
            { id: 4 },
          ],
        },
      ];

      expect(deleteNodesByIds(tree, idsToDelete)).toEqual(expected);
    });
    it("normal isDeleteEmptyChildren -> true", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];

      const idsToDelete = [2, 4];

      const expected = [{ id: 1 }];

      expect(
        deleteNodesByIds(tree, idsToDelete, { isDeleteEmptyChildren: true }),
      ).toEqual(expected);
    });
    it("deep isDeleteEmptyChildren -> true", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [
                    {
                      id: 5,
                      children: [
                        {
                          id: 6,
                          children: [
                            {
                              id: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 8,
                },
                {
                  id: 9,
                  children: [
                    {
                      id: 10,
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];

      const idsToDelete = [5, 10];

      const expected = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [{ id: 3 }, { id: 8 }, { id: 9 }],
            },
            { id: 4 },
          ],
        },
      ];

      expect(
        deleteNodesByIds(tree, idsToDelete, { isDeleteEmptyChildren: true }),
      ).toEqual(expected);
    });
    it("deep isDeleteEmptyChildren -> true and deleteSelf -> false", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [
                    {
                      id: 5,
                      children: [
                        {
                          id: 6,
                          children: [
                            {
                              id: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 8,
                },
                {
                  id: 9,
                  children: [
                    {
                      id: 10,
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];

      const idsToDelete = [5, 9];

      const expected = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [{ id: 5 }],
                },
                { id: 8 },
                { id: 9 },
              ],
            },
            { id: 4 },
          ],
        },
      ];

      expect(
        deleteNodesByIds(tree, idsToDelete, {
          isDeleteEmptyChildren: true,
          deleteSelf: false,
        }),
      ).toEqual(expected);
    });
    it("deep isDeleteEmptyChildren -> false and deleteSelf -> true", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [
                    {
                      id: 5,
                      children: [
                        {
                          id: 6,
                          children: [
                            {
                              id: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 8,
                },
                {
                  id: 9,
                  children: [
                    {
                      id: 10,
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];

      const idsToDelete = [5, 9];

      const expected = [
        {
          id: 1,
          children: [
            { id: 2, children: [{ id: 3, children: [] }, { id: 8 }] },
            { id: 4 },
          ],
        },
      ];

      expect(
        deleteNodesByIds(tree, idsToDelete, {
          isDeleteEmptyChildren: false,
          deleteSelf: true,
        }),
      ).toEqual(expected);
    });
  });
  describe("custom key name", () => {
    it("normal", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 6,
            },
            {
              myId: 2,
              myChildren: [
                {
                  myId: 3,
                },
                {
                  myId: 4,
                },
                {
                  myId: 6,
                },
              ],
            },
            {
              myId: 5,
              myChildren: [
                {
                  myId: 6,
                },
              ],
            },
            {
              myId: 6,
            },
          ],
        },
        {
          myId: 6,
        },
        {
          myId: 6,
        },
      ];

      const idsToDelete = [2, 6];

      const expected = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 5,
              myChildren: [],
            },
          ],
        },
      ];

      expect(
        deleteNodesByIds(tree, idsToDelete, {
          childrenKey: "myChildren",
          idKey: "myId",
        }),
      ).toEqual(expected);
    });
    it("deep", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                {
                  myId: 3,
                  myChildren: [
                    {
                      myId: 5,
                      myChildren: [
                        {
                          myId: 6,
                          myChildren: [
                            {
                              myId: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  myId: 8,
                },
                {
                  myId: 9,
                  myChildren: [
                    {
                      myId: 10,
                    },
                  ],
                },
              ],
            },
            {
              myId: 4,
            },
          ],
        },
      ];

      const idsToDelete = [5, 10];

      const expected = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                { myId: 3, myChildren: [] },
                { myId: 8 },
                { myId: 9, myChildren: [] },
              ],
            },
            { myId: 4 },
          ],
        },
      ];
      expect(
        deleteNodesByIds(tree, idsToDelete, {
          childrenKey: "myChildren",
          idKey: "myId",
        }),
      ).toEqual(expected);
    });
    it("normal isDeleteEmptyChildren -> true", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 6,
            },
            {
              myId: 2,
              myChildren: [
                {
                  myId: 3,
                },
                {
                  myId: 4,
                },
                {
                  myId: 6,
                },
              ],
            },
            {
              myId: 5,
              myChildren: [
                {
                  myId: 6,
                },
              ],
            },
            {
              myId: 6,
            },
          ],
        },
        {
          myId: 6,
        },
        {
          myId: 6,
        },
      ];

      const idsToDelete = [2, 6];

      const expected = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 5,
            },
          ],
        },
      ];

      expect(
        deleteNodesByIds(tree, idsToDelete, {
          childrenKey: "myChildren",
          idKey: "myId",
          isDeleteEmptyChildren: true,
        }),
      ).toEqual(expected);
    });
    it("deep isDeleteEmptyChildren -> true", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                {
                  myId: 3,
                  myChildren: [
                    {
                      myId: 5,
                      myChildren: [
                        {
                          myId: 6,
                          myChildren: [
                            {
                              myId: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  myId: 8,
                },
                {
                  myId: 9,
                  myChildren: [
                    {
                      myId: 10,
                    },
                  ],
                },
              ],
            },
            {
              myId: 4,
            },
          ],
        },
      ];

      const idsToDelete = [5, 10];

      const expected = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [{ myId: 3 }, { myId: 8 }, { myId: 9 }],
            },
            { myId: 4 },
          ],
        },
      ];
      expect(
        deleteNodesByIds(tree, idsToDelete, {
          childrenKey: "myChildren",
          idKey: "myId",
          isDeleteEmptyChildren: true,
        }),
      ).toEqual(expected);
    });
    it("deep isDeleteEmptyChildren -> true or deleteSelf -> false", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                {
                  myId: 3,
                  myChildren: [
                    {
                      myId: 5,
                      myChildren: [
                        {
                          myId: 6,
                          myChildren: [
                            {
                              myId: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  myId: 8,
                },
                {
                  myId: 9,
                  myChildren: [
                    {
                      myId: 10,
                    },
                  ],
                },
              ],
            },
            {
              myId: 4,
            },
          ],
        },
      ];

      const idsToDelete = [5, 9];

      const expected = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                {
                  myId: 3,
                  myChildren: [{ myId: 5 }],
                },
                { myId: 8 },
                { myId: 9 },
              ],
            },
            { myId: 4 },
          ],
        },
      ];

      expect(
        deleteNodesByIds(tree, idsToDelete, {
          isDeleteEmptyChildren: true,
          deleteSelf: false,
          childrenKey: "myChildren",
          idKey: "myId",
        }),
      ).toEqual(expected);
    });
    it("deep isDeleteEmptyChildren -> false or deleteSelf -> true", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                {
                  myId: 3,
                  myChildren: [
                    {
                      myId: 5,
                      myChildren: [
                        {
                          myId: 6,
                          myChildren: [
                            {
                              myId: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  myId: 8,
                },
                {
                  myId: 9,
                  myChildren: [
                    {
                      myId: 10,
                    },
                  ],
                },
              ],
            },
            {
              myId: 4,
            },
          ],
        },
      ];

      const idsToDelete = [5, 9];

      const expected = [
        {
          myId: 1,
          myChildren: [
            { myId: 2, myChildren: [{ myId: 3, myChildren: [] }, { myId: 8 }] },
            { myId: 4 },
          ],
        },
      ];

      expect(
        deleteNodesByIds(tree, idsToDelete, {
          isDeleteEmptyChildren: false,
          deleteSelf: true,
          childrenKey: "myChildren",
          idKey: "myId",
        }),
      ).toEqual(expected);
    });
  });
});

describe("deleteNodes", () => {
  describe("basic", () => {
    it("normal", () => {
      const tree = [
        {
          id: 1,
          children: [{ id: 2, children: [{ id: 3 }, { id: 4 }] }, { id: 5 }],
        },
        { id: 6 },
      ];
      const result = deleteNodes(
        tree,
        (node) => node.id === 2 || node.id === 3,
      );

      expect(result).toEqual([
        {
          id: 1,
          children: [{ id: 5 }],
        },
        { id: 6 },
      ]);
    });
    it("deep", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [
                    {
                      id: 5,
                      children: [
                        {
                          id: 6,
                          children: [
                            {
                              id: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 8,
                },
                {
                  id: 9,
                  children: [
                    {
                      id: 10,
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];
      const result = deleteNodes(
        tree,
        (node) => node.id === 5 || node.id === 10,
      );
      const expected = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                { id: 3, children: [] },
                { id: 8 },
                { id: 9, children: [] },
              ],
            },
            { id: 4 },
          ],
        },
      ];

      expect(result).toEqual(expected);
    });
    it("deep isDeleteEmptyChildren -> true", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [
                    {
                      id: 5,
                      children: [
                        {
                          id: 6,
                          children: [
                            {
                              id: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 8,
                },
                {
                  id: 9,
                  children: [
                    {
                      id: 10,
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];
      const result = deleteNodes(
        tree,
        (node) => node.id === 5 || node.id === 10,
        {
          isDeleteEmptyChildren: true,
        },
      );
      const expected = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [{ id: 3 }, { id: 8 }, { id: 9 }],
            },
            { id: 4 },
          ],
        },
      ];

      expect(result).toEqual(expected);
    });
    it("deep isDeleteEmptyChildren -> true and deleteSelf -> true", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [
                    {
                      id: 5,
                      children: [
                        {
                          id: 6,
                          children: [
                            {
                              id: 7,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 8,
                },
                {
                  id: 9,
                  children: [
                    {
                      id: 10,
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
            },
          ],
        },
      ];
      const result = deleteNodes(
        tree,
        (node) => node.id === 5 || node.id === 9,
        {
          isDeleteEmptyChildren: true,
        },
      );
      const expected = [
        {
          id: 1,
          children: [{ id: 2, children: [{ id: 3 }, { id: 8 }] }, { id: 4 }],
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
