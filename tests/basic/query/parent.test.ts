import { describe, expect, it } from "vitest";
import { getParentNodeById } from "../../../src/index";

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
    const parentNode = getParentNodeById(tree, 3, { levelsUp: 1 });
    expect(parentNode).to.deep.equal({ id: 2, parentId: 1 });
  });

  it("should return the root node if the parent node of the specified level is not found", () => {
    const rootNode = getParentNodeById(tree, 3, {
      levelsUp: 5,
      returnRootIfAbsent: true,
    });
    expect(rootNode).to.deep.equal({ id: 1, parentId: null });
  });

  it("should return null if the parent node of the specified level is not found and returnRootIfAbsent is false", () => {
    const result = getParentNodeById(tree, 3, {
      levelsUp: 5,
      returnRootIfAbsent: false,
    });
    expect(result).to.be.null;
  });

  it("should include children in the returned node if includeChildren is true", () => {
    const parentNodeWithChildren = getParentNodeById(tree, 3, {
      levelsUp: 1,
      returnRootIfAbsent: false,
      includeChildren: true,
    });
    console.log(parentNodeWithChildren);

    expect(parentNodeWithChildren).to.deep.equal({
      id: 2,
      parentId: 1,
      children: [{ id: 3, parentId: 2 }],
    });
  });
});
