# 手写 promise resolve/reject/catch/finally

## promise.catch

```js
catch(onRejected) {
  return this.then(undefined, onRejected);
}
```

### 测试用例

```js
new MyPromise((resolve, reject) => {
  reject(123);
}).catch((err) => {
  console.log(err);
});
// 123
```

## promise.finally

```js
finally(onFinally) {
  return this.then(
    (data) => {
      onFinally();
      return data;
    },
    (err) => {
      onFinally();
      throw err;
    }
  );
}
```

### 测试用例

```js
new MyPromise((resolve, reject) => {
  reject(123);
})
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log('finally');
  });
// 123
// finally
```

## static resolve 静态方法

```js
static resolve(value) {
  if (value instanceof MyPromise) return value;
  let _resolve, _reject; // 静态方法中不能使用 this, 于是手动创建一个 promise
  const instance = new MyPromise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
  if (instance.#isPromiseLike(value)) {
    value.then(_resolve, _reject);
  } else {
    _resolve(value);
  }
  return instance;
}
```

这里有 3 种情况, 可以参考下文 MDN 的链接

- 如果 value 是 MyPromise 的实例, 直接返回
- 如果 value 是 promiseLike, 调用 .then 方法
- 基础值, 直接 resolve

### 测试用例

```js
const p1 = new MyPromise((resolve, reject) => {
  resolve(1111);
});

console.log(MyPromise.resolve(p1) === p1);

MyPromise.resolve(222).then((res) => console.log(res));
// true
// 222
```

## static reject 静态方法

```js
static reject(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
}
```

不同于 `resolve` 的 3 种情况, reject 都放在 promise 中返回, 参考下文 MDN 链接

## 参考链接

- [MDN promise.catch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
- [MDN promise.finally](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)
- [MDN promise.resolve](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
- [MDN promise.reject](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
