import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";

let treeData: TreeData;
describe("getNodePathById", () => {
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
                  id: 4,
                  children: [{ id: 5, children: [{ id: 6 }] }],
                },
              ],
            },
            { id: 3 },
          ],
        },
        {
          id: 10,
          children: [
            {
              id: 20,
              children: [
                {
                  id: 40,
                  children: [{ id: 50, children: [{ id: 60 }] }],
                },
              ],
            },
            { id: 30 },
          ],
        },
      ];
      const expected = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                { id: 4, children: [{ id: 5, children: [{ id: 6 }] }] },
              ],
            },
            { id: 3 },
          ],
        },
        {
          id: 2,
          children: [{ id: 4, children: [{ id: 5, children: [{ id: 6 }] }] }],
        },
        { id: 4, children: [{ id: 5, children: [{ id: 6 }] }] },
        { id: 5, children: [{ id: 6 }] },
        { id: 6 },
      ];
      treeData = new TreeData(tree);

      expect(treeData.getNodePathById(6)).toEqual(expected);
    });
    it("should return null if the target node is not found", () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 4,
                  children: [{ id: 5, children: [{ id: 6 }] }],
                },
              ],
            },
            { id: 3 },
          ],
        },
      ];
      treeData = new TreeData(tree);
      expect(treeData.getNodePathById(7)).toBeNull();
    });
  });
  describe("custom", () => {
    it("normal", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                {
                  myId: 4,
                  myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }],
                },
              ],
            },
            { myId: 3 },
          ],
        },
      ];
      const expected = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                {
                  myId: 4,
                  myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }],
                },
              ],
            },
            { myId: 3 },
          ],
        },
        {
          myId: 2,
          myChildren: [
            { myId: 4, myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }] },
          ],
        },
        { myId: 4, myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }] },
        { myId: 5, myChildren: [{ myId: 6 }] },
        { myId: 6 },
      ];
      treeData = new TreeData(tree);
      expect(
        treeData.getNodePathById(6, {
          idKey: "myId",
          childrenKey: "myChildren",
        }),
      ).toEqual(expected);
    });
    it("should return null if the target node is not found", () => {
      const tree = [
        {
          myId: 1,
          myChildren: [
            {
              myId: 2,
              myChildren: [
                {
                  myId: 4,
                  myChildren: [{ myId: 5, myChildren: [{ myId: 6 }] }],
                },
              ],
            },
            { myId: 3 },
          ],
        },
      ];
      treeData = new TreeData(tree);
      expect(treeData.getNodePathById(7)).toBeNull();
    });
  });
});
