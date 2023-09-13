# 什么是 promise

谈到 `promise`, 他就有两层意思

- [Promise A+ 规范](https://promisesaplus.com/)里面的概念
- ES6 的 `promise`

## Promise A+ 规范

他是一个社区规范, 他出现的时间早于 `ES6` 的 `promise`, 他是为了解决回调地狱以及`异步实现不统一`的问题.

简而言之, `promise` 就是一个带有 `then` 方法的函数/对象, 下面的例子就被认为是一个 `promise`, 当然 `then` 还需要满足 `A+` 规范中的诸多细节. 此外, 满足规范的 `promise` 具有互操作性.

```javascript
{
  then(){}
}

function bar(){}
bar.then = function(){}
```

## ES6 构造函数 `promise`

其就是对 `promise A+` 规范的一种实现, 准确来说, 通过构造函数 `promise` 创建的对象是 `promise`, 因为他具有满足规范的 `then` 方法.

ES6 中的 `promise.catch` `promise.finally` `promise.all` 其实不属于规范的内容.

## 回答示例
在 `A+` 规范中 `promise` 就是一个带 `then` 方法的函数或对象;  
在 `ES6` 中, 他是一个构造函数, 通过这个构造函数创建的实例, 满足了 `promise A+` 规范.  
满足规范的 `promise` 他们之间是可以互操作的, 同时也可使用 `async` 和 `await`.