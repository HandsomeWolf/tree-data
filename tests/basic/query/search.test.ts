import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";
let treeData: TreeData;
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
      id: 10,
      name: "one",
      children: [
        {
          id: 20,
          name: "two",
          children: [
            {
              id: 30,
              name: "three",
            },
          ],
        },
        {
          id: 40,
          name: "four",
        },
      ],
    },
  ];

  describe("basic", () => {
    it("findAll -> false ; includeChildren -> true ", () => {
      treeData = new TreeData(tree);
      const node = treeData
        .getNodes({ id: 20 }, { findAll: false, includeChildren: true })
        .getResult();
      expect(node).toEqual([
        {
          id: 20,
          name: "two",
          children: [
            {
              id: 30,
              name: "three",
            },
          ],
        },
      ]);
    });

    it("findAll -> false ; includeChildren -> false", () => {
      treeData = new TreeData(tree);
      const node = treeData.getNodes({ id: 20 }).getResult();
      expect(node).toEqual([
        {
          id: 20,
          name: "two",
        },
      ]);
    });

    it("findAll -> true ; includeChildren -> true", () => {
      treeData = new TreeData(tree);
      const nodes = treeData
        .getNodes({ id: 20 }, { findAll: true, includeChildren: true })
        .getResult();
      expect(nodes).toEqual([
        {
          id: 20,
          name: "two",
          children: [
            {
              id: 30,
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
      treeData = new TreeData(tree, {
        childrenKey: "myChildren",
      });
      const nodes = treeData
        .getNodes({ id: 2 }, { findAll: true, includeChildren: true })
        .getResult();
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
    treeData = new TreeData(tree, {
      childrenKey: "myChildren",
    });
    const node = treeData.getNodes({ id: 100 }, { findAll: false }).getResult();
    expect(node).toBeNull();
  });
});
