# What's this?
paiza の問題をローカルで解くためのテンプレート。
`main.ts` に解答を入力し、ローカルで入力例に対して検証などができる。
`utils` は問題を解くのに便利なコード集。
提出の際は `npm run build` で `build/main.js` をまるまるコピペする。

# コマンド
```
npm run new
```
テンプレートである main.template.ts で main.ts を上書きし、入力例 case1, ..., case3 および、出力例 answer1, ..., answer3 を初期化する。主に問題を新たに解くときに使う

```
npm test
```
case1, ..., case3 を入力として main.ts を実行し、出力が answer1, ..., answer3 と等しいかテストする

```
npm run 1
```
case1.txt を入力として main.ts を実行する

```
npm run 2
```
case2.txt を入力として main.ts を実行する

```
npm run 3
```
case3.txt を入力として main.ts を実行する

