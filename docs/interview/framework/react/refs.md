# React Refs 相关的 API

关于 `Refs` 有很多API, 例如 `createRef` / `useRef` / `forwardRef` / `useImperativeHandle`

总结: 
1. `createRef` 用于 class 组件，`useRef` 用于函数组件
2. Ref 允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件, 使用`forwardRef`完成
3. `useImperativeHandle` 可以让你在使用 ref 时自定义暴露给父组件的实例值。`useImperativeHandle` 应当与 `forwardRef` 一起使用

**参考链接**:
1. [官方: Refs and the DOM](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)
2. [官方: Refs 转发](https://zh-hans.reactjs.org/docs/forwarding-refs.html)
3. [官方:useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)
4. [官方:useImperativehandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)
5. [分析React.createRef和React.useRef](https://zhuanlan.zhihu.com/p/115230135)
6. [创建 Refs 的几种方式](https://blog.csdn.net/wu_xianqiang/article/details/104153645)
7. [react forward ref的使用](https://www.jianshu.com/p/fac884647720)
8. [useRef详细总结](https://blog.csdn.net/u011705725/article/details/115634265)
