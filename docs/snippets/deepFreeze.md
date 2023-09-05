## 深度冻结对象

```js
// 深冻结函数。
function deepFreeze(obj) {
  // 取回定义在 obj 上的属性名
  let propNames = Object.getOwnPropertyNames(obj);

  // 在冻结自身之前冻结属性
  propNames.forEach((name) => {
    let prop = obj[name];

    // 如果 prop 是个对象，冻结它
    if (typeof prop === "object" && prop !== null) {
      deepFreeze(prop);
    }
  });

  // 冻结自身 (no-op if already frozen)
  return Object.freeze(obj);
}
```
```js
// 示例:
obj2 = {
  internal: {},
};

deepFreeze(obj2);
obj2.internal.a = "anotherValue";
obj2.internal.a; // undefined
```

参考:
[MDN Object.freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)