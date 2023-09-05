/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-module */
const Benchmark = require("benchmark");
const { treeToData } = require("../dist/index");

const testTreeToData = require("./module/convert/to-data");

const suite = new Benchmark.Suite();

// 添加测试
suite
  .add("treeToData - default method", function () {
    treeToData(testTreeToData);
  })
  .add("treeToData - DFS method", function () {
    treeToData(testTreeToData, { method: "DFS" });
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  // 运行测试
  .run({ async: true });
