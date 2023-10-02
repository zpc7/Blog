# requestIdleCallback / requestAnimationFrame

## requestAnimationFrame

* [2022年了, 真的懂requestAnimationFrame么？](https://juejin.cn/post/7062178363800027173)

## requestIdleCallback

* [2022年了, 还不懂requestIdleCallback么？](https://www.developers.pub/article/1028858) 🌟 
   >  

![Image](https://user-images.githubusercontent.com/15316908/263005611-0475051c-375c-4fe8-98ba-5234e9921dc5.png)

### GPT 回答

`requestIdleCallback` 是一个浏览器提供的用于在主线程空闲时执行任务的 JavaScript API。它与 `requestAnimationFrame` 类似，但是它的主要目的是在浏览器空闲时执行任务，以便不干扰用户体验和页面的主要渲染工作。

`requestIdleCallback` 的主要作用是分散长时间任务的执行，使它们不会阻塞页面的交互和渲染，从而提高页面的响应性和性能。

这个 API 接收一个回调函数作为参数，该回调函数将在浏览器空闲时调用。浏览器会在执行主要渲染工作后，如果还有空闲时间，就会调用这个回调函数。

下面是一个简单的示例代码，演示了如何使用 `requestIdleCallback` 来执行一些耗时的任务：

```javascript
function performTask(deadline) {
    while (deadline.timeRemaining() > 0) {
        // 执行一些任务，直到没有剩余时间
    }

    if (!finished) {
        // 如果任务没有完成，继续请求下一个空闲周期
        requestIdleCallback(performTask);
    }
}

// 初始化，请求第一个空闲周期
requestIdleCallback(performTask);
```

在上述代码中， `performTask` 函数会在空闲时执行一些任务，然后通过检查 `deadline.timeRemaining()` 来判断是否还有剩余时间。如果任务没有在当前空闲周期完成，它会继续请求下一个空闲周期，直到任务完成为止。

`requestIdleCallback` 的应用场景包括：

1. **性能优化**：可以将一些耗时的任务（如数据处理、分析等）放在 `requestIdleCallback` 中执行，以避免阻塞主线程的其他任务。

2. **延迟加载和预取**：在页面空闲时，可以使用 `requestIdleCallback` 来延迟加载图片、资源或数据，以优化初始加载性能。

3. **数据同步**：如果需要在后台进行数据同步或数据更新，可以使用 `requestIdleCallback` 来分批执行数据处理任务，以避免对用户体验的影响。

需要注意的是， `requestIdleCallback` 并不是实时性的，它依赖于浏览器的空闲时间，因此不适合需要精确时间控制的任务。在一些不支持 `requestIdleCallback` 的环境中，你可能需要使用 polyfill 或考虑其他的异步任务调度方法。
