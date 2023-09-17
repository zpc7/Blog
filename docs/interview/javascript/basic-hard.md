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

> 闭包代码的提权漏洞@必修课 DDD

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

> 一道解构的面试题@必修课 DDD

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

## 3. 下面的代码输出什么?

```js:line-numbers
var foo = { bar: 1 };
var arr1 = [1, 2, foo];
var arr2 = arr1.slice(1);
arr2[0]++;
arr2[1].bar++;
foo.bar++;
arr1[2].bar++;

console.log(arr1[1] === arr2[0]);
console.log(arr1[2] === arr2[1]);
console.log(foo.bar);
```

::: details 参考答案

> 值和引用的终极面试题@每日进阶 CCC

```js
// false
// true
// 4
```

引用类型的数据在内存中都是按照堆(heap)的方式存储, 依次划出每一步的结构:

1. `var foo = { bar: 1 }`, 在堆上创建一个对象 `{ bar:1 }`, 标记其存储地址为 `A`; 把堆上的地址 `A` 赋值给变量 `foo`, `foo` 中保存的就是地址 `A`
2. `var arr1 = [1, 2, foo]`, 在堆上创建数组 `[1, 2, foo]`, 其中 `foo` 保存的是地址 `A`, 标记新的数组地址为 `B`; 同样的赋值后, `arr1` 中保存的是地址 `B`

```js
foo: A
arr1: B

A -> { bar:1 }
B -> [1, 2, A ]
```

3. `var arr2 = arr1.slice(1)`, `slice` 创建一个新数组, 从下标为 `1` 的位置开始截取, 标记新数组地址为 `C`, 赋值给 `arr2`

```js
foo: A
arr1: B
arr2: C  // [!code ++]

A -> { bar:1 }
B -> [1, 2, A ]
C -> [2, A]  // [!code ++]
```

4. `arr2[0]++`, 找到 `arr2` 对应的地址 `C`, 然后将对应下标位置的 2 --> 3

```js
foo: A
arr1: B
arr2: C

A -> { bar:1 }
B -> [1, 2, A ]
C -> [2, A]  // [!code --]
C -> [3, A]  // [!code ++]
```

5. `arr2[1].bar++`, 找到 `arr2` 对应地址 `C`, 找到对应下标位置的 `A`, 将 `A` 对应的 `bar` 1 --> 2

```js
foo: A
arr1: B
arr2: C

A -> { bar:1 } // [!code --]
A -> { bar:2 } // [!code ++]
B -> [1, 2, A ]
C -> [3, A]
```

6. `foo.bar++`, 找到 `foo` 对应地址 `A`, 将对应的 `bar` 2 --> 3

```js
foo: A
arr1: B
arr2: C

A -> { bar:2 } // [!code --]
A -> { bar:3 } // [!code ++]
B -> [1, 2, A ]
C -> [3, A]
```

7. `arr1[2].bar++`, 找到 `arr1` 对应地址 `B`, 找到对应下标位置的地址 `A`, 将对应的 `bar` 3 --> 4

```js
foo: A
arr1: B
arr2: C

A -> { bar:3 } // [!code --]
A -> { bar:4 } // [!code ++]
B -> [1, 2, A ]
C -> [3, A]
```

:::

## 4. 判断函数是否标记了 `async`

```js
function isAsyncFunction(func) {}
```

:::details 参考答案

> 判断函数是否标记为 async@每日进阶 CCC

```js
function isAsyncFunction(func) {
  const stringTag = Object.prototype.toString.call(func);
  return stringTag === '[object AsyncFunction]';

  // 或者
  return func[Symbol.toStringTag] === 'AsyncFunction';
}
```

### 参考链接

- [阮一峰 ES6 内置 Symbol.toStringTag](https://es6.ruanyifeng.com/#docs/symbol#Symbol-toStringTag)

:::
