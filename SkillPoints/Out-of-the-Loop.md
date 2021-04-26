### JS 跳出循环

#### `for` 跳出单次循环 + 跳出整个循环

```js
const arr = [1, 2, 3, 4, 5, 6, 7];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 3) {
    continue;
  }
  console.log("@for-continue:", arr[i]);
}

// output 跳过单个循环
// @for-continue: 1
// @for-continue: 2
// @for-continue: 4
// @for-continue: 5
// @for-continue: 6
// @for-continue: 7

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 3) {
    break;
  }
  console.log("@for-break:", arr[i]);
}

// output 跳过整个循环
// @for-break: 1
// @for-break: 2
```

#### `forEach` 循环

使用数组原生的 `forEach` 循环, 无法正常跳出整个循环

```js
const arr = [1, 2, 3, 4, 5, 6];
arr.forEach((item) => {
  if (item === 4) {
    return;
    // return true;
    // return false;
  }
  console.log("#arr-forEach:", item);
});
// 使用 return; / return true; / return false;
// 均无法跳出整个循环, 只能跳过单次循环
// 注意:无法使用 breack / continue (语法错误)
// #arr-forEach: 1
// #arr-forEach: 2
// #arr-forEach: 3
// #arr-forEach: 5
// #arr-forEach: 6
```

如果想要在原生的 `forEach` 中跳出整个循环, 可以使用 `throw` + `try catch`

```js
try {
  const arr = [1, 2, 3, 4, 5, 6];
  arr.forEach((item) => {
    if (item === 4) {
      throw "out of loop";
      // return true;
      // return false;
    }
    console.log("#arr-forEach:", item);
  });
} catch (e) {
  console.log(e);
}
// #arr-forEach: 1
// #arr-forEach: 2
// #arr-forEach: 3
// out of loop
```

#### `_.forEach` 循环

使用 `lodash`的 `forEach`方法 (或 `jq` 的 `Each`)

```js
// 使用 return true; 或 return; 可以只跳出当前循环

let arr = [1, 2, 3, 4, 5, 6];
_.forEach(arr, (item) => {
  if (item === 4) {
    return;
    // return true;
  }
  console.log("lodash-forEach:", item);
});
// lodash-forEach: 1
// lodash-forEach: 2
// lodash-forEach: 3
// lodash-forEach: 5
// lodash-forEach: 6

// 使用 return false; 可以跳出整个循环
let arr = [1, 2, 3, 4, 5, 6];
_.forEach(arr, (item) => {
  if (item === 4) {
    return false;
  }
  console.log("lodash-forEach:", item);
});
// lodash-forEach: 1
// lodash-forEach: 2
// lodash-forEach: 3
```
