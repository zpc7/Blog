# this

## 定义

`this` 关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象

在**绝大多数情况**下，函数的调用方式决定了 `this` 的值（运行时绑定）

函数的 `this` 关键字在 `JavaScript` 中的表现略有不同，此外，在严格模式和非严格模式之间也会有一些差别

同时，`this`在函数执行过程中，`this`一旦被确定了，就不可以再更改

```js
var a = 10;

function fn() {
  this = {
  a: 20
}; // 修改this，运行后会报错
  console.log(this.a);
}

fn();
```

## 绑定规则

根据不同的使用场合，`this`有不同的值，主要分为下面几种情况：

- 默认绑定
- 隐式绑定
- new 绑定
- 显示绑定

### 默认绑定

全局环境中定义`person`函数，内部使用`this`关键字

```js
var name = 'Jenny';
function person() {
  return this.name;
}
console.log(person()); //Jenny
```

上述代码输出`Jenny`，原因是调用函数的对象在游览器中位于`window`，因此`this`指向`window`

注意：

严格模式下，不能将全局对象用于默认绑定，this 会绑定到`undefined`，只有函数运行在非严格模式下，默认绑定才能绑定到全局对象

### 隐式绑定

函数还可以作为某个对象的方法调用，这时`this`就指这个上级对象

```js
function test() {
  console.log(this.x);
}

var obj = {
  x: 1,
  m: test
};

obj.m(); // 1
```

这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，`this`指向的也只是它上一级的对象

`this`的上一级对象为`b`，`b`内部并没有`a`变量的定义，所以输出 `undefined`

```js
var o = {
  a: 10,
  b: {
    fn: function () {
      console.log(this.a); //undefined
      console.log(this.a === o.b); //true
    }
  }
};
o.b.fn();
```

特殊情况, 重点留意 ⭐:

```js
var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a); //undefined
      console.log(this); //window
    }
  }
};
var j = o.b.fn;
j();
```

此时`this`指向的是`window`，这里需要特别注意，`this`指向的永远是**最后**调用它的对象，虽然`fn`是对象`b`的方法，但是`fn`赋值给`j`时候并没有执行，所以最终指向`window`

### new 绑定

通过构建函数`new`关键字生成一个实例对象，此时`this`指向这个实例对象

```js
function test() {
  this.x = 1;
}

var obj = new test();
obj.x; // 1
```

上述代码之所以能过输出 1，是因为`new`关键字改变了`this`的指向

这里再列举一些特殊情况：

`new`过程遇到`return`一个对象，此时`this`指向为返回的对象

```js
function fn() {
  this.user = 'xxx';
  return {};
}
var a = new fn();
console.log(a.user); //undefined
```

如果返回一个简单类型的时候，则`this`指向实例对象

```js
function fn() {
  this.user = 'xxx';
  return 1;
}
var a = new fn();
console.log(a.user); //xxx
```

注意的是`null`虽然也是对象，但是此时`new`仍然指向实例对象

```js
function fn() {
  this.user = 'xxx';
  return null;
}
var a = new fn();
console.log(a.user); //xxx
```

可参考文章 [new 操作符](./new.md)

### 显式修改

`apply()、call()、bind()`是函数的一个方法，作用是改变函数的调用对象。它的第一个参数就表示改变后的调用这个函数的对象。因此，这时`this`指向第一个参数

```js
var x = 0;
function test() {
  console.log(this.x);
}

var obj = {
  x: 1,
  m: test
};
test(); // 0
test.apply(obj); // 1
```

[`apply、call、bind` 三者的区别](/interview/javascript/call-apply-bind)

## 箭头函数

在 ES6 的语法中还提供了箭头函语法，让我们在代码书写时就能确定 `this` 的指向（编译时绑定）

举个例子：

```js
const obj = {
  sayThis: () => {
    console.log(this);
  }
};

obj.sayThis(); // window
// 定义 sayThis 的时候，里面的 this 就绑到 window 上了
```

虽然箭头函数的`this`能够在编译的时候就确定了`this`的指向，但也需要注意一些潜在的坑

下面举个例子：

绑定事件监听

```js
const button = document.getElementById('element');
button.addEventListener('click', () => {
  console.log(this === window); // true
  this.innerHTML = 'clicked button';
});
```

上述可以看到，我们其实是想要`this`为点击的`button`，但此时`this`指向了`window`

包括在原型上添加方法时候，此时`this`指向`window`

```js
function Cat(name) {
  this.name = name;
}
Cat.prototype.sayName = () => {
  console.log(this === window); //true
  return this.name;
};

const cat = new Cat('mm');
cat.sayName(); // '' 返回了 window.name
```

同样的，箭头函数不能作为构建函数

## 优先级

new 绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

## 参考链接

- [MDN this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
