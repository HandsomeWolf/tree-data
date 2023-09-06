import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";
let treeData: TreeData;
interface TreeNode {
  [key: string]: any;
}
describe("modifyNodes", () => {
  describe("basic", () => {
    it("normal", () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [{ id: 2 }],
        },
        {
          id: 1,
          children: [{ id: 2 }],
        },
      ];
      treeData = new TreeData(tree);
      const modifiedTree = treeData
        .modifyNodes((node) => {
          node.newKey = "newValue";
          return node;
        })
        .getResult();

      expect(modifiedTree).toEqual([
        {
          id: 1,
          children: [{ id: 2, newKey: "newValue" }],
          newKey: "newValue",
        },
        {
          id: 1,
          children: [{ id: 2, newKey: "newValue" }],
          newKey: "newValue",
        },
      ]);
    });
    it("deep", () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            { id: 2 },
            {
              id: 3,
              children: [
                {
                  id: 4,
                  children: [{ id: 5, children: [{ id: 6 }] }, { id: 7 }],
                },
              ],
            },
          ],
        },
      ];
      treeData = new TreeData(tree);
      const modifiedTree = treeData
        .modifyNodes((node) => {
          node.newKey = "newValue";
          return node;
        })
        .getResult();

      expect(modifiedTree).toEqual([
        {
          id: 1,
          children: [
            { id: 2, newKey: "newValue" },
            {
              id: 3,
              children: [
                {
                  id: 4,
                  children: [
                    {
                      id: 5,
                      children: [{ id: 6, newKey: "newValue" }],
                      newKey: "newValue",
                    },
                    { id: 7, newKey: "newValue" },
                  ],
                  newKey: "newValue",
                },
              ],
              newKey: "newValue",
            },
          ],
          newKey: "newValue",
        },
      ]);
    });

    it("specified", () => {
      const tree = [
        {
          id: 1,
          value: "node1",
          children: [
            {
              id: 4,
              value: "node4",
              children: [
                {
                  id: 5,
                  value: "node5",
                  children: [
                    {
                      id: 6,
                      value: "node6",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { id: 2, value: "node2", children: [] },
        { id: 3, value: "node3", children: [] },
      ];
      treeData = new TreeData(tree);
      const newTree = treeData
        .modifyNodes(
          (node) => {
            if (node.id === 1 || node.id === 6) {
              node.newKey = "newValue";
            }
            return node;
          },
          {
            childrenKey: "children",
          },
        )
        .getResult();

      expect(newTree).toEqual([
        {
          id: 1,
          value: "node1",
          children: [
            {
              id: 4,
              value: "node4",
              children: [
                {
                  id: 5,
                  value: "node5",
                  children: [
                    { id: 6, value: "node6", children: [], newKey: "newValue" },
                  ],
                },
              ],
            },
          ],
          newKey: "newValue",
        },
        { id: 2, value: "node2", children: [] },
        { id: 3, value: "node3", children: [] },
      ]);
    });
  });

  describe("custom", () => {
    it("normal", () => {
      const tree: TreeNode[] = [
        {
          myId: 1,
          myChildren: [{ myId: 2 }],
        },
      ];
      treeData = new TreeData(tree);
      const newTree = treeData
        .modifyNodes(
          (node) => {
            node.newKey = "newValue";
            return node;
          },
          {
            childrenKey: "myChildren",
          },
        )
        .getResult();
      expect(newTree).toEqual([
        {
          myId: 1,
          myChildren: [{ myId: 2, newKey: "newValue" }],
          newKey: "newValue",
        },
      ]);
    });
    it("deep", () => {
      const tree: TreeNode[] = [
        {
          myId: 1,
          myChildren: [
            { myId: 2 },
            {
              myId: 3,
              myChildren: [
                {
                  myId: 4,
                  myChildren: [
                    {
                      myId: 5,
                      myChildren: [{ myId: 6, myChildren: [{ myId: 7 }] }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { myId: 8, myChildren: [{ myId: 9 }] },
      ];
      treeData = new TreeData(tree);
      const newTree = treeData
        .modifyNodes(
          (node) => {
            node.newKey = "newValue";
            return node;
          },
          {
            childrenKey: "myChildren",
          },
        )
        .getResult();

      expect(newTree).toEqual([
        {
          myId: 1,
          myChildren: [
            { myId: 2, newKey: "newValue" },
            {
              myId: 3,
              myChildren: [
                {
                  myId: 4,
                  myChildren: [
                    {
                      myId: 5,
                      myChildren: [
                        {
                          myId: 6,
                          myChildren: [{ myId: 7, newKey: "newValue" }],
                          newKey: "newValue",
                        },
                      ],
                      newKey: "newValue",
                    },
                  ],
                  newKey: "newValue",
                },
              ],
              newKey: "newValue",
            },
          ],
          newKey: "newValue",
        },
        {
          myId: 8,
          myChildren: [{ myId: 9, newKey: "newValue" }],
          newKey: "newValue",
        },
      ]);
    });
  });
});

describe("modifyNodesByIds", () => {
  describe("basic", () => {
    it("normal", () => {
      const tree = [
        { id: 1, value: "node1", children: [] },
        { id: 2, value: "node2", children: [] },
        { id: 3, value: "node3", children: [] },
      ];

      const ids = [1, 3];
      const keyValuePairs = { value: "modified" };
      treeData = new TreeData(tree);
      const modifiedTree = treeData
        .modifyNodesByIds(ids, keyValuePairs)
        .getResult();

      expect(modifiedTree).toEqual([
        { id: 1, value: "modified", children: [] },
        { id: 2, value: "node2", children: [] },
        { id: 3, value: "modified", children: [] },
      ]);
    });
    it("deep", () => {
      const tree = [
        {
          id: 1,
          value: "node1",
          children: [
            {
              id: 4,
              value: "node4",
              children: [
                {
                  id: 5,
                  value: "node5",
                  children: [
                    {
                      id: 6,
                      value: "node6",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { id: 2, value: "node2", children: [] },
        { id: 3, value: "node3", children: [] },
      ];

      const ids = [1, 6];
      const keyValuePairs = { value: "modified" };
      treeData = new TreeData(tree);
      const modifiedTree = treeData
        .modifyNodesByIds(ids, keyValuePairs)
        .getResult();

      expect(modifiedTree).toEqual([
        {
          id: 1,
          value: "modified",
          children: [
            {
              id: 4,
              value: "node4",
              children: [
                {
                  id: 5,
                  value: "node5",
                  children: [{ id: 6, value: "modified", children: [] }],
                },
              ],
            },
          ],
        },
        { id: 2, value: "node2", children: [] },
        { id: 3, value: "node3", children: [] },
      ]);
    });
  });
  describe("custom", () => {
    it("normal", () => {
      const tree = [
        { myId: 1, value: "node1", myChildren: [] },
        { myId: 2, value: "node2", myChildren: [] },
        { myId: 3, value: "node3", myChildren: [] },
      ];

      const ids = [1, 3];
      const keyValuePairs = { value: "modified" };
      treeData = new TreeData(tree);
      const modifiedTree = treeData
        .modifyNodesByIds(ids, keyValuePairs, {
          idKey: "myId",
          childrenKey: "myChildren",
        })
        .getResult();

      expect(modifiedTree).toEqual([
        { myId: 1, value: "modified", myChildren: [] },
        { myId: 2, value: "node2", myChildren: [] },
        { myId: 3, value: "modified", myChildren: [] },
      ]);
    });
    it("deep", () => {
      const tree = [
        {
          myId: 1,
          value: "node1",
          myChildren: [
            {
              myId: 4,
              value: "node4",
              myChildren: [
                {
                  myId: 5,
                  value: "node5",
                  myChildren: [
                    {
                      myId: 6,
                      value: "node6",
                      myChildren: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { myId: 2, value: "node2", myChildren: [] },
        { myId: 3, value: "node3", myChildren: [] },
      ];

      const ids = [1, 6];
      const keyValuePairs = { value: "modified" };
      treeData = new TreeData(tree);
      const modifiedTree = treeData
        .modifyNodesByIds(ids, keyValuePairs, {
          idKey: "myId",
          childrenKey: "myChildren",
        })
        .getResult();

      expect(modifiedTree).toEqual([
        {
          myId: 1,
          value: "modified",
          myChildren: [
            {
              myId: 4,
              value: "node4",
              myChildren: [
                {
                  myId: 5,
                  value: "node5",
                  myChildren: [{ myId: 6, value: "modified", myChildren: [] }],
                },
              ],
            },
          ],
        },
        { myId: 2, value: "node2", myChildren: [] },
        { myId: 3, value: "node3", myChildren: [] },
      ]);
    });
  });
});
