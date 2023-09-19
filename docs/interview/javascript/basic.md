# 基础

## JS 中有哪些数据类型?

JS 有如下 7 种基本类型 + 1 种引用类型(`Object`)
| 类型 | typeof 返回值 | 对象包装器 |
| ------------- | ----------- | ---- |
|Null| "object" | N/A |
|Undefined| "undefined" | N/A |
|Boolean| "boolean" | Boolean |
|Number| "number" | Number |
|BigInt| "bigint" | BigInt |
|String| "string" | String |
|Symbol| "symbol" | Symbol |

## 基本类型和引用类型存储上的区别?

基本数据类型和引用数据类型存储在内存中的位置不同：

- 基本数据类型存储在栈中

- 引用类型的对象存储于堆中

当我们把变量赋值给一个变量时，解析器首先要确认的就是这个值是基本类型值还是引用类型值

### 基本类型

```js
let a = 10;
let b = a; // 赋值操作
b = 20;
console.log(a); // 10值
```

`a` 的值为一个基本类型，是存储在栈中，将 `a` 的值赋给 `b`，虽然两个变量的值相等，但是两个变量保存了两个不同的内存地址

下图演示了基本类型赋值的过程：

![](../images/js-basic-data-type-stack.png)

### 引用类型

```js
var obj1 = {};
var obj2 = obj1;
obj2.name = 'Xxx';
console.log(obj1.name); // xxx
```

引用类型数据存放在堆中，每个堆内存对象都有对应的引用地址指向它，引用地址存放在栈中。

`obj1` 是一个引用类型，在赋值操作过程汇总，实际是将堆内存对象在栈内存的引用地址复制了一份给了 `obj2`，实际上他们共同指向了同一个堆内存对象，所以更改 `obj2` 会对 `obj1` 产生影响

下图演示这个引用类型赋值过程

![](../images/js-basic-data-type-heap.png)

### 参考链接

- [MDN JS 类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8A%A8%E6%80%81%E5%92%8C%E5%BC%B1%E7%B1%BB%E5%9E%8B)
- [数据类型和存储的区别](https://vue3js.cn/interview/JavaScript/data_type.html#%E5%89%8D%E8%A8%80)
