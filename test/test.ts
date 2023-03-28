import assert from 'assert';
import fs from 'fs';
import main from '../src/main';

describe('test', () => {
  it('case1', (done) => {
    testCase(1, done);
  });

  it('case2', (done) => {
    testCase(2, done);
  });

  it('case3', (done) => {
    testCase(3, done);
  });
});

function testCase(number: number, done: Mocha.Done) {
  const caseFile = fs.readFileSync(`./test/case/case${number}.txt`);
  const caseTxt = caseFile.toString();

  if (caseTxt === '') {
    done();
    return;
  }

  const expected = fs
    .readFileSync(`./test/answer/answer${number}.txt`)
    .toString()
    .replace(/\r/g, '');

  const input = caseTxt.split(' ');
  let output = '';
  console.log = (data: any) => (output += data.toString() + '\n');

  main(input);

  assert.strictEqual(output, expected);
  done();
}
