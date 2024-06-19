# React Fiber

* [React 15 和 16 架构差异](https://mp.weixin.qq.com/s/0-1WE_O6BXwyi3nBnI4Brw)
* [MessageChannel](https://juejin.cn/post/7029715697173266469)
* [React Fiber 原理解析](https://juejin.cn/post/6844904202267787277)
* [图解 React 原理](https://7km.top/)
* [🌟【第3262期】React的Fiber架构原理](https://mp.weixin.qq.com/s/70cRoSek1n2b90KDB81XeQ)
* [时间切片](https://mp.weixin.qq.com/s/EAqwAY2Xv1GO2Oxr1dx1Yw)
  > 不同于react自己实现的时间切片, 这是一个浏览器的实验性功能

* [面试官：说说对Fiber架构的理解？解决了什么问题？](https://vue3js.cn/interview/React/Fiber.html#%E4%B8%80%E3%80%81%E9%97%AE%E9%A2%98)
* [面试官: 你是怎样理解Fiber的](https://cloud.tencent.com/developer/article/1916657)

## 什么是虚拟DOM？其优点有哪些？
> @渡一

虚拟 DOM 最初是由 React 团队所提出的概念，这是一种编程的思想，指的是针对真实 UI DOM 的一种描述能力。

在 React 中，使用了 JS 对象来描述真实的 DOM 结构。虚拟DOM和 JS 对象之间的关系：前者是一种思想，后者是这种思想的具体实现。

优点：
1. 相较于 DOM 的体积和速度优势

JS 层面的计算的速度，要比 DOM 层面的计算快得多
DOM 对象最终要被浏览器显示出来之前，浏览器会有很多工作要做（浏览器渲染原理）
DOM 上面的属性也是非常多的
虚拟 DOM 发挥优势的时机主要体现在更新的时候，相比较 innerHTML 要将已有的 DOM 节点全部销毁，虚拟 DOM 能够做到针对 DOM 节点做最小程度的修改

2. 多平台渲染的抽象能力

浏览器、Node.js 宿主环境使用 ReactDOM 包
Native 宿主环境使用 ReactNative 包
Canvas、SVG 或者 VML（IE8）宿主环境使用 ReactArt 包
ReactTest 包用于渲染出 JS 对象，可以很方便地测试“不隶属于任何宿主环境的通用功能”

在 React 中，通过 JSX 来描述 UI，JSX 仅仅是一个语法糖，会被 Babel 编译为 createElement 方法的调用。该方法调用之后会返回一个 JS 对象，该对象就是虚拟 DOM 对象，官方更倾向于称之为一个 React 元素。


## 如何理解 React 的虚拟 dom
> @gpt

React 的虚拟 DOM 是一种提升页面渲染性能的技术，通过在内存中维护一个轻量级的页面结构副本，优化实际 DOM 操作。

1. **减少 DOM 操作成本**：直接操作实际 DOM 会触发浏览器的重新渲染和重排，消耗大量资源。虚拟 DOM 通过减少直接 DOM 操作，降低性能开销。
2. **虚拟 DOM 结构**：以 JavaScript 对象形式表示的页面结构，每个元素包含标签名、属性和子元素。
3. **构建虚拟 DOM**：编写 JSX 代码时，构建的是虚拟 DOM，React 用它来描述页面结构。
4. **比较和更新**：组件状态或属性变化时，React 生成新的虚拟 DOM，通过“协调算法”比较新旧虚拟 DOM 差异。
5. **最小化 DOM 操作**：找到需要更新的部分，应用到实际 DOM，减少操作次数。
6. **批量更新**：合并多个状态变化，避免多次不必要的实际 DOM 操作。

总之，React 的虚拟 DOM 通过优化实际 DOM 操作，提升了页面渲染效率，改善了用户体验。

## Fiber / 虚拟 DOM /DIFF算法之间的关系?
虚拟 DOM 是一个轻量级的 JavaScript 对象。当组件状态变化时，React 会先在虚拟 DOM 上进行操作，而不是直接操作真实的 DOM，因为真实 DOM 操作相对来说更慢。

Diff 算法用来比较两棵虚拟 DOM 树的差异，从而确定真实 DOM 需要进行的最小更新。

Fiber 是 React 16 中才引入的新的协调引擎。主要目的是为了能够处理动画、布局、手势等有优先级的更新。Fiber 架构将渲染工作分割成小的单元。每个单元完成后，React 会检查是否有更高优先级的工作需要进行，如果有，它会中断当前工作并开始处理高优先级工作。

汇总起来，虚拟DOM的优点如下：性能提升：通过减少对真实 DOM 的操作次数，提高应用性能。跨平台能力：虚拟 DOM 使得 React 能够跨平台工作，如 React Native。

缺点是会多用一些内存，而且如果只渲染一次的话，跟直接操作真实DOM相比引入了额外消耗


可以理解为, 虚拟DOM是一种概念/一种模式, Fiber是他的一种实现.
