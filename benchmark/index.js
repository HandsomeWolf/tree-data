/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-module */
const Benchmark = require("benchmark");
const { getNodePathById } = require("../dist/index");

const suite = new Benchmark.Suite();

// 添加测试
suite
  .add("getNodePathById", function () {
    const tree = [
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

    getNodePathById(tree, 5);
  })
  // .add("deleteNodes", function () {
  //   // 你的测试代码
  // })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  // 运行测试
  .run({ async: true });
