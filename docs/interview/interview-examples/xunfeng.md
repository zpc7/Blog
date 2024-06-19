# 巽风科技

## 一面-视频面试

1. 怎么设计类型检查函数，包括签名
2. tailwind和cssinjs的区别
3. 类型系统对业务开发来说的好处
4. 算法题目: 树的有效长度路径
    ::: details 参考答案
    [leetcode 113. 路径总和 II](https://leetcode.cn/problems/path-sum-ii/description/)
    :::
---
1. React 中 useEffect 回调函数的返回值, 会随着useEffect的依赖项变化而变化吗?
2. React 中 useEffect 回调函数中, 使用setState() 1次或多次会发生什么? 如果将这1次或者多次setState() 放在setTimeout中会发生什么?
    ::: details 参考答案
    在 React 中，`useEffect` 回调函数中使用 `setState` 会触发重新渲染。具体的行为取决于 `setState` 调用的次数以及是否使用了 `setTimeout`。以下是详细的解释：

    1. 在 `useEffect` 中直接调用 `setState` 一次

    当 `useEffect` 中的 `setState` 被调用一次时，会触发组件重新渲染。重新渲染时，React 会执行组件函数，并重新计算组件的状态和虚拟 DOM。

    ```js
    import React, { useState, useEffect } from 'react';

    function MyComponent() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        setCount(1);
      }, []);

      return <div>{count}</div>;
    }
    ```

    在这个例子中，`setCount(1)` 会触发组件重新渲染，`count` 的值会更新为 `1` 并显示在页面上。

    2. 在 `useEffect` 中调用 `setState` 多次

    当 `useEffect` 中调用 `setState` 多次时，React 会批量处理这些状态更新，并且在同一事件循环中只会触发一次重新渲染。

    ```js
    import React, { useState, useEffect } from 'react';

    function MyComponent() {
      const [count, setCount] = useState(0);
      const [value, setValue] = useState(0);

      useEffect(() => {
        setCount(1);
        setValue(1);
      }, []);

      return (
        <div>
          <div>Count: {count}</div>
          <div>Value: {value}</div>
        </div>
      );
    }
    ```

    在这个例子中，尽管 `setCount(1)` 和 `setValue(1)` 被调用了两次，但 React 会批量处理这两个状态更新，并在同一事件循环中只重新渲染一次组件。

    3. 在 `setTimeout` 中调用 `setState` 一次或多次

    如果将 `setState` 调用放在 `setTimeout` 中，这些状态更新会在定时器到期时执行，并且每次状态更新都会触发一次重新渲染。

    - 调用一次 `setState`：

    ```js
    import React, { useState, useEffect } from 'react';

    function MyComponent() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        setTimeout(() => {
          setCount(1);
        }, 1000);
      }, []);

      return <div>{count}</div>;
    }
    ```

    在这个例子中，`setCount(1)` 会在 1 秒后执行，并触发组件重新渲染，`count` 的值会更新为 `1` 并显示在页面上。

    - 调用多次 `setState`：

    ```js
    import React, { useState, useEffect } from 'react';

    function MyComponent() {
      const [count, setCount] = useState(0);
      const [value, setValue] = useState(0);

      useEffect(() => {
        setTimeout(() => {
          setCount(1);
          setValue(1);
        }, 1000);
      }, []);

      return (
        <div>
          <div>Count: {count}</div>
          <div>Value: {value}</div>
        </div>
      );
    }
    ```

    在这个例子中，`setCount(1)` 和 `setValue(1)` 会在 1 秒后执行，React 会批量处理这两个状态更新，并在同一事件循环中只重新渲染一次组件。

    总结

    * 直接在 `useEffect` 中调用 `setState`（一次或多次）会触发一次重新渲染，React 会批量处理多次状态更新。
    * 在 `setTimeout` 中调用 `setState` 会在定时器到期时执行状态更新，并触发重新渲染。即使在 `setTimeout` 中多次调用 `setState`，React 也会批量处理这些状态更新并触发一次重新渲染。

    React 的批处理机制使得多次状态更新在同一个事件循环中只会触发一次重新渲染，优化了性能。
    :::
3. React 18 的并发模式怎么开启?
4. 代码设计题:

    设计并实现一个命令链式调用器，该调用器只有在执行 execute() 方法时才会依次执行一系列命令，其他方法均不执行。

    要求：
    实现一个 Command 类，具有以下功能：
    实现 say(message) 方法，输出目标对象的消息。
    实现 delay(seconds) 方法，延迟指定秒数后执行上一个命令。
    实现 execute() 方法，依次执行添加的命令

    示例:
   ```js
    // say delay 可以任意组合并链式下去

    const cmd = new Command("Jax");
    cmd.say("hi").say("Julie").delay(5).say("let go").execute();
    // Jax hi 延迟5秒 Julie let go

    cmd.say("hi").delay(5).say("let go")
    // 没有任何输出信息
    ```

    ::: details 参考答案
    个人文章:[实现链式调用和延迟执行](/interview/handwriting/chain-call-and-delay-execution)
    :::

## 二面-视频面试

1. React Fiber 架构
2. websocket 怎么断线重连?
3. webpack loader和plugin的区别? style-loader 的用处?
4. 沙箱的实现?
5. 小程序怎么避免体积过大?
6. 移动端 0.5px 的实现?