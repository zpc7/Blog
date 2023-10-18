# 深浅克隆

## 浅克隆

浅克隆是指创建一个新对象， 该对象具有与原始对象相同的属性和值。 但与深克隆不同， 如果原始对象的属性值是对象引用， 浅克隆将复制这个引用， 而不是创建一个新的对象。 

### 使用扩展运算符

```js
const originalObject = {
  a: 1,
  b: {
    c: 2
  }
};
const shallowClone = {
  ...originalObject
};

// 修改浅克隆后的对象中的非引用属性不会影响原始对象
shallowClone.a = 100;
shallowClone.b.c = 200;

console.log(originalObject); // { a: 1, b: { c: 200 } }
console.log(shallowClone); // { a: 100, b: { c: 200 } }
```

### 使用 Object.assign()方法

```js
const originalObject = {
  a: 1,
  b: {
    c: 2
  }
};
const shallowClone = Object.assign({}, originalObject);

// 修改浅克隆后的对象中的非引用属性不会影响原始对象
shallowClone.a = 100;
shallowClone.b.c = 200;

console.log(originalObject); // { a: 1, b: { c: 200 } }
console.log(shallowClone); // { a: 100, b: { c: 200 } }
```

数组的浅克隆可以使用 `Array.prototype.slice()` 或 `Array.prototype.concat()`

## 深克隆

### 递归

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    const copy = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepClone(obj[key]);
      }
    }
    return copy;
  }
  // 需要处理其他类型的数据
  // ...
}
```

弊端: 无法处理循环引用

### 递归-解决循环引用

```js:line-numbers {2-3,18-21,24-25}
function deepClone(obj) {
  // 使用 weakMap 解决循环引用问题
  const cache = new WeakMap(); 

  function _deepClone(val) {
    if (val === null || typeof val !== "object") {
      return val;
    }

    if (val instanceof Date) {
      return new Date(val);
    }

    if (val instanceof RegExp) {
      return new RegExp(val);
    }

    // 如果已经存在缓存中，直接返回
    if (cache.has(val)) {
      return cache.get(val);
    }

    const result = Array.isArray(val) ? [] : {};
    // 缓存结果
    cache.set(val, result);

    for (let key in val) {
      if (val.hasOwnProperty(key)) {
        result[key] = _deepClone(val[key]);
      }
    }

    return result;
  }

  return _deepClone(obj); 
}

// 测试数据
const test = {
  arr: [1, 2, 3], 
  a: 4, 
}; 

test.self = test; 
test.arr.push(test); 

// 测试断言
const newTest = deepClone(test); 
console.log(newTest.arr !== test.arr); // true
console.log(newTest.self !== test.self); // true
console.log(newTest.arr[3] !== test); // true
console.log(newTest.arr[3] === newTest); // true

```

初次调用 `deepClone` 时，参数会创建一个WeakMap结构的对象，这种数据结构的特点之一是，存储键值对中的 `健` 必须是 `对象` 类型。

* 如果待拷贝对象中有属性也为对象时，则将该待拷贝对象存入weakMap中，此时的健值和健名都是对该待拷贝对象的引用
* 然后递归调用该函数
* 传入了上一个待拷贝对象的对象属性的引用和存储了上一个待拷贝对象引用的weakMap，因为如果是循环引用产生的闭环，那么这两个引用是指向相同的对象的，因此会进入if(cache.has())语句内，然后return，退出函数，所以不会一直递归进栈，以此防止栈溢出

### JSON.parse(JSON.stringify())

序列化和反序列化

```js
const originalObject = {
  key: 'value',
  nestedObject: {
    nestedKey: 'nestedValue'
  }
};

const clonedObject = JSON.parse(JSON.stringify(originalObject));
```

这种方法的弊端:
* 无法处理包含函数、 undefined、 Symbol、 Set、 Map 等特殊值的属性
* 无法处理对象中的循环引用（对象之间相互引用， 导致无限循环）

#### MessageChannel

`MessageChannel` 的消息在发送和接收的过程需要序列化和反序列化。 利用这个特性， 我们可以实现深拷贝

```js
function deepClone(obj) {
  return new Promise((resolve, reject) => {
    try {
      const { port1, port2 } = new MessageChannel();

      port2.onmessage = function (e) {
        resolve(e.data);
      };
      port1.postMessage(obj);
    } catch (e) {
      reject(e);
    }
  });
}

const oldObj = { a: { b: 1 } };

deepClone(oldObj).then((newObj) => {
  console.log(oldObj === newObj); // false
  newObj.a.b = 2;
  console.log(oldObj.a.b); // 1
});
```

与 `JSON.parse(JSON.stringify())` 一样, 当消息包含函数、 Symbol等不可序列化的值时， 就会报无法克隆的DOM异常

```js
deepClone({ fn: () => {} }).catch((e) => {
  console.log(e); // DOMException...could not be cloned
});
```

限制: 这是一个 `HTML DOM API` , 参考: [MDN MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

### structuredClone

```js
// Create an object with a value and a circular reference to itself.
const original = {
  name: "MDN"
};
original.itself = original;

// Clone it
const clone = structuredClone(original);

console.log(clone !== original); // true
console.log(clone.name === "MDN"); // true
console.log(clone.itself === clone); // true
```

限制: 这是一个 `HTML DOM API` , 参考: [MDN structuredClone](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)
