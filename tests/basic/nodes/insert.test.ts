import { describe, expect, it } from "vitest";
import { insertNodes, insertNodesById } from "../../../src/index";

describe("insertNodes", () => {
  it("should insert nodes correctly", () => {
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

    expect(insertNodesById(tree, 1, newNodes)).toEqual(expected);
  });

  it("should insert nodes correctly", () => {
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

    expect(insertNodesById(tree, 1, newNodes)).toEqual(expected);
  });

  it("custom", () => {
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
      insertNodesById(tree, 1, newNodes, {
        childrenKey: "myChildren",
        idKey: "myId",
      }),
    ).toEqual(expected);
  });
});

describe("insertNodes", () => {
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
