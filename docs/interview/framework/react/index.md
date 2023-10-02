# React 及相关 API
* [自创: React.memo](https://github.com/zpc7/Blog/blob/master/SkillPoints/React-PureComponent+memo.md)
* [自创: useMemo + useCallback](https://github.com/zpc7/Blog/blob/master/SkillPoints/React-useCallback+useMemo.md)
* [JavaScript 和 React 中的记忆化](https://mp.weixin.qq.com/s/vo4u2NGLRSZTpI5e0InjVg)
* [「React 深入」一文吃透React v18全部Api（1.3w+）](https://juejin.cn/post/7124486630483689485#heading-79)
* [图解 history api 和 React Router 实现原理](https://mp.weixin.qq.com/s/cQCvbFz_pdpGdXIT_KlXjA)

## 一个完整的React项目需要具备哪些东西

一个完整的 React 项目需要包括多个组成部分，以确保项目的组织、开发、构建和部署都能顺利进行。以下是一个典型的完整 React 项目可能需要的组成部分：

01. **项目结构和文件**：
   - `src` 文件夹：包含项目的源代码。
   - `public` 文件夹：包含公共资源，如 HTML 模板和静态文件。
   - `package.json` ：项目的配置文件，包含依赖项、脚本等信息。

02. **React 组件**：
   - 编写 React 组件来构建应用程序的各个部分。可以使用函数组件和类组件。
   - 组件可以按功能和模块进行组织，以提高代码的可维护性和可重用性。

03. **路由管理**：
   - 使用 React Router 或其他路由库来管理应用程序的导航和页面路由。
   - 配置路由，定义路由路径和相应的组件。

04. **状态管理**：
   - 使用状态管理库（如 Redux、Mobx、Context API）来管理应用程序的全局状态。
   - 根据应用程序的规模和复杂性，选择适合的状态管理方案。

05. **API 调用**：
   - 使用网络请求库（如 Axios、Fetch）来与后端 API 进行通信。
   - 处理数据的获取和提交，以及**错误处理**。

06. **样式和样式管理**：
   - 使用 CSS、Sass、Less 或其他样式预处理器来编写样式。
   - 可以使用 CSS 模块、CSS-in-JS 库（如 styled-components）来管理组件样式。

07. **测试**：
   - 编写单元测试和集成测试，确保代码的质量和稳定性。
   - 使用测试库（如 Jest、React Testing Library）进行测试。

08. **构建工具**：
   - 使用 Webpack、Parcel 或其他构建工具来打包、压缩和优化代码。
   - 配置构建流程，处理样式、图片、字体等资源。

09. **开发工具和调试**：
   - 使用开发者工具，如 Chrome DevTools，帮助调试和优化代码。
   - 使用 ESLint、Prettier 等工具来规范代码风格和质量。

10. **部署**：
    - 部署项目到服务器、云平台或静态文件托管服务。
    - 配置环境变量、设置域名和 SSL。

11. **持续集成和部署（CI/CD）**：
    - 配置持续集成和部署流程，确保每次代码变更都能进行自动构建和测试。

12. **文档**：
    - 编写项目文档，包括组件文档、API 文档、使用说明等。
    - 使用工具（如 JSDoc、Markdown）来撰写文档。

13. **项目管理和版本控制**：
    - 使用项目管理工具（如 Jira、Trello）来跟踪任务和项目进度。
    - 使用版本控制系统（如 Git）来管理代码版本。

14. **安全性和性能优化**：
    - 考虑应用程序的安全性，包括输入验证、防止 XSS 攻击等。
    - 进行性能优化，减少加载时间、优化渲染性能等。

15. **国际化和本地化**：
    - 如有需要，支持多语言国际化和本地化。

这些是一个完整 React 项目可能需要的主要组成部分。根据项目的规模和要求，还可以添加其他功能和工具。

## 如何理解 React 的虚拟 dom

React 的虚拟 DOM（Virtual Document Object Model）是一种用于提高页面渲染性能的技术。它是 React 用来管理和表示页面结构的一种轻量级副本，存在于内存中。虚拟 DOM 通过比较算法将对虚拟 DOM 的更改与实际 DOM 进行最小化的操作，从而优化了页面渲染过程。

理解 React 的虚拟 DOM 可以分为以下几个方面：

01. **DOM 操作的成本**：
   直接操作实际的 DOM 元素可能非常昂贵，因为它会触发浏览器的重新渲染和重排，这会消耗大量的资源。虚拟 DOM 的出现是为了减少这种成本。

02. **虚拟 DOM 结构**：
   虚拟 DOM 是一个以 JavaScript 对象形式表示的页面结构，它与实际 DOM 一一对应。每个虚拟 DOM 元素包含了标签名、属性、子元素等信息。

03. **构建虚拟 DOM**：
   当你在 React 组件中编写 JSX 代码时，实际上是在构建虚拟 DOM。React 使用这些虚拟 DOM 元素来描述页面的结构。

04. **比较和更新**：
   当组件的状态或属性发生变化时，React 不会立即直接操作实际 DOM。相反，它会首先生成新的虚拟 DOM，并通过比较算法（称为“协调算法”）比较新旧虚拟 DOM 之间的差异。

05. **最小化 DOM 操作**：
   比较算法会找出需要更新的部分，并将这些更改应用到实际 DOM 上，从而最小化了实际 DOM 操作的次数，减少性能开销。

06. **批量更新**：
   React 会将多个状态变化合并为一次更新，以避免多次触发不必要的实际 DOM 操作。

总的来说，React 的虚拟 DOM 是一种优化性能的策略，它通过在内存中维护一个虚拟的页面结构，将实际 DOM 操作的成本降低到最小。这使得 React 能够以一种更高效的方式处理页面更新和渲染，提供更好的用户体验。

## React中key的作用及设置原则

在 React 中， `key` 是一个特殊的属性，用于帮助 React 跟踪组件的更新和重用。 `key` 在渲染列表和动态生成组件时非常重要，它有以下作用和设置原则：

**作用：**

01. **识别元素**：每个 React 元素在虚拟 DOM 中都有一个唯一的标识符，称为 `key`。它帮助 React 确定哪些元素需要被更新、删除或添加，以及如何正确地重用组件。

02. **优化更新**：使用正确的 `key` 可以帮助 React 优化组件更新，减少不必要的重新渲染和 DOM 操作。

**设置原则：**

01. **唯一性**：每个 `key` 应该在其兄弟元素中保持唯一。这有助于 React 正确识别元素之间的变化。`key` 的唯一性是相对于同级组件而言的，不同级别的组件可以有相同的 `key`。

02. **稳定性**：`key` 应该是稳定的，不会在组件重新渲染时发生变化。不建议使用随机生成的 `key`，因为会导致不必要的组件重新渲染。

03. **不使用索引作为 `key`**：虽然可以使用数组索引作为 `key`，但这在某些情况下可能导致错误的更新。最好使用具有稳定标识符的属性作为 `key`。

04. **从数据中获取 `key`**：如果列表中的元素有唯一的标识符，比如数据库中的 ID，最好使用这些标识符作为 `key`。

05. **避免频繁变化的值作为 `key`**：如果列表项的某个属性在短时间内频繁变化，最好不要将其作为 `key`，否则会导致不稳定的更新。

##  useEffect中return的函数在什么时候会调用

在 React 的 `useEffect` 钩子中，通过返回一个函数，你可以设置清除（cleanup）操作。这个返回的函数会在两种情况下被调用：

01. **组件被卸载**：
   当组件被从 DOM 中卸载时， `useEffect` 中返回的清除函数会被调用。这使得你可以在组件卸载之前执行一些清理操作，比如取消订阅、清除定时器、清除事件监听等。

02. **依赖项发生变化时**：
   如果在 `useEffect` 中传递了依赖数组，那么返回的清除函数会在依赖项发生变化时调用。这通常用于确保在下一次效果触发之前执行一些清理操作，以避免旧的效果影响到新的状态。

以下是一个示例，展示了如何在 `useEffect` 中使用返回的函数进行清理操作：

```jsx
import React, { useState, useEffect } from "react";

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect is running...");

    // 返回的函数会在组件卸载或下一次效果触发前调用
    return () => {
      console.log("Cleanup function is running...");
    };
  }, [count]); // 在 count 发生变化时触发效果

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default ExampleComponent;
```

在这个例子中，每当 `count` 发生变化时， `useEffect` 就会触发，旧的效果会先执行返回的清除函数，然后新的效果会开始执行。同时，当组件被卸载时，也会执行清除函数。

需要注意的是，如果你在 `useEffect` 中没有传递依赖数组，那么返回的清除函数会在每次组件重新渲染时都执行。因此，务必根据实际情况考虑是否传递依赖数组。

## Hooks跟Class Component区别

React Hooks 和 Class Components 是两种不同的 React 组件编写方式。React Hooks 是 React 16.8 引入的一种新特性，它使函数组件能够拥有类似于 Class Components 的状态管理和生命周期方法。以下是它们之间的一些主要区别：

01. **语法和编写方式**：
   - Class Components 使用 ES6 类语法来定义组件。组件必须继承自 `React.Component` 类，并且可以定义 `constructor` 、 `render` 方法以及其他生命周期方法。
   - React Hooks 则是使用函数式编程的方式，通过函数来定义组件。你可以在函数组件中使用多个不同的 Hook 函数来管理状态和副作用，而不需要类似于 Class Components 的继承和生命周期方法。

02. **状态管理**：
   - 在 Class Components 中，状态（state）是通过类的实例属性来管理的，通过 `this.state` 和 `this.setState` 进行访问和更新。
   - 在 React Hooks 中，你可以使用 `useState` Hook 来在函数组件中管理状态。它返回一个包含状态值和状态更新函数的数组。

03. **生命周期方法**：
   - Class Components 使用生命周期方法（如 `componentDidMount` 、 `componentDidUpdate` 、 `componentWillUnmount` 等）来管理组件的不同生命周期阶段。
   - React Hooks 使用各种 Hook 函数来模拟不同的生命周期行为。例如，你可以使用 `useEffect` Hook 来处理组件的副作用，它在组件渲染完成后执行。

04. **代码重用和逻辑分离**：
   - React Hooks 鼓励将相关逻辑拆分为可复用的 Hook 函数，这样可以更容易地共享逻辑和状态管理。
   - Class Components 通常需要使用高阶组件（HOC）或 Render Props 等模式来实现逻辑的重用。

05. **性能优化**：
   - React Hooks 可以帮助减少不必要的重新渲染，因为你可以使用 `useMemo` 和 `useCallback` 来缓存计算和回调函数。
   - Class Components 中的一些生命周期方法可能会导致不必要的渲染，因为它们在每次更新时都会被调用。

总的来说，React Hooks 提供了更简洁、灵活的方式来编写组件，使代码更具可读性和可维护性。然而，Class Components 仍然是 React 中的一部分，如果你的项目中已经使用了 Class Components，它们仍然是有效的。选择使用哪种方式取决于项目的需求和团队的偏好。

## Hooks的设计背景、使用方式、优缺点

React Hooks 是为了解决 React 组件编写中的一些问题和限制而引入的。它的设计背景主要包括以下几个方面：

01. **代码复用和逻辑分离困难**：在 Class Components 中，逻辑通常是通过高阶组件（HOC）或 Render Props 来共享，这会导致组件层级嵌套增加，代码可读性下降。

02. **复杂的生命周期方法**：Class Components 的生命周期方法在不同阶段执行，造成了状态和副作用的混杂，难以理清。

03. **难以理解的 this 指向**：在 Class Components 中，this 指向可能会引起困惑，特别是在回调函数中。

04. **难以进行代码拆分和测试**：Class Components 中的逻辑通常集中在生命周期方法中，使得组件的拆分和单元测试变得复杂。

基于上述问题，React 团队引入了 Hooks，它提供了更简洁、函数式的方式来编写组件。

**使用方式**：
使用 React Hooks 非常简单。主要的 Hook 函数包括：

* `useState`：用于在函数组件中添加状态。
* `useEffect`：用于处理副作用，替代了生命周期方法。
* `useContext`：用于在组件树中获取上下文。
* `useReducer`：用于管理复杂的状态逻辑。
* `useCallback` 和 `useMemo`：优化性能，避免不必要的重新渲染。

使用 Hooks 的一般模式是，在函数组件中使用这些 Hook 函数来处理状态、副作用和逻辑，而不再需要 Class Components 和生命周期方法。

**优点**：
* **简化组件编写**：Hooks 可以将组件的状态、副作用和逻辑拆分成更小的部分，使组件变得更加简洁、可读性更强。
* **逻辑复用**：通过自定义 Hook，可以将组件逻辑抽象为可复用的函数。
* **更好的性能优化**：Hooks 提供了更细粒度的控制，使得性能优化更加方便，避免不必要的重新渲染。
* **避免 Class 的限制**：Hooks 基于函数式编程，避免了 Class 的一些限制和复杂性，也解决了 this 指向的问题。

**缺点**：
* **新学习曲线**：对于习惯了 Class Components 的开发者来说，学习 Hooks 需要一定的适应时间。
* **可能出现过多的 Hook**：如果不合理地拆分逻辑，可能导致组件中使用了大量的 Hook，降低代码的可读性。

总的来说，React Hooks 是一种改善 React 组件编写方式的重要工具，它使得组件更加简洁、可维护，并且提供了更好的性能优化和逻辑复用机制。
