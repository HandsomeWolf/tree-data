import { describe, expect, it } from "vitest";
import { dataToTree } from "../../../src/index";

describe("dataToTree", () => {
  describe("basic", () => {
    it("normal", () => {
      const data = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: 1 },
        { id: 4, parentId: 2 },
      ];
      const expected = {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
          { id: 3, parentId: 1 },
        ],
      };

      expect(dataToTree(data)).toEqual(expected);
    });
    it("deep", () => {
      const data = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: 1 },
        { id: 4, parentId: 2 },
        { id: 5, parentId: 4 },
        { id: 6, parentId: 5 },
        { id: 7, parentId: 6 },
        { id: 8, parentId: 7 },
        { id: 9, parentId: 8 },
        { id: 10, parentId: 9 },
      ];
      const expected = {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              {
                id: 4,
                parentId: 2,
                children: [
                  {
                    id: 5,
                    parentId: 4,
                    children: [
                      {
                        id: 6,
                        parentId: 5,
                        children: [
                          {
                            id: 7,
                            parentId: 6,
                            children: [
                              {
                                id: 8,
                                parentId: 7,
                                children: [
                                  {
                                    id: 9,
                                    parentId: 8,
                                    children: [{ id: 10, parentId: 9 }],
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
            ],
          },
          { id: 3, parentId: 1 },
        ],
      };
      expect(dataToTree(data)).toEqual(expected);
    });
    it("many", () => {
      const data = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: 1 },
        { id: 4, parentId: 2 },
        { id: 10, parentId: null },
        { id: 20, parentId: 10 },
        { id: 30, parentId: 10 },
        { id: 40, parentId: 20 },
        { id: 100, parentId: null },
        { id: 200, parentId: 100 },
        { id: 300, parentId: 100 },
        { id: 400, parentId: 200 },
      ];
      const expected = [
        {
          id: 1,
          parentId: null,
          children: [
            { id: 2, parentId: 1, children: [{ id: 4, parentId: 2 }] },
            { id: 3, parentId: 1 },
          ],
        },
        {
          id: 10,
          parentId: null,
          children: [
            { id: 20, parentId: 10, children: [{ id: 40, parentId: 20 }] },
            { id: 30, parentId: 10 },
          ],
        },
        {
          id: 100,
          parentId: null,
          children: [
            { id: 200, parentId: 100, children: [{ id: 400, parentId: 200 }] },
            { id: 300, parentId: 100 },
          ],
        },
      ];

      expect(dataToTree(data)).toEqual(expected);
    });
  });

  describe("custom Key", () => {
    it("normal", () => {
      const data = [
        { myId: 1, myParentId: null, test: false },
        { myId: 2, myParentId: 1 },
        { myId: 3, myParentId: 1 },
        { myId: 4, myParentId: 2 },
      ];
      const expected = {
        myId: 1,
        test: false,
        myParentId: null,
        customChildren: [
          {
            myId: 2,
            myParentId: 1,
            customChildren: [{ myId: 4, myParentId: 2 }],
          },
          { myId: 3, myParentId: 1 },
        ],
      };
      expect(
        dataToTree(data, {
          idKey: "myId",
          parentIdKey: "myParentId",
          childrenKey: "customChildren",
        }),
      ).toEqual(expected);
    });
    it("deep", () => {
      const data = [
        { myId: 1, myParentId: null },
        { myId: 2, myParentId: 1 },
        { myId: 3, myParentId: 1 },
        { myId: 4, myParentId: 2 },
        { myId: 5, myParentId: 4 },
        { myId: 6, myParentId: 5 },
        { myId: 7, myParentId: 6 },
        { myId: 8, myParentId: 7 },
        { myId: 9, myParentId: 8 },
        { myId: 10, myParentId: 9 },
      ];
      const expected = {
        myId: 1,
        myParentId: null,
        myChildren: [
          {
            myId: 2,
            myParentId: 1,
            myChildren: [
              {
                myId: 4,
                myParentId: 2,
                myChildren: [
                  {
                    myId: 5,
                    myParentId: 4,
                    myChildren: [
                      {
                        myId: 6,
                        myParentId: 5,
                        myChildren: [
                          {
                            myId: 7,
                            myParentId: 6,
                            myChildren: [
                              {
                                myId: 8,
                                myParentId: 7,
                                myChildren: [
                                  {
                                    myId: 9,
                                    myParentId: 8,
                                    myChildren: [{ myId: 10, myParentId: 9 }],
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
            ],
          },
          { myId: 3, myParentId: 1 },
        ],
      };

      expect(
        dataToTree(data, {
          idKey: "myId",
          parentIdKey: "myParentId",
          childrenKey: "myChildren",
        }),
      ).toEqual(expected);
    });
  });

  describe("empty array and one element", () => {
    it("empty array", () => {
      const data = [];
      const expected = undefined;
      expect(dataToTree(data)).toEqual(expected);
    });

    it("array with one element", () => {
      const data = [{ id: 1, parentId: null }];
      const expected = { id: 1, parentId: null };
      expect(dataToTree(data)).toEqual(expected);
    });
  });

  // TODO:异常处理
});
