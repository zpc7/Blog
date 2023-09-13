# 手写 promise-then 的回调执行时机

## 目标

实现示例的 `then` 方法

```js
const p = new MyPromise((res, rej) => {
  // ...
});

p.then(
  (res) => {},
  (err) => {}
);
```

## 代码

初始代码

```js
  then(onFulfilled, onRejected) {
    // .then 返回的也是一个 promise
    return new MyPromise((resolve, reject) => {
      if (this.#state === FULFILLED) {
        onFulfilled(this.#result)
      } else if (this.#state === REJECTED) {
        onRejected(this.#result)
      } else {
        // 还是pending 状态, 这里是异步的情况
        // 由于 then 方法已经执行过了, 等到promise状态变更后, 无法再次执行
        // 需要放到changeState中才能处理
        // eg: p.then((res) => { setTimeout(()=> res('success'), 10000)})
      }
    })
  }
```

改进完整代码, 高亮位置为新增代码

```js:line-numbers {22,47,50-79}
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  /**
   * 创建一个 promise
   * @param {Function} executor 任务执行器, 立即执行 类比 new promise((res, rej)=>{}) 中的 (res, rej)=>{}
   */
  constructor(executor) {
    // 注意只能捕获同步错误
    try {
      executor(this.#resolve, this.#reject);
    } catch (error) {
      // 执行期间报错
      this.#reject(error);
    }
  }

  #state = PENDING; // 状态
  #result = undefined; // 数据
  #handlers = []; // 实例.then 中注册的所有处理方法

  /**
   * 标记当前任务完成 注意 this 绑定, 这里使用箭头函数, 下同
   * @param {any} data 任务完成的相关数据
   */
  #resolve = (data) => {
    this.#changeState(FULFILLED, data);
  };
  /**
   * 标记当前任务失败
   * @param {any} reason 任务失败的相关数据
   */
  #reject = (reason) => {
    this.#changeState(REJECTED, reason);
  };

  // 改变状态和数据
  #changeState(state, result) {
    // 状态如果已经更改, 不再执行
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    console.log('promise状态:', this.#state);
    console.log('promise结果:', this.#result);
    this.#run();
  }

  // then 中的函数处理
  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift();
      if (this.#state === FULFILLED) {
        if (typeof onFulfilled === 'function') {
          onFulfilled(this.#result);
        }
      } else if (this.#state === REJECTED) {
        if (typeof onFulfilled === 'function') {
          onRejected(this.#result);
        }
      }
    }
  }

  then(onFulfilled, onRejected) {
    // .then 返回的也是一个 promise
    return new MyPromise((resolve, reject) => {
      // 暂存状态
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      });
      this.#run();
    });
  }
}
```

## 测试用例

### 单个 then 函数

```js
const p = new MyPromise((res, rej) => {
  setTimeout(() => {
    res('11111111');
  }, 1000);
});

p.then(
  (res) => {
    console.log('@@@promise 完成1:', res);
  },
  (err) => {
    console.log('@@@promise 失败1:', err);
  }
);

// promise状态: fulfilled
// promise结果: 11111111
// @@@promise 完成1: 11111111
```

### 多个 then 函数

```js
const p = new MyPromise((res, rej) => {
  setTimeout(() => {
    res('11111111');
  }, 1000);
});

p.then(
  (res) => {
    console.log('@@@promise 完成1:', res);
  },
  (err) => {
    console.log('@@@promise 失败1:', err);
  }
);
p.then(
  (res) => {
    console.log('@@@promise 完成2:', res);
  },
  (err) => {
    console.log('@@@promise 失败2:', err);
  }
);
p.then(
  (res) => {
    console.log('@@@promise 完成3:', res);
  },
  (err) => {
    console.log('@@@promise 失败3:', err);
  }
);
// promise状态: fulfilled
// promise结果: 11111111
// @@@promise 完成1: 11111111
// @@@promise 完成2: 11111111
// @@@promise 完成3: 11111111
```

### then 的回调不是函数

```js
const p = new MyPromise((res, rej) => {
  setTimeout(() => {
    res('11111111');
  }, 1000);
});
// then 的第一个参数不是函数
p.then(null, (err) => {
  console.log('@@@promise 失败3:', err);
});
p.then(
  (res) => {
    console.log('@@@promise 完成4:', res);
  },
  (err) => {
    console.log('@@@promise 失败4:', err);
  }
);

// promise状态: fulfilled
// promise结果: 11111111
// @@@promise 完成4: 11111111
```
