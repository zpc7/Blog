# bind 模拟实现 ⭐️

## bind 的效果

```js
function fn(a, b, c, d) {
  console.log(a, b, c, d);
  console.log(this);
}

const newFn = fn.bind({ newThis: '整个对象是新的this' }, 1, 2);
newFn(3, 4);
// 1 2 3 4
// { newThis: '整个对象是新的this' }
```

`bind` 会改变函数的 `fn` 的 `this` 指向, 在上面的例子中, 就被修改为对象 `{ newThis: '整个对象是新的this' }`

在对原函数 `fn` 使用 `bind` 时, 可以传入参数 `1` `2` 作为初始参数, 新函数 `newFn` 调用的时候再传入其余的参数

## 基础实现

```js
// myBind 的第一个参数 ctx 为 this
Function.prototype.myBind = function (ctx) {
  // 这里获得其他不定量参数, 例如上面例子中的 1, 2, 于是 args = [1, 2]
  var args = Array.prototype.slice.call(arguments, 1);
  // 使用形式: fn.myBind, 原始函数为fn, 就是此 myBind 函数的 this 指向
  var fn = this;
  return function () {
    // 这里获取 经过 bind 处理后返回的新函数, 在调用时的参数
    // 例如上面例子中的 3, 4, 于是 restArgs = [3, 4]
    var restArgs = Array.prototype.slice.call(arguments);
    // 所有的参数 例如上面例子, 于是allArgs = [1, 2, 3, 4]
    var allArgs = args.concat(restArgs);
    // 调用原始函数, this 指向新的 ctx; 添加 return, 因为原函数可能有返回值
    return fn.apply(ctx, allArgs);
  };
};
```

### 测试用例

```js
function fn(a, b, c, d) {
  console.log(a, b, c, d);
  console.log(this);
  return 77777;
}

const newFn = fn.myBind({ newThis: '整个对象是新的this' }, 1, 2);
const value = newFn(3, 4);
console.log(value);
// 1 2 3 4
// { newThis: '整个对象是新的this' }
// 77777
```

## 兼容 new 关键词 ⭐️

这里是个难点, 参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#%E4%BD%9C%E4%B8%BA%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%BD%BF%E7%94%A8%E7%9A%84%E7%BB%91%E5%AE%9A%E5%87%BD%E6%95%B0), 默认的 `bind` 有如下的行为:

绑定函数自动适用于与 new 运算符一起使用，以用于构造目标函数创建的新实例。当使用绑定函数是用来构造一个值时，提供的 this 会被忽略。然而，提供的参数仍会被插入到构造函数调用时的参数列表之前。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return `${this.x},${this.y}`;
};

const p = new Point(1, 2);
p.toString();
// '1,2'

// thisArg 的值并不重要，因为它被忽略了
const YAxisPoint = Point.bind(null, 0 /*x*/);

const axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'

axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new YAxisPoint(17, 42) instanceof Point; // true
```

下面是模拟实现:

```js
// myBind 的第一个参数 ctx 为 this
Function.prototype.myBind = function (ctx) {
  // 这里获得其他不定量参数, 例如上面例子中的 1, 2, 于是 args = [1, 2]
  var args = Array.prototype.slice.call(arguments, 1);
  // 使用形式: fn.myBind, 原始函数为fn, 就是此 myBind 函数的 this 指向
  var fn = this;
  // 给函数取名, 用于判断是否在用 new 调用
  return function newFunctionName() {
    // 这里获取 经过 bind 处理后返回的新函数, 在调用时的参数
    // 例如上面例子中的 3, 4, 于是 restArgs = [3, 4]
    var restArgs = Array.prototype.slice.call(arguments);
    // 所有的参数 例如上面例子, 于是allArgs = [1, 2, 3, 4]
    var allArgs = args.concat(restArgs);
    // 调用原始函数, this 指向新的 ctx; 添加 return, 因为原函数可能有返回值

    // 如果是使用 new 的方式调用函数
    if (Object.getPrototypeOf(this) === newFunctionName.prototype) {
      return new fn(...allArgs);
    } else {
      return fn.apply(ctx, allArgs);
    }
  };
};
```

### 测试用例

```js
function fn(a, b, c, d) {
  console.log(a, b, c, d);
  console.log(this);
  return 77777;
}

const newFn = fn.myBind({ newThis: '整个对象是新的this' }, 1, 2);
const value = new newFn(3, 4);
console.log(value);
// 1 2 3 4
// fn {}
// fn {}
```

输出跟将 `fn.myBind` 替换为 `fn.bind`的默认行为是一致的

## 参考链接

> 手写 bind@必修课 DDD

- [MDN bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [mqyqingfeng JavaScript 深入之 bind 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)
