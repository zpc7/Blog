# 观察器 API
* MutationObserver（变化观察器）
* IntersectionObserver（交叉观察器）
* ResizeObserver（大小观察器）
* PerformanceObserver（性能观察器）
* ReportingObserver（报告观察器）

### 参考资料

* [【第2535期】浏览器的5种Observer](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651252773&idx=1&sn=168ba97ba069bc99d0946bd32d559bfe&chksm=bd4931a18a3eb8b7569912dd35958220e10e44406c6fa5b2bda5e5fac5a7d57c9d9d5769e570&scene=21#wechat_redirect)
* [一起认识下浏览器的 5 种观察器 API](https://mp.weixin.qq.com/s/oEOC8cQEnPtHK1y1Zd2FkQ)

### ChatGPT

MutationObserver 是一个用于监听 DOM 变动的 JavaScript 接口。它提供了一种异步观察 DOM 树的能力，以便在 DOM 发生变化时收到通知并执行相应的操作。

MutationObserver 可以观察 DOM 的以下变动类型：

1. 子节点的添加或删除：当一个元素的子节点被添加或移除时，MutationObserver 可以捕捉到这些变动。

2. 属性的修改：当元素的属性值被修改时，MutationObserver 可以检测到这些变化。

3. 元素的属性添加或删除：当元素的属性被添加或删除时，MutationObserver 可以观察到这些变化。

4. 文本节点的修改：当文本节点的内容被修改时，MutationObserver 可以感知到这些变动。

MutationObserver 可以用于许多场景，例如：

* 动态加载内容：当动态添加或移除元素时，可以使用 MutationObserver 来自动更新相关部分。

* 表单验证：当表单元素的值发生变化时，可以使用 MutationObserver 来实时验证表单。

* 监听广告屏蔽器：当广告屏蔽器移除或隐藏广告时，可以使用 MutationObserver 来监测变化并采取相应措施。

类似于 MutationObserver 的 DOM 变动观察接口还有：

1. Mutation Events（已弃用）：是 MutationObserver 的旧版实现，但已被弃用，因为它对性能有较大的影响。

2. ResizeObserver：用于观察元素的大小变化，当元素的尺寸发生改变时，可以收到通知。

3. IntersectionObserver：用于观察元素与视窗的交叉状态，当元素进入或离开视窗时，可以进行相应的处理。

这些观察者接口提供了不同的能力，可根据具体的使用情况选择合适的接口来监听 DOM 的变动。然而，MutationObserver 是最常用和最灵活的接口，适用于大多数 DOM 变动的观察需求。
