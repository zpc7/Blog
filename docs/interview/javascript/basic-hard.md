---
outline: 2
---

# 基础 ⭐️⭐️⭐️

## 1. 如何修改闭包中的对象?

如何在不修改下面代码的情况下, 修改 `obj` 对象

```js
var o = (function () {
  var obj = {
    a: 1,
    b: 2
  };
  return {
    get: function (k) {
      return obj[k];
    }
  };
})();
```

::: details 参考答案

```js {1-5}
Object.defineProperty(Object.prototype, 'getThis', {
  get() {
    return this;
  }
});

const obj = o.get('getThis');
obj.a = 'new a';

console.log(obj);
// { a: 'new a', b: 2 }
```

注意: 不能直接通过访问原型上的 `valueOf` 方法获取原对象 `obj`, 会出现 `this` 指向问题, 只能通过访问自定义属性(不是方法)的方式

### 修补漏洞方法

#### 断开原型链

```js
Object.setPrototypeOf(obj, null);
// 或者定义的时候指定原型为 null
var obj = Object.create(null);
```

#### 修改 get 方法

```js
get: function (k) {
      if (obj.hasOwnProperty(k)) {
        return obj[k];
      }
    }
```

:::

## 2. 让以下的代码成立?

```js
var [a, b] = { a: 1, b: 2 };
```

::: details 参考答案

```js
Object.prototype[Symbol.iterator] = function () {
  const arr = Object.values(this);
  return arr[Symbol.iterator]();
};
// 或者使用生成器
Object.prototype[Symbol.iterator] = function* () {
  return yield* Object.values(this);
};
```

:::
