# 函数柯里化和偏函数

## 柯里化

柯里化（Currying）是一种将接受`多个参数`的函数转化成`一系列`接受`一个参数`的函数的技术。具体来说，一个接受多个参数的函数被柯里化后，它会返回一个新的函数，这个新函数接受第一个参数，并返回一个接受剩余参数的新函数。这个过程可以一直持续，直到接受到所有参数，最终返回结果。

```js
// 普通的多参数函数
function add(a, b, c) {
  return a + b + c;
}

// 硬编码一个柯里化函数
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
const curriedResult = curriedAdd(1)(2)(3); // 输出：6
```

### 柯里化实现

```js
// 柯里化函数
function curry(func) {
  return function curried(...args) {
    // 如果传入的参数个数大于等于原函数的参数个数，则直接调用原函数
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    // 如果传入的参数个数不足，则返回一个新的函数，等待剩余参数的传入
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// 示例原函数
function multiply(x, y, z) {
  return x * y * z;
}

// 使用柯里化包装原函数
const curriedMultiply = curry(multiply);

// 调用柯里化函数
const partialMultiply = curriedMultiply(2)(3);
const result = partialMultiply(4);

console.log(result); // 输出：24（2 * 3 * 4）

// 这个例子也实现了不是单个参数的功能，可以传入多个参数
console.log(curriedMultiply(5, 6 ,7)) // 输出：210（5 * 6 * 7）
```

## 偏函数

偏函数是指通过固定一个或多个函数的参数，从而产生一个新的函数。这个新函数具有较少参数，通常是原始函数的子集。偏函数的主要作用是创建一个在特定情况下更具体、更专注的函数，而不必在每次使用时都传递所有的参数。

### bind 实现偏函数

```js
function multiply(x, y, z) {
    return x * y * z;
}

// 使用 bind 创建一个偏函数，固定了 x为 2, y 为 3 
const partialMultiply = multiply.bind(null, 2, 3);

// 调用偏函数，传递剩余的参数 z
const result = partialMultiply(4);
console.log(result); // 输出：24（2 * 3 * 4）
```

### 闭包 实现偏函数

```js
// 偏函数的实现
function partial(fn, ...args) {
    return function(...newArgs) {
        return fn.apply(this, args.concat(newArgs));
    };
}

// 原始函数，接受三个参数
function multiply(x, y, z) {
    return x * y * z;
}

// 创建一个偏函数，固定第一个参数为4，第二个参数为5
const partialMultiply = partial(multiply, 4, 5);

// 调用偏函数，只需传递最后一个参数
const result = partialMultiply(6);
console.log(result);  // 输出：120（4 * 5 * 6）
```
