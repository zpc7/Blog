# 实现链式调用和延迟执行

```js
function arrange(name) {
  // code here
}

arrange('Jack').execute();
// > Jack is notified

arrange('Jack').do('commit').execute();
// > Jack is notified
// > Start to commit

arrange('Jack').wait(5).do('commit').execute();
// > Jack is notified
// 等待5秒
// > Start to commit

arrange('Jack').waitFirst(5).do('push').execute();
// 等待5秒
// > Jack is notified
// > Start to push
```

::: details 参考答案

> 链式调用和延迟执行@每日进阶 CCC

```js
function arrange(name) {
  // code here
  const taskList = [
    () => {
      console.log(`> ${name} is notified`);
    }
  ];
  function doSomething(action) {
    taskList.push(() => {
      console.log(`> Start to ${action}`);
    });

    return this;
  }

  function waitFirst(second) {
    taskList.unshift(() => {
      console.log(`等待${second}秒`);
      return new Promise((resolve) => setTimeout(resolve, second * 1000));
    });
    return this;
  }
  function wait(second) {
    taskList.push(() => {
      console.log(`等待${second}秒`);
      return new Promise((resolve) => setTimeout(resolve, second * 1000));
    });
    return this;
  }

  async function execute() {
    for (const task of taskList) {
      await task();
    }
  }

  return {
    do: doSomething,
    wait,
    execute,
    waitFirst
  };
}
```

:::
