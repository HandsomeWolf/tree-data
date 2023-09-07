import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";

let treeData: TreeData;
describe("getParentNodeById", () => {
  const tree = [
    {
      id: 1,
      parentId: null,
      children: [{ id: 2, parentId: 1, children: [{ id: 3, parentId: 2 }] }],
    },
    {
      id: 10,
      parentId: null,
      children: [
        { id: 20, parentId: 10, children: [{ id: 30, parentId: 20 }] },
      ],
    },
  ];

  it("should return the parent node of the specified level", () => {
    treeData = new TreeData(tree);
    const parentNode = treeData
      .getParentNodeById(3, { levelsUp: 1 })
      .getResult();
    expect(parentNode).to.deep.equal([{ id: 2, parentId: 1 }]);
  });

  it("should return the root node if the parent node of the specified level is not found", () => {
    treeData = new TreeData(tree);
    const rootNode = treeData
      .getParentNodeById(3, {
        levelsUp: 5,
        returnRootIfAbsent: true,
      })
      .getResult();
    expect(rootNode).to.deep.equal([{ id: 1, parentId: null }]);
  });

  it("should return null if the parent node of the specified level is not found and returnRootIfAbsent is false", () => {
    treeData = new TreeData(tree);
    const result = treeData
      .getParentNodeById(3, {
        levelsUp: 5,
        returnRootIfAbsent: false,
      })
      .getResult();
    expect(result).to.be.null;
  });

  it("should include children in the returned node if includeChildren is true", () => {
    treeData = new TreeData(tree);
    const parentNodeWithChildren = treeData
      .getParentNodeById(3, {
        levelsUp: 1,
        returnRootIfAbsent: false,
        includeChildren: true,
      })
      .getResult();

    expect(parentNodeWithChildren).to.deep.equal([
      {
        id: 2,
        parentId: 1,
        children: [{ id: 3, parentId: 2 }],
      },
    ]);
  });
});
