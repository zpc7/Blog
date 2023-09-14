# 手写 promise 完整代码

```js:line-numbers
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
    // console.log("promise状态:", this.#state);
    // console.log("promise结果:", this.#result);
    this.#run();
  }

  // then 中的函数处理
  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else if (this.#state === REJECTED) {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }

      try {
        const data = callback(this.#result);
        // callback 返回值是一个异步函数
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  #isPromiseLike(val) {
    return (
      val !== null &&
      (typeof val === 'object' || typeof val === 'function') &&
      typeof val.then === 'function'
    );
  }

  #runMicroTask(func) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func);
    } else if (typeof MutationObserver === 'function') {
      const observer = new MutationObserver(func);
      const textNode = document.createTextNode('origin');
      observer.observe(textNode, {
        characterData: true
      });
      // 触发文本节点的变更
      textNode.data = 'new';
    } else {
      setTimeout(func, 0);
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
