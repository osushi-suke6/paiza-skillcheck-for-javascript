process.stdin.resume().setEncoding("utf8");
const lines = [];
require("readline")
  .createInterface({ input: process.stdin })
  .on("line", (input) => lines.push(input))
  .on("close", main);

function main() {
  lines.forEach((l) => {
    console.log(l);
  });
}