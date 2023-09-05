## JS 跳出循环

### `for` 跳出单次循环 + 跳出整个循环

```js
const arr = [1, 2, 3, 4, 5, 6, 7];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 3) {
    continue;
  }
  console.log("@for-continue:", arr[i]);
}

// 跳过单个循环
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

### `Array.forEach` 循环

使用数组原生的 `forEach` 循环, 无法正常跳出整个循环, 只能跳过单次循环

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
// 使用 return; 或 return true; 或 return false;
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

### 使用 `Array.some` 来跳出循环
>MDN:some() 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some() 将会立即返回 true。否则，some() 返回 false。

我们可以利用这个机制, 来达到提前跳出整个循环/单次循环的目的.
```js
// 跳出整个循环
arr.some(item => {
  if (item === 3) {
    return true;
  }
  console.log("@Array-some:", item)
})
// @Array-some: 1
// @Array-some: 2

// 跳出单次循环
arr.some(item => {
  if (item === 3) {
    return false;
  }
  console.log("@Array-some:", item)
})
// @Array-some: 1
// @Array-some: 2
// @Array-some: 4
// @Array-some: 5
// @Array-some: 6
```


### `_.forEach` 循环

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
