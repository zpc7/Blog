# 实现useUpdateEffect

`useUpdateEffect` 是一个自定义的 React Hook，它类似于 `useEffect` ，但只会在组件更新后执行，而在首次渲染时不会执行。以下是一个简单的 `useUpdateEffect` 实现示例：

```jsx
import { useEffect, useRef } from 'react';

function useUpdateEffect(callback, dependencies) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      return callback();
    }
  }, dependencies);
}

export default useUpdateEffect;
```

在这个实现中，我们使用了 `useRef` 来跟踪组件是否是首次渲染。在 `useEffect` 内部，我们根据 `isFirstRender` 的值决定是否执行回调函数。

使用示例：

```jsx
import React, { useState } from 'react';
import useUpdateEffect from './useUpdateEffect'; // 替换为你的路径

function MyComponent() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    console.log('Component updated. Count:', count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

在这个示例中， `useUpdateEffect` 的回调函数仅在 `count` 发生变化时才会在组件更新后执行，而在首次渲染时不会执行。

请注意，这只是一个简单的实现示例，实际使用中可能需要更多的考虑和错误处理，比如处理传递给 `useUpdateEffect` 的依赖项为空数组的情况等。
