# React Optimizing Performance
## `PureComponent`
### 概念说明
> `React.PureComponent` is equivalent to implementing shouldComponentUpdate() with a shallow comparison of current and previous props and state.  
PureComponent 相当于通过对 现在和上一次的 props 和 state 进行浅层比较来实现 shouldComponentUpdate

这里的`浅比较`,理解为内存地址比较即可
### 使用示例
```jsx
import React from "react";
// normal Component
class Child extends React.Component {
  render() {
    console.log("Child Render!");
    return <div>normal Child</div>;
  }
}
// component with PureComponent
class ChildWithPureComponent extends React.PureComponent {
  render() {
    console.log("PureChild Render");
    return <div>ChildWithPureComponent</div>;
  }
}

export default class Parents extends React.Component {
  state = {
    count: 1
  };
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { count } = this.state;
    console.log("Parents Render");
    return (
      <div>
        <div>count: {count}</div>
        <button onClick={this.handleClick}>+ 1</button>
        <Child />
        <ChildWithPureComponent />
      </div>
    );
  }
}
```
上述代码中, 组件 `Child` 和 `ChildWithPureComponent` 均为纯文本展示组件, 但当我们点击按钮后(state + 1), `Child` 重新渲染了(尽管是固定的纯文本), 但 `ChildWithPureComponent` 不会重新渲染.  
### 使用注意: 由于 `PureComponent` 仅仅是浅对比, 所以当依耐数据是引用类型的时候, 确保数据地址已经变化. 可以使用`Array.concat` [spread syntax](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)  `Object.assign` 等返回一个新的引用值
## `memo`
### 概念说明
> React.memo is a higher order component. It’s similar to React.PureComponent but for function components instead of classes.  
Memo 是一个高阶组件。类似于 PureComponent ，但用于函数组件而不是类
### 使用示例
```jsx
+++ 结合上一个示例代码
const ChildWithMemo = React.memo(() => {
  console.log("MemoChild Render")
  return <div>ChildWithMemo</div>
})
```
### 使用注意:如果包装在 React.memo 中的函数组件的实现中包含 useState 或 useContext Hook，那么当 state 或 context 发生更改时，它仍然会重新运行。

### 使用总结:在子组件**不需要父组件的值和函数**的情况下，只需要使用 `Pure Component` 或使用 `memo` 函数包裹子组件即可, 不会出现多余的渲染.
