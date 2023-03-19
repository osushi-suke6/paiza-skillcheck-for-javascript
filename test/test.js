const assert = require("assert");
const cp = require("child_process");
const fs = require("fs");

describe("test", () => {
  it("case1", (done) => {
    testCase(1, done);
  });

  it("case2", (done) => {
    testCase(2, done);
  });

  it("case3", (done) => {
    testCase(3, done);
  });
});

function testCase(number, done) {
  const input = fs.readFileSync(`case${number}.txt`);

  if (input.toString() === "") {
    done();
    return;
  }

  const expected = fs
    .readFileSync(`answer${number}.txt`)
    .toString()
    .replace(/\r/g, "");

  const main = cp.spawn("node", ["main.js"]);

  main.stdin.write(input);

  let output = "";
  main.stdout.on("data", (data) => {
    output += data.toString();
  });

  main.on("close", () => {
    assert.strictEqual(output, expected);
    done();
  });

  main.stdin.end();
}
