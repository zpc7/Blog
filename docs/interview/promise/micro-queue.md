# 手写 promise 微队列和 promise like

## isPromiseLike

满足 A+ 规范即可互相操作, 不能使用 `instanceof promise`

```js
#isPromiseLike(val) {
  return (
    val !== null &&
    (typeof val === "object" || typeof val === "function") &&
    typeof val.then === "function"
  );
}
```

自己实现的 `MyPromise`可以与官方的 `promise` 互相操作

```js
const p = new MyPromise((res, rej) => {
  setTimeout(() => {
    res('1秒后完成!');
  }, 1000);
});

p.then((data) => {
  console.log('ok1:', data);
  // es6 的 promise
  return new Promise((res) => {
    setTimeout(() => {
      res(data + '-官方的 promise');
    }, 1000);
  });
}).then((res) => {
  console.log('@@@res:', res);
});
// ok1: 1秒后完成!
// @@@res: 1秒后完成!-官方的 promise
```

## 微队列

参考 `vue` 的做法, 判断当前所处的环境

如果是浏览器, 使用 `MutationObserver`

如果是 `node` 使用 `process.nextTick`

否则使用 `setTimeout` 兜底

```js
#runMicroTask(func) {
  if (typeof process === "object" && typeof process.nextTick === "function") {
    process.nextTick(func);
  } else if (typeof MutationObserver === "function") {
    const observer = new MutationObserver(func);
    const textNode = document.createTextNode("origin");
    observer.observe(textNode, {
      characterData: true,
    });
    // 触发文本节点的变更
    textNode.data = "new";
  } else {
    setTimeout(func, 0);
  }
}
```

## 测试用例

```js
setTimeout(() => {
  console.log(1);
}, 0);

new MyPromise((resolve) => {
  resolve(2);
}).then((data) => {
  console.log(data);
});
// 3
// 2
// 1
```
