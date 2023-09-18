# new 操作符

## new 操作符的行为

一般来说, `new`操作符用于创建一个给定构造函数的实例对象

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 函数原型上的方法
Person.prototype.sayName = function () {
  console.log(this.name);
};
// 函数原型上的属性
Person.prototype.sex = '男';

// 构造函数创建的实例
const personInstance = new Person(' Tony', 30);

console.log(personInstance); // Person { name: ' Tony', age: 30 }
personInstance.sayName(); // Tony
console.log(personInstance.sex); // 男
```

上面的输出表明:

- 实例 `personInstance` 可以访问到构造函数中的属性 `name` `age`
- 实例 `personInstance` 可以访问到构造函数原型链中的方法 `sayName` 和属性 `sex`

结合原型链的知识, 有如下的关系:

```js
console.log(Person.prototype.constructor === Person); // true
console.log(personInstance.__proto__ === Person.prototype); //true
```

### 构造函数的返回值

- 返回值为基础类型或 `null`, 不会产生影响

返回值为基础类型

```js
function Test(name) {
  this.name = name;
  return 1;
}
const instance = new Test('xxx');
console.log(instance); // Test { name: 'xxx' }
console.log(instance.name); // xxx
```

返回值为 `null` (因为 `typeof null === 'object'`, 这里主要是跟返回普通对象的情况区分)

```js
function Test(name) {
  this.name = name;
  console.log(this); // Test { name: 'xxx' }
  return null;
}
const instance = new Test('xxx');
console.log(instance); // Test { name: 'xxx' }
console.log(instance.name); // xxx

console.log(instance.__proto__ === Test.prototype); // true
console.log(instance.__proto__ === Object.prototype); // false
```

- 返回值为普通对象, 构造函数就返回这个对象, 下面的例子中, `instance` 其实就是构造函数返回的对象 `{ age: 30 }`, 所以表达式 `instance.__proto__ === Object.prototype` 为 `true`

```js
function Test(name) {
  this.name = name;
  console.log(this); // Test { name: 'xxx' }
  return { age: 30 };
}
const instance = new Test('xxx');
console.log(instance); // { age: 30 }
console.log(instance.name); // undefined

console.log(instance.__proto__ === Object.prototype); // true
```

## new 的过程做了那些事? ⭐️

1. 创建一个新的空对象 `obj`

2. 然后将空对象 `obj` 的隐式原型 `__proto__` 指向构造函数的原型, 使得 `obj` 能访问构造函数原型上的属性或方法

3. 将构建函数中的 `this` 绑定到新建的对象 `obj` 上

4. 根据构建函数返回类型作判断，如果是基础类型或 `null` 则被忽略，如果是返回其他对象，需要正常处理

## 实现 new 操作符 ⭐️

```js
function myNew(Func, ...args) {
  // 1.创建一个新对象
  const obj = {};
  // 2.新对象原型指向构造函数原型对象
  // obj.__proto__ = Func.prototype;
  Object.setPrototypeOf(obj, Func.prototype);
  // 3.将构建函数的this指向新对象
  let returnVal = Func.apply(obj, args);
  // 4.根据返回值判断
  return returnVal instanceof Object ? returnVal : obj;
}
```

或者

```js
function myNew() {
  var obj = {};
  // 获取构造函数, shift 修改了原 arguments, 达到 ES6 剩余参数的效果
  var Func = Array.prototype.shift.call(arguments);

  obj.__proto__ = Func.prototype;

  var returnVal = Func.apply(obj, arguments);

  return typeof returnVal === 'object' && returnVal !== null ? returnVal : obj;
}
```

## 测试用例

### 普通情况

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
let personInstance = myNew(Person, 'Tony', 30);
console.log(personInstance); // Person { name: 'Tony', age: 30 }
console.log(personInstance.__proto__.constructor === Person); // true
console.log(personInstance.__proto__ === Person.prototype); // true
```

### 返回值为基础类型或`null`

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  return true;
}
let personInstance = myNew(Person, 'Tony', 30);
console.log(personInstance); // Person { name: 'Tony', age: 30 }
console.log(personInstance.__proto__.constructor === Person); // true
console.log(personInstance.__proto__ === Person.prototype); // true
```

### 返回值为其他对象

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  return { money: 0 };
}
let personInstance = myNew(Person, 'Tony', 30);
console.log(personInstance); // { money: 0 }
console.log(personInstance.__proto__.constructor === Person); // false
console.log(personInstance.__proto__ === Person.prototype); // false
console.log(personInstance.__proto__ === Object.prototype); // true
```
