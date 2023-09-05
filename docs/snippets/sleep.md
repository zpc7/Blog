## Promise 版本 sleep 函数

```js
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 搭配 `async/await` 使用, 更加优雅
await sleep(300);
```
