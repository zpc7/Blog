# 函数防抖和节流

- [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
- [JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26#issue-236763046)

## 防抖

防抖 (Debouncing) 的含义是指在一定时间内，多次触发同一个事件，只执行`最后一次`操作。

例如，当我们在搜索框中输入关键词时，输入框会不断触发 oninput 事件，如果每次输入都去请求服务器获取数据，会造成不必要的请求浪费。此时就可以使用防抖技术，将一定时间内的多次触发合并为一次操作，只请求一次服务器数据，减少了请求次数和服务器负载。

```js
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

## 节流

节流 (Throttling) 的含义是指在一定时间内，多次触发同一个事件，只执行一次操作。

例如，当我们拖动网页上的滚动条时，会不断触发 onscroll 事件，如果每次触发都去计算滚动距离，会造成浏览器性能下降。此时就可以使用节流技术，将一定时间内的多次触发限制为一次操作，只计算一次滚动距离，提高了浏览器性能和用户体验。

```js
function throttle(func, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
```
