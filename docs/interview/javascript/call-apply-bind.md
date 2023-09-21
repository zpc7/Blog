# call apply 和 bind 的区别?

## 作用

`call`、`apply`、`bind` 作用是改变函数执行时的上下文，简而言之就是改变函数运行时的 `this` 指向

什么情况下需要改变`this`的指向呢？下面举个例子

```js
var name = 'AAA';
var obj = {
  name: 'BBB',
  say: function () {
    console.log(this.name);
  }
};
obj.say(); // BBB  this 指向 obj
setTimeout(obj.say, 0); // AAA this 指向 window
```

从上面可以看到，正常情况 `say` 方法输出`BBB`

但是我们把`say`放在`setTimeout`方法中，在定时器中是作为回调函数来执行的，因此回到主调用栈中执行时, 是在全局执行上下文的环境中执行的，这时候`this`指向`window`，所以输出`AAA`

我们实际需要的是`this`指向`obj`对象，这时候就需要该改变`this`指向了

```js
setTimeout(obj.say.bind(obj), 0); //  BBB  this 指向 obj
```

## 区别

### apply

`apply`接受两个参数，第一个参数是`this`的指向，第二个参数是函数接受的参数，以**数组**的形式传入

改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```js
function fn(...args) {
  console.log('@@@this:', this);
  console.log('@@@args:', args);
}
let obj = {
  name: '张三',
  age: 10
};
fn(1, 2);
// @@@this: window
// @@@args: [ 1, 2 ]

fn.apply(obj, [1, 2]);
// @@@this: { name: '张三', age: 10 }
// @@@args: [ 1, 2 ]
```

非严格模式下, 当第一个参数为`null`、`undefined`时，默认指向全局对象

```js
fn.apply(null, [1, 2]); // this 指向 window
fn.apply(undefined, [1, 2]); // this 指向 window
```

### call

`call`方法的第一个参数也是`this`的指向，后面传入的是一个参数列表

跟`apply`一样，改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```js
function fn(...args) {
  console.log('@@@this:', this);
  console.log('@@@args:', args);
}
let obj = {
  name: '张三',
  age: 10
};

fn.call(obj, 1, 2); // this会变成传入的obj，传入的参数必须是一个数组
fn(1, 2); // this指向 window
```

同样的，非严格模式下, 当第一个参数为`null`、`undefined`时，默认指向全局对象

```js
fn.call(null, [1, 2]); // this 指向 window
fn.call(undefined, [1, 2]); // this 指向 window
```

### bind

bind 方法和 call 很相似，第一参数也是`this`的指向，后面传入的也是一个参数列表

改变`this`指向后**不会**立即执行，而是返回一个新的永久改变`this`指向的函数

```js
function fn(...args) {
  console.log(this, args);
}
let obj = {
  name: '张三'
};

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind 不会立即执行
bindFn(1, 2); // this 指向 obj
fn(1, 2); // this 指向 window
```

## 总结

从上面可以看到，`apply`、`call`、`bind`三者的区别在于：

- 三者都可以改变函数的 `this` 对象指向
- 三者第一个参数都是 `this` 要指向的对象，非严格模式下, 如果第一个参数为 `undefined` 或 `null`，则默认指向全局对象
- 三者都可以传参，但是 `apply` 是数组，而`call`是参数列表，且`apply`和`call`是一次性传入参数，而`bind`可多次传入
- `bind` 是返回绑定 this 之后的新函数，`apply`、`call` 则是立即执行
