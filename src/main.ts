{
  process.stdin.resume().setEncoding('utf8');
  const lines: string[] = [];
  require('readline')
    .createInterface({ input: process.stdin })
    .on('line', (input: string) => lines.push(input))
    .on('close', main);

  function main() {
    // write code here
  }
}
