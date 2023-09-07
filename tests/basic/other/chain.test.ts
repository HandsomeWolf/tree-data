import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";

describe("TreeData", () => {
  it("should support chain calls", () => {
    const trees = [
      {
        id: 1,
        children: [{ id: 3 }, { id: 2 }],
      },
      {
        id: 4,
        children: [{ id: 6 }, { id: 5 }],
      },
    ];

    const treeData = new TreeData(trees);

    treeData
      .filterTree({ exclude: { id: [3] } })
      .sortNodes((a, b) => a.id - b.id);

    const result = treeData.getResult();

    expect(result).toEqual([
      {
        id: 1,
        children: [{ id: 2 }],
      },
      {
        id: 4,
        children: [{ id: 5 }, { id: 6 }],
      },
    ]);
  });
});
