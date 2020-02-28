您不必使用许多状态变量。 状态变量可以很好地保存对象和数组，因此您仍然可以将相关数据组合在一起。 但是，与 this.setState 类不同的是，更新状态变量总是替换它，而不是合并它。
如果您熟悉 React 类生命周期方法，可以将 useEffect Hook 看作 componentDidMount、 componentDidUpdate 和 componentWillUnmount 的组合。
与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的效果不会阻止浏览器更新屏幕。 这使你的应用程序感觉更灵敏。 大多数的影响并不需要同时发生。 在他们这样做的罕见情况下(例如测量布局) ，有一个单独的 useLayoutEffect Hook，其 API 与 useEffect 相同。
Hooks let us split the code based on what it is doing rather than a lifecycle method name.
Hooks 让我们根据代码所做的工作而不是根据生命周期方法名称来分割代码。
