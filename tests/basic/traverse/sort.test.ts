import { describe, expect, it } from "vitest";
import { TreeData } from "../../../src/index";
import { type KeyValueObject } from "../../../src/interfaces/options";

describe("TreeData", () => {
  describe("sortNodes", () => {
    it("should sort nodes correctly", () => {
      const trees = [
        {
          id: 1,
          children: [{ id: 3, children: [{ id: 9 }, { id: 8 }] }, { id: 2 }],
        },
        {
          id: 4,
          children: [{ id: 6 }, { id: 5 }],
        },
      ];
      const treeData = new TreeData(trees);
      treeData.sortNodes((a, b) => a.id - b.id);

      const result = treeData.getResult();
      expect(result).toEqual([
        {
          id: 1,
          children: [{ id: 2 }, { id: 3, children: [{ id: 8 }, { id: 9 }] }],
        },
        {
          id: 4,
          children: [{ id: 5 }, { id: 6 }],
        },
      ]);
    });
    it("should handle empty trees", () => {
      const trees: KeyValueObject[] = [];
      const treeData = new TreeData(trees);
      treeData.sortNodes((a, b) => a.id - b.id);

      const result = treeData.getResult();
      expect(result).toEqual([]);
    });

    it("should handle trees with single node", () => {
      const trees = [{ id: 1 }];
      const treeData = new TreeData(trees);
      treeData.sortNodes((a, b) => a.id - b.id);

      const result = treeData.getResult();
      expect(result).toEqual([{ id: 1 }]);
    });

    it("should handle trees with multiple levels", () => {
      const trees = [
        {
          id: 2,
          children: [{ id: 1, children: [{ id: 3 }] }],
        },
      ];
      const treeData = new TreeData(trees);
      treeData.sortNodes((a, b) => a.id - b.id);

      const result = treeData.getResult();
      expect(result).toEqual([
        {
          id: 2,
          children: [{ id: 1, children: [{ id: 3 }] }],
        },
      ]);
    });
  });
});
