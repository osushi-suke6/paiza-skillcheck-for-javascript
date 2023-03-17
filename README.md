# What's this?
paiza の問題をローカルで解くためのテンプレート。main.js に解答を入力し、ローカルで入力例に対して検証などができる。
提出の際は main.js をまるまるコピペで OK

#コマンド
```
npm run new
```
テンプレートである main.template.js で main.js を上書きし、入力例 case1~case3 および、出力例 answer1~answer3 を初期化する。主に問題を新たに解くときに使う

```
npm test
```
case1~case3 を入力として main.js を実行し、出力が answer1~answer3 と等しいかテストする

```
npm run 1
```
case1.txt を入力として main.js を実行する

```
npm run 2
```
case2.txt を入力として main.js を実行する

```
npm run 3
```
case3.txt を入力として main.js を実行する

