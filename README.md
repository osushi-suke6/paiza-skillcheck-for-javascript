# What's this?
This is a template for solving Paiza exercises locally with TypeScript. Input your solutions in main.ts and test them against sample inputs on your local machine.

The utils directory contains useful code snippets or classes for solving exercises, which you can import. Webpack transpiles and bundles main.ts into main.js for submission.

To submit your solution, run npm run build and copy and paste the resulting build/main.js.

# How to use
Write your code in `main.ts` and generate a JavaScript file `main.js` for submission. You can use the following commands to initialize `main.ts`, test your code against sample inputs, or build:
## Commands
```
npm run new
```
Overwrites `main.ts` with the template file main.template.ts and initializes sample inputs (case1.txt, ..., case3.txt) and expected outputs (answer1.txt, ..., answer3.txt). Use this command mainly when starting to solve a new excersise.
```
npm run 1
```
Runs main.ts with case1.txt as input.

```
npm run 2
```
Runs main.ts with case2.txt as input.

```
npm run 3
```
Runs main.ts with case3.txt as input.

```
npm test
```
Runs main.ts with sample inputs (case1.txt, ..., case3.txt) and checks if the output matches the expected outputs (answer1.txt, ..., answer3.txt).
