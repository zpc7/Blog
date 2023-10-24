# 基础
* [【源码阅读】arrify｜如何把一个值转换为一个数组？](https://mp.weixin.qq.com/s/hChlOTwpSjoJkSKi7ka6yg)

## 1. JS 数据类型和区别?

JS 有如下 7 种基本类型 + 1 种引用类型( `Object` )
| 类型 | typeof 返回值 | 对象包装器 |
| ------------- | ----------- | ---- |
|Null| "object" | N/A |
|Undefined| "undefined" | N/A |
|Boolean| "boolean" | Boolean |
|Number| "number" | Number |
|BigInt| "bigint" | BigInt |
|String| "string" | String |
|Symbol| "symbol" | Symbol |

其中 `Symbol` 和 `BigInt` 是 ES6 中新增的数据类型:
* `Symbol` 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
* `BigInt` 是一种数字类型的数据，它可以表示任意精度格式的整数， 使用 `BigInt` 可以安全地存储和操作大整数，即使这个数已经超出了 `Number` 能够表示的安全整数范围

### 存储上的区别

基本数据类型和引用数据类型在内存中的存储位置不同：

* 基本数据类型存储在`栈(stack)`中

* 引用类型的对象存储于`堆(heap)`中

当我们把变量赋值给一个变量时，解析器首先要确认的就是这个值是基本类型值还是引用类型值

#### 基本类型

```js
let a = 10;
let b = a; // 赋值操作
b = 20;
console.log(a); // 10值
```

`a` 的值为一个基本类型，是存储在栈中，将 `a` 的值赋给 `b` ，虽然两个变量的值相等，但是两个变量保存了两个不同的内存地址

下图演示了基本类型赋值的过程：

![](../images/js-basic-data-type-stack.png)

#### 引用类型

```js
var obj1 = {};
var obj2 = obj1;
obj2.name = 'xxx';
console.log(obj1.name); // xxx
```

引用类型数据存放在`堆`中，每个堆内存对象都有对应的引用地址指向它，引用地址存放在`栈`中。

`obj1` 是一个引用类型，在赋值操作过程汇总，实际是将堆内存对象在栈内存的引用地址复制了一份给了 `obj2` ，实际上他们共同指向了同一个堆内存对象，所以更改 `obj2` 会对 `obj1` 产生影响

下图演示这个引用类型赋值过程

![](../images/js-basic-data-type-heap.png)

### 参考链接

* [MDN JS 类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8A%A8%E6%80%81%E5%92%8C%E5%BC%B1%E7%B1%BB%E5%9E%8B)
* [数据类型和存储的区别](https://vue3js.cn/interview/JavaScript/data_type.html#%E5%89%8D%E8%A8%80)

## 2. typeof 与 instanceof 区别?

### typeof

typeof 是一个操作符，用于检查给定值的数据类型。 返回值为 string

| 类型         | 结果                     |
| ------------ | ------------------------ |
| Undefined    | "undefined"              |
| Null         | "object"（历史遗留原因） |
| Boolean      | "boolean"                |
| Number       | "number"                 |
| BigInt       | "bigint"                 |
| String       | "string"                 |
| Symbol       | "symbol"                 |
| Function     | "function"               |
| 其他任何对象 | "object"                 |

### instanceof

instanceof 运算符用来检测 `constructor.prototype` 是否存在于实例对象 `object` 的原型链上。返回值为 boolean

```js
object instanceof constructor;
// object 为实例对象，constructor 为构造函数
```

构造函数通过 new 可以实例对象，instanceof 能判断这个对象是否是之前那个构造函数生成的对象

```js
// 定义构建函数
let Car = function() {};
let benz = new Car();
benz instanceof Car; // true

let car = new String('xxx');
car instanceof String; // true

// instanceof 不能判断基础数据类型
'xxx' instanceof String; // false
true instanceof Boolean; // false
2 instanceof Number; // false
```

#### instanceof 模拟实现 ⭐️

也就是顺着原型链去找，直到找到相同的原型对象，返回 true，否则为 false

```js
function myInstanceof(left, right) {
  // 这里先用 typeof 来判断基础数据类型，如果是，直接返回 false
  if (typeof left !== 'object' || left === null) return false;
  // getPrototypeOf 是 Object 对象自带的 API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true; //找到相同原型对象，返回 true
    proto = Object.getPrototypeOf(proto);
  }
}
```

### 区别

* typeof 用于检查值的数据类型，特别适用于基本数据类型和函数的检查。
* instanceof 用于检查对象的原型链中的构造函数，用于自定义对象的类型检查。

### 参考链接

* [MDN typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
* [MDN instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

## 3. 下面正则的输出?

```js
console.log(/[^@]+@..(com|cn){1}$/ig.test('sdfkdsf@dsd.com'))
// false 因为 'dsd.'部分匹配了4个字符

// [^@]+：匹配一个或多个不包含 @ 字符的字符。这部分用于匹配电子邮件地址中的用户名部分。
// @：匹配 @ 字符。
// ..：匹配任意两个字符，这用于匹配邮件地址中的域名部分的前两个字符。

console.log(/[^@]@.*.(com|cn){1}$/ig.test('sdfkdsf@dsd.cen.com'))
//true 
```

### 参考链接

[正则 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

## 4. null 和 undefined 的区别?

`Undefined` 和 `Null` 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 `undefined` 和 `null`。

`undefined` 代表的含义是未定义,  `null` 代表的含义是空对象。一般变量声明了但还没定义的时候会返回 `undefined`,  `null` 主要用于赋值给一些可能会返回对象的变量, 作为初始化。

`undefined` 在 JavaScript 中不是一个保留字, 这意味着可以使用 `undefined` 来作为一个变量名, 但是这样的做法是非常危险的, 它会 影响对 `undefined` 值的判断。我们可以通过一些方法获得安全的 `undefined` 值, 比如说 `void 0`。

当对这两种类型使用 typeof 进行判断时, Null 类型化会返回 "object", 这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true, 使用三个等号时会返回 false。

## 5. Object.is() 与 === 、 == 区别?

`==` 运算符在测试相等性之前，会对两个操作数进行类型转换（如果它们不是相同的类型），这可能会导致一些非预期的行为，例如 "" == false 的结果是 true，但是 `Object.is()` 不会对其操作数进行类型转换。

`Object.is()` 和 `===` 之间的唯一区别在于它们处理带符号的 0 和 NaN 值的时候。=== 运算符（和 == 运算符）将数值 -0 和 +0 视为相等，但是会将 NaN 视为彼此不相等。

```js
-0 === +0; // true
Object.is(-0, +0); // false

NaN === NaN;       // false
Object.is(NaN, NaN);   // true
```

### 参考链接

[MDN Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

## 6. 什么是 JS 中的包装类型?

在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会隐式地将基本类型的值转换为对象，如:

```js
const a = 'abc';
a.length // 3
a.toUpperCase() // 'ABC'
```

在访问'abc'.length 时，JavaScript 将'abc'在后台转换成 String('abc')，然后再访问其 length 属性。
JavaScript 也可以使用 Object 函数显式地将基本类型转换为包装类型, 可以使用 `valueOf` 方法将包装类型倒转成基本类型

```js
const a = 'abc';
Object(a) // String { "abc" }
Object(a).valueOf() // 'abc'
```

## 7. 扩展运算符的作用及使用场景

### 对象扩展运算符

对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar };
```

等同于

```js
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar);
```

`Object.assign(target, source)` 方法用于对象的合并，将源对象(source)的所有可枚举属性，复制到目标对象(target)。如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```js
let bar = { a: 1, b: 2 };
let baz = { a: 3, c: 4, ...bar }; // { a: 1, b: 2, c: 4 }
```

利用上述特性就可以很方便的修改对象的部分属性。在 redux 中的 reducer 函数规定必须是一个纯函数，reducer 中的 state 对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。

需要注意: 扩展运算符对对象实例的拷贝属于浅拷贝。

### 数组扩展运算符

数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。

```js
console.log(...[1, 2, 3]) // 1 2 3
console.log(...[1, [2, 3, 4], 5]) // 1, [2, 3, 4], 5
```

下面是数组的扩展运算符的应用:

将数组转换为参数序列

```js
function add(x, y) {
  return x + y;
}
const numbers = [4, 38];
add(...numbers) // 42
```

复制数组

```js
const arr1 = [1, 2];
const arr2 = [...arr1]; // 等同于 const arr2 = arr1.slice();
```

合并数组

```js
  const arr1 = ['2', '3'];
  const arr2 = ['1', ...arr1, '4', '5']; // ['1', '2', '3', '4', '5']
  ```

扩展运算符与解构赋值结合起来，用于生成数组

```js
const [first, ...rest] = [1, 2, 3, 4, 5]; 
first // 1
rest  // [2, 3, 4, 5]
```

需要注意: 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```js
const [...rest, last] = [1, 2, 3, 4, 5];
const [first, ...rest, last] = [1, 2, 3, 4, 5];
// 报错 Uncaught SyntaxError: Rest element must be last element
```

将字符串转为真正的数组

```js
[...'hello'] // [ "h", "e", "l", "l", "o" ]
```

任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组, 比较常见的应用是可以将某些数据结构转为数组:

```js
// arguments 对象
function foo() {
  const args = [...arguments]; 
  // 等同于 Array.prototype.slice.call(arguments)
}
```

使用 Math 函数获取数组中特定的值

```js
const numbers = [9, 4, 7, 1];
Math.min(...numbers); // 1
Math.max(...numbers); // 9
```

## 8. JS 脚本延迟加载的方式有哪些?

延迟加载就是等页面加载完成之后再加载 JavaScript 文件。js 延迟加载有助于提高页面加载速度。一般有以下几种方式:

* `defer` 属性
* `async` 属性 (他跟 `defer` 的区别[参考](/interview/engineering/module.html#%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD-defer-%E5%92%8C-async-%E7%9A%84%E5%BC%82%E5%90%8C))
* 动态创建 DOM 方式: 动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
* 使用 setTimeout 延迟方法: 设置一个定时器来延迟加载 js 脚本文件
* 让 JS 最后加载: 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

## 9. 什么是尾调用，使用尾调用有什么好处?

尾调用指的是函数的最后一步调用另一个函数。代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话， 因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。

但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

## 10. for...in 和 for...of 的区别?

`for...in` 和 `for...of` 是 JavaScript 中用于遍历数据结构（比如对象、数组等）的两种不同的循环语句。它们有以下区别：

### `for...in` 循环

* `for...in` 循环是用来遍历对象的属性名称（键名）的。它会遍历对象的可枚举属性，包括从原型链继承的属性。
* `for...in` 循环的语法如下：

```javascript
  for (let key in object) {
    // code to be executed
  }
  ```

* **注意：** `for...in` 不建议用于遍历数组。因为它遍历的是数组的索引，可能会遍历到数组原型链上的方法和属性，而且遍历顺序不一定是按照数组的顺序。

###  `for...of` 循环

* `for...of` 循环是用来遍历可迭代对象（比如数组、字符串、Map、Set 等）的元素值的。它只遍历对象的属性值，不包括对象的属性名称。
* `for...of` 循环的语法如下： 

```javascript
  for (let value of iterable) {
    // code to be executed
  }
  ```

* `for...of` 循环适用于遍历数组等可迭代对象，提供了更直观、简洁的遍历方式。

总结来说，`for...in` 用于遍历对象的键名，而 `for...of` 用于遍历对象的键值。在遍历数组时，推荐使用 `for...of`，因为它避免了遍历到数组原型链上的属性，并且提供了更清晰的语法。
