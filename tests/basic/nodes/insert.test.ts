import { describe, expect, it } from "vitest";
import { insertNodes, insertNodesById } from "../../../src/index";

describe("insertNodes", () => {
  describe("basic", () => {
    it("normal", () => {
      const tree = [
        {
          id: 1,
          children: [{ id: 2 }, { id: 3 }],
        },
        {
          id: 4,
          children: [{ id: 5 }],
        },
      ];

      const newNodes = [{ id: 6 }, { id: 7 }];

      const expected = [
        {
          id: 1,
          children: [{ id: 2 }, { id: 3 }, { id: 6 }, { id: 7 }],
        },
        {
          id: 4,
          children: [{ id: 5 }],
        },
      ];

      expect(insertNodesById(tree, [1], newNodes)).toEqual(expected);
    });
    it("no children", () => {
      const tree = [
        {
          id: 1,
        },
        {
          id: 4,
          children: [{ id: 5 }],
        },
      ];

      const newNodes = [{ id: 6 }, { id: 7 }];

      const expected = [
        {
          id: 1,
          children: [{ id: 6 }, { id: 7 }],
        },
        {
          id: 4,
          children: [{ id: 5 }],
        },
      ];

      expect(insertNodesById(tree, [1], newNodes)).toEqual(expected);
    });
    it("no children and deep insert new nodes", () => {
      const tree = [
        {
          id: 1,
        },
        {
          id: 4,
          children: [
            {
              id: 5,
              children: [
                {
                  id: 6,
                  children: [
                    { id: 7, children: [{ id: 8, children: [{ id: 9 }] }] },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const newNodes = [{ id: 2 }, { id: 3 }];

      const expected = [
        { id: 1 },
        {
          id: 4,
          children: [
            {
              id: 5,
              children: [
                {
                  id: 6,
                  children: [
                    {
                      id: 7,
                      children: [
                        {
                          id: 8,
                          children: [
                            { id: 9, children: [{ id: 2 }, { id: 3 }] },
                          ],
                        },
                      ],
                    },
                  ],
                },
                { id: 2 },
                { id: 3 },
              ],
            },
          ],
        },
      ];

      expect(insertNodesById(tree, [5, 9], newNodes)).toEqual(expected);
    });
  });

  describe("custom", () => {
    it("normal", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [{ myId: 2 }, { myId: 3 }],
        },
        {
          myId: 4,
          myChildren: [{ myId: 5 }],
        },
      ];

      const newNodes = [{ myId: 6 }, { myId: 7 }];

      const expected = [
        {
          myId: 1,
          myChildren: [{ myId: 2 }, { myId: 3 }, { myId: 6 }, { myId: 7 }],
        },
        {
          myId: 4,
          myChildren: [{ myId: 5 }],
        },
      ];

      expect(
        insertNodesById(tree, [1], newNodes, {
          childrenKey: "myChildren",
          idKey: "myId",
        }),
      ).toEqual(expected);
    });
    it("no children", () => {
      const tree = [
        {
          myId: 1,
        },
        {
          myId: 4,
          myChildren: [{ myId: 5 }],
        },
      ];

      const newNodes = [{ myId: 6 }, { myId: 7 }];

      const expected = [
        {
          myId: 1,
          myChildren: [{ myId: 6 }, { myId: 7 }],
        },
        {
          myId: 4,
          myChildren: [{ myId: 5 }],
        },
      ];

      expect(
        insertNodesById(tree, [1], newNodes, {
          childrenKey: "myChildren",
          idKey: "myId",
        }),
      ).toEqual(expected);
    });
    it("no children and deep insert new nodes", () => {
      const tree = [
        {
          myId: 1,
        },
        {
          myId: 4,
          myChildren: [
            {
              myId: 5,
              myChildren: [
                {
                  myId: 6,
                  myChildren: [
                    {
                      myId: 7,
                      myChildren: [{ myId: 8, myChildren: [{ myId: 9 }] }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const newNodes = [{ myId: 2 }, { myId: 3 }];

      const expected = [
        { myId: 1 },
        {
          myId: 4,
          myChildren: [
            {
              myId: 5,
              myChildren: [
                {
                  myId: 6,
                  myChildren: [
                    {
                      myId: 7,
                      myChildren: [
                        {
                          myId: 8,
                          myChildren: [
                            { myId: 9, myChildren: [{ myId: 2 }, { myId: 3 }] },
                          ],
                        },
                      ],
                    },
                  ],
                },
                { myId: 2 },
                { myId: 3 },
              ],
            },
          ],
        },
      ];

      expect(
        insertNodesById(tree, [5, 9], newNodes, {
          childrenKey: "myChildren",
          idKey: "myId",
        }),
      ).toEqual(expected);
    });
  });
});

describe("insertNodes", () => {
  describe("basic", () => {
    it("normal", () => {
      const tree = [
        { id: 1, name: "Node 1", children: [] },
        { id: 2, name: "Node 2", children: [] },
        { id: 3, name: "Node 3", children: [] },
      ];
      const newNodes = [
        { id: 4, name: "Node 4", children: [] },
        { id: 5, name: "Node 5", children: [] },
      ];

      const result = insertNodes(tree, (node) => node.id === 2, newNodes);

      expect(result).toEqual([
        { id: 1, name: "Node 1", children: [] },
        {
          id: 2,
          name: "Node 2",
          children: [
            { id: 4, name: "Node 4", children: [] },
            { id: 5, name: "Node 5", children: [] },
          ],
        },
        { id: 3, name: "Node 3", children: [] },
      ]);
    });
    it("no children", () => {
      const tree = [
        { id: 1, name: "Node 1" },
        { id: 2, name: "Node 2" },
        { id: 3, name: "Node 3" },
      ];
      const newNodes = [
        { id: 4, name: "Node 4" },
        { id: 5, name: "Node 5" },
      ];

      const result = insertNodes(tree, (node) => node.id === 2, newNodes);

      expect(result).toEqual([
        { id: 1, name: "Node 1" },
        {
          id: 2,
          name: "Node 2",
          children: [
            { id: 4, name: "Node 4" },
            { id: 5, name: "Node 5" },
          ],
        },
        { id: 3, name: "Node 3" },
      ]);
    });
    it("no children and deep", () => {
      const tree = [
        {
          id: 1,
          name: "Node 1",
          children: [
            {
              id: 2,
              name: "Node 2",
              children: [
                {
                  id: 3,
                  name: "Node 3",
                  children: [
                    {
                      id: 4,
                      name: "Node 4",
                      children: [
                        {
                          id: 5,
                          name: "Node 5",
                          children: [
                            {
                              id: 6,
                              name: "Node 6",
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
        { id: 7, name: "Node 2" },
        { id: 8, name: "Node 3" },
      ];
      const newNodes = [
        { id: 9, name: "Node 9" },
        { id: 10, name: "Node 10" },
      ];

      const expected = [
        {
          id: 1,
          name: "Node 1",
          children: [
            {
              id: 2,
              name: "Node 2",
              children: [
                {
                  id: 3,
                  name: "Node 3",
                  children: [
                    {
                      id: 4,
                      name: "Node 4",
                      children: [
                        {
                          id: 5,
                          name: "Node 5",
                          children: [{ id: 6, name: "Node 6" }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { id: 7, name: "Node 2" },
        { id: 8, name: "Node 3" },
      ];

      const result = insertNodes(tree, (node) => node.id === 6, newNodes);

      expect(result).toEqual(expected);
    });
  });

  it("should insert new nodes into the tree based on the query function", () => {
    const tree = [
      { id: 1, name: "Node 1", children: [] },
      { id: 2, name: "Node 2", children: [] },
      { id: 3, name: "Node 3", children: [] },
    ];
    const newNodes = [
      { id: 4, name: "Node 4", children: [] },
      { id: 5, name: "Node 5", children: [] },
    ];

    const result = insertNodes(tree, (node) => node.id > 1, newNodes);

    expect(result).toEqual([
      { id: 1, name: "Node 1", children: [] },
      {
        id: 2,
        name: "Node 2",
        children: [
          { id: 4, name: "Node 4", children: [] },
          { id: 5, name: "Node 5", children: [] },
        ],
      },
      {
        id: 3,
        name: "Node 3",
        children: [
          { id: 4, name: "Node 4", children: [] },
          { id: 5, name: "Node 5", children: [] },
        ],
      },
    ]);
  });

  it("should not modify the tree if no nodes match the query function", () => {
    const tree = [
      { id: 1, name: "Node 1", children: [] },
      { id: 2, name: "Node 2", children: [] },
      { id: 3, name: "Node 3", children: [] },
    ];
    const newNodes = [
      { id: 4, name: "Node 4", children: [] },
      { id: 5, name: "Node 5", children: [] },
    ];

    const result = insertNodes(tree, (node) => node.id === 4, newNodes);

    expect(result).toEqual(tree);
  });
});
