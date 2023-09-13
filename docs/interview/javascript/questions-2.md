---
outline: 2
---

# JS 代码输出(二)

> 转自 [javascript-questions](https://github.com/lydiahallie/javascript-questions) 56K star的项目


## 81. 输出什么？

```javascript
function sayHi(name) {
  return `Hi there, ${name}`
}

console.log(sayHi())
```

- A: `Hi there, `
- B: `Hi there, undefined`
- C: `Hi there, null`
- D:  `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

默认情况下，如果不给函数传参，参数的值将为`undefined`。 上述情况，我们没有给参数`name`传值。 `name`等于`undefined`，并被打印。

在 ES6 中，我们可以使用默认参数覆盖此默认的`undefined`值。 例如：

`function sayHi（name =“Lydia”）{...}`

在这种情况下，如果我们没有传递值或者如果我们传递`undefined`，`name`总是等于字符串`Lydia`

</p>
</details>

---

## 82. 输出什么？

```javascript
var status = "😎"

setTimeout(() => {
  const status = "😍"

  const data = {
    status: "🥑",
    getStatus() {
      return this.status
    }
  }

  console.log(data.getStatus())
  console.log(data.getStatus.call(this))
}, 0)
```

- A: `"🥑"` and `"😍"`
- B: `"🥑"` and `"😎"`
- C: `"😍"` and `"😎"`
- D: `"😎"` and `"😎"`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

`this`关键字的指向取决于使用它的位置。 在**函数**中，比如`getStatus`，`this`指向的是调用它的对象，上述例子中`data`对象调用了`getStatus`，因此`this`指向的就是`data`对象。 当我们打印`this.status`时，`data`对象的`status`属性被打印，即`"🥑"`。

使用`call`方法，可以更改`this`指向的对象。`data.getStatus.call(this)`是将`this`的指向由`data`对象更改为全局对象。在全局对象上，有一个名为`status`的变量，其值为`”😎“`。 因此打印`this.status`时，会打印`“😎”`。
</p>
</details>

---

## 83. 输出什么？

```javascript
const person = {
  name: "Lydia",
  age: 21
}

let city = person.city
city = "Amsterdam"

console.log(person)
```

- A: `{ name: "Lydia", age: 21 }`
- B: `{ name: "Lydia", age: 21, city: "Amsterdam" }`
- C: `{ name: "Lydia", age: 21, city: undefined }`
- D: `"Amsterdam"`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

我们将变量`city`设置为等于`person`对象上名为`city`的属性的值。 这个对象上没有名为`city`的属性，因此变量`city`的值为`undefined`。

请注意，我们没有引用`person`对象本身，只是将变量`city`设置为等于`person`对象上`city`属性的当前值。

然后，我们将`city`设置为等于字符串`“Amsterdam”`。 这不会更改 person 对象：没有对该对象的引用。

因此打印`person`对象时，会返回未修改的对象。

</p>
</details>

---

## 84. 输出什么？

```javascript
function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you're too young."
  } else {
    const message = "Yay! You're old enough!"
  }

  return message
}

console.log(checkAge(21))
```

- A: `"Sorry, you're too young."`
- B: `"Yay! You're old enough!"`
- C: `ReferenceError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

`const`和`let`声明的变量是具有**块级作用域**的，块是大括号（`{}`）之间的任何东西，即上述情况`if / else`语句的花括号。 由于块级作用域，我们无法在声明的块之外引用变量，因此抛出`ReferenceError`。

</p>
</details>

---

## 85. 什么样的信息将被打印？

```javascript
fetch('https://www.website.com/api/user/1')
  .then(res => res.json())
  .then(res => console.log(res))
```

- A: `fetch`方法的结果
- B: 第二次调用`fetch`方法的结果
- C: 前一个`.then()`中回调方法返回的结果
- D: 总是`undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

第二个`.then`中`res`的值等于前一个`.then`中的回调函数返回的值。 你可以像这样继续链接`.then`，将值传递给下一个处理程序。

</p>
</details>

---

## 86. 哪个选项是将`hasName`设置为`true`的方法，前提是不能将`true`作为参数传递？

```javascript
function getName(name) {
  const hasName = //
}
```

- A: `!!name`
- B: `name`
- C: `new Boolean(name)`
- D: `name.length`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

使用逻辑非运算符`!`，将返回一个布尔值，使用`!! name`，我们可以确定`name`的值是真的还是假的。 如果`name`是真实的，那么`!name`返回`false`。 `!false`返回`true`。

通过将`hasName`设置为`name`，可以将`hasName`设置为等于传递给`getName`函数的值，而不是布尔值`true`。

`new Boolean（true）`返回一个对象包装器，而不是布尔值本身。

`name.length`返回传递的参数的长度，而不是布尔值`true`。

</p>
</details>

## 87. 输出什么？

```javascript
console.log("I want pizza"[0])
```

- A: `"""`
- B: `"I"`
- C: `SyntaxError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

可以使用方括号表示法获取字符串中特定索引的字符，字符串中的第一个字符具有索引 0，依此类推。 在这种情况下，我们想要得到索引为 0 的元素，字符`'I'`被记录。

请注意，IE7 及更低版本不支持此方法。 在这种情况下，应该使用`.charAt（）`

</p>
</details>

---

## 88. 输出什么？

```javascript
function sum(num1, num2 = num1) {
  console.log(num1 + num2)
}

sum(10)
```

- A: `NaN`
- B: `20`
- C: `ReferenceError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

您可以将默认参数的值设置为函数的另一个参数，只要另一个参数定义在其之前即可。 我们将值`10`传递给`sum`函数。 如果`sum`函数只接收 1 个参数，则意味着没有传递`num2`的值，这种情况下，`num1`的值等于传递的值`10`。 `num2`的默认值是`num1`的值，即`10`。 ```num1 + num2```返回`20`。

如果您尝试将默认参数的值设置为后面定义的参数，则可能导致参数的值尚未初始化，从而引发错误。比如：
```js
function test(m = n, n = 2) {
	console.log(m, n)
}
test() // Uncaught ReferenceError: Cannot access 'n' before initialization
test(3) // 3 2
test(3, 4) // 3 4
```

</p>
</details>

---

## 89. 输出什么？

```javascript
// module.js 
export default () => "Hello world"
export const name = "Lydia"

// index.js 
import * as data from "./module"

console.log(data)
```

- A: `{ default: function default(), name: "Lydia" }`
- B: `{ default: function default() }`
- C: `{ default: "Hello world", name: "Lydia" }`
- D: Global object of `module.js`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

使用`import * as name`语法，我们将`module.js`文件中所有`export`导入到`index.js`文件中，并且创建了一个名为`data`的新对象。 在`module.js`文件中，有两个导出：默认导出和命名导出。 默认导出是一个返回字符串 “Hello World” 的函数，命名导出是一个名为`name`的变量，其值为字符串`“Lydia”`。

`data`对象具有默认导出的`default`属性，其他属性具有指定 exports 的名称及其对应的值。

</p>
</details>

---

## 90. 输出什么？

```javascript
class Person {
  constructor(name) {
    this.name = name
  }
}

const member = new Person("John")
console.log(typeof member)
```

- A: `"class"`
- B: `"function"`
- C: `"object"`
- D: `"string"`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

类是构造函数的语法糖，如果用构造函数的方式来重写`Person`类则将是：

```javascript
function Person() {
  this.name = name
}
```

通过`new`来调用构造函数，将会生成构造函数`Person`的实例，对实例执行`typeof`关键字将返回`"object"`，上述情况打印出`"object"`。

</p>
</details>

---

## 91. 输出什么？

```javascript
let newList = [1, 2, 3].push(4)

console.log(newList.push(5))
```

- A: `[1, 2, 3, 4, 5]`
- B: `[1, 2, 3, 5]`
- C: `[1, 2, 3, 4]`
- D: `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

`.push`方法返回数组的长度，而不是数组本身！ 通过将`newList`设置为`[1,2,3].push(4)`，实际上`newList`等于数组的新长度：`4`。

然后，尝试在`newList`上使用`.push`方法。 由于`newList`是数值`4`，抛出 TypeError。

</p>
</details>

---

## 92. 输出什么？

```javascript
function giveLydiaPizza() {
  return "Here is pizza!"
}

const giveLydiaChocolate = () => "Here's chocolate... now go hit the gym already."

console.log(giveLydiaPizza.prototype)
console.log(giveLydiaChocolate.prototype)
```

- A: `{ constructor: ...}` `{ constructor: ...}` 
- B: `{}` `{ constructor: ...}` 
- C: `{ constructor: ...}` `{}`
- D: `{ constructor: ...}` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

常规函数，例如`giveLydiaPizza`函数，有一个`prototype`属性，它是一个带有`constructor`属性的对象（原型对象）。 然而，箭头函数，例如`giveLydiaChocolate`函数，没有这个`prototype`属性。 尝试使用`giveLydiaChocolate.prototype`访问`prototype`属性时会返回`undefined`。

</p>
</details>

---

## 93. 输出什么？

```javascript
const person = {
  name: "Lydia",
  age: 21
}

for (const [x, y] of Object.entries(person)) {
  console.log(x, y)
}
```

- A: `name` `Lydia` and `age` `21`
- B: `["name", "Lydia"]` and `["age", 21]` 
- C: `["name", "age"]` and `undefined`
- D: `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A
`Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组，上述情况返回一个二维数组，数组每个元素是一个包含键和值的数组：

`[['name'，'Lydia']，['age'，21]]`

使用`for-of`循环，我们可以迭代数组中的每个元素，上述情况是子数组。 我们可以使用`const [x，y]`在`for-of`循环中解构子数组。 `x`等于子数组中的第一个元素，`y`等于子数组中的第二个元素。

第一个子阵列是`[“name”，“Lydia”]`，其中`x`等于`name`，而`y`等于`Lydia`。
第二个子阵列是`[“age”，21]`，其中`x`等于`age`，而`y`等于`21`。

</p>
</details>

---

## 94. 输出什么？

```javascript
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```

- A: `["banana", "apple", "pear", "orange"]`
- B: `[["banana", "apple"], "pear", "orange"]` 
- C: `["banana", "apple", ["pear"], "orange"]`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

`... args`是剩余参数，剩余参数的值是一个包含所有剩余参数的数组，**并且只能作为最后一个参数**。上述示例中，剩余参数是第二个参数，这是不可能的，并会抛出语法错误。

```javascript
function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```

上述例子是有效的，将会返回数组：`[ 'banana', 'apple', 'orange', 'pear' ]`
</p>
</details>

---

## <a name=20190817></a>95. 输出什么？

```javascript
function nums(a, b) {
  if
  (a > b)
  console.log('a is bigger')
  else 
  console.log('b is bigger')
  return 
  a + b
}

console.log(nums(4, 2))
console.log(nums(1, 2))
```

- A: `a is bigger`, `6` and `b is bigger`, `3`
- B: `a is bigger`, `undefined` and `b is bigger`, `undefined`
- C: `undefined` and `undefined`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B


在 JavaScript 中，我们不必显式地编写分号 (`;`)，但是 JavaScript 引擎仍然在语句之后自动添加分号。这称为**自动分号插入**。例如，一个语句可以是变量，或者像`throw`、`return`、`break`这样的关键字。

在这里，我们在新的一行上写了一个`return`语句和另一个值`a + b `。然而，由于它是一个新行，引擎并不知道它实际上是我们想要返回的值。相反，它会在`return`后面自动添加分号。你可以这样看：

```javascript
  return;
  a + b
```

这意味着永远不会到达`a + b`，因为函数在`return`关键字之后停止运行。如果没有返回值，就像这里，函数返回`undefined`。注意，在`if/else`语句之后没有自动插入！

</p>
</details>

---

## 96. 输出什么？

```javascript
class Person {
  constructor() {
    this.name = "Lydia"
  }
}

Person = class AnotherPerson {
  constructor() {
    this.name = "Sarah"
  }
}

const member = new Person()
console.log(member.name)
```

- A: `"Lydia"`
- B: `"Sarah"`
- C: `Error: cannot redeclare Person`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B


我们可以将类设置为等于其他类/函数构造函数。 在这种情况下，我们将`Person`设置为`AnotherPerson`。 这个构造函数的名字是`Sarah`，所以新的`Person`实例`member`上的 name 属性是`Sarah`。


</p>
</details>

---

## 97. 输出什么？

```javascript
const info = {
  [Symbol('a')]: 'b'
}

console.log(info)
console.log(Object.keys(info))
```

- A: `{Symbol('a'): 'b'}` and `["{Symbol('a')"]`
- B: `{}` and `[]`
- C: `{ a: "b" }` and `["a"]`
- D: `{Symbol('a'): 'b'}` and `[]`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D


`Symbol`类型是不可枚举的。`Object.keys`方法返回对象上的所有可枚举的键属性。`Symbol`类型是不可见的，并返回一个空数组。 记录整个对象时，所有属性都是可见的，甚至是不可枚举的属性。

这是`Symbol`的众多特性之一：除了表示完全唯一的值（防止对象意外名称冲突，例如当使用 2 个想要向同一对象添加属性的库时），您还可以`隐藏`这种方式对象的属性（尽管不完全。你仍然可以使用`Object.getOwnPropertySymbols()`方法访问 `Symbol`。

</p>
</details>

---

## 98. 输出什么？

```javascript
const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }

const list = [1, 2, 3, 4]
const user = { name: "Lydia", age: 21 }

console.log(getList(list))
console.log(getUser(user))
```

- A: `[1, [2, 3, 4]]` and `SyntaxError`
- B: `[1, [2, 3, 4]]` and `{ name: "Lydia", age: 21 }`
- C: `[1, 2, 3, 4]` and `{ name: "Lydia", age: 21 }`
- D: `Error` and `{ name: "Lydia", age: 21 }`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

`getList`函数接收一个数组作为其参数。 在`getList`函数的括号之间，我们立即解构这个数组。 您可以将其视为：

 `[x, ...y] = [1, 2, 3, 4]`


使用剩余的参数`... y`，我们将所有剩余参数放在一个数组中。 在这种情况下，其余的参数是`2`，`3`和`4`。 `y`的值是一个数组，包含所有其余参数。 在这种情况下，`x`的值等于`1`，所以当我们打印`[x，y]`时，会打印`[1，[2,3,4]]`。

 `getUser`函数接收一个对象。对于箭头函数，如果只返回一个值，我们不必编写花括号。但是，如果您想从一个箭头函数返回一个对象，您必须将它写在圆括号之间，否则两个花括号之间的所有内容都将被解释为一个块语句！在这种情况下，花括号之间的代码不是有效的 JavaScript 代码，因此会抛出 SyntaxError。

以下函数将返回一个对象：

`const getUser = user => ({ name: user.name, age: user.age })`

</p>
</details>

---

## 99. 输出什么？

```javascript
const name = "Lydia"

console.log(name())
```

- A: `SyntaxError`
- B: `ReferenceError`
- C: `TypeError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C


变量`name`保存字符串的值，该字符串不是函数，因此无法调用。

当值不是预期类型时，会抛出`TypeErrors`。 JavaScript 期望`name`是一个函数，因为我们试图调用它。 但它是一个字符串，因此抛出`TypeError`：`name is not a function`

当你编写了一些非有效的 JavaScript 时，会抛出语法错误，例如当你把`return`这个词写成`retrun`时。
当 JavaScript 无法找到您尝试访问的值的引用时，抛出`ReferenceErrors`。

</p>
</details>

---

## 100. 输出什么？

```javascript
// 🎉✨ This is my 100th question! ✨🎉

const output = `${[] && 'Im'}possible!
You should${'' && `n't`} see a therapist after so much JavaScript lol`
```

- A: `possible! You should see a therapist after so much JavaScript lol`
- B: `Impossible! You should see a therapist after so much JavaScript lol`
- C: `possible! You shouldn't see a therapist after so much JavaScript lol`
- D: `Impossible! You shouldn't see a therapist after so much JavaScript lol`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B


`[]`是一个真值。 使用`&&`运算符，如果左侧值是真值，则返回右侧值。 在这种情况下，左侧值`[]`是一个真值，所以返回`Im`。

`""`是一个假值。 如果左侧值是假的，则不返回任何内容。 `n't`不会被退回。

</p>
</details>

---

## 101.输出什么？

```javascript
const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)
```

- A: `false` `null` `[]`
- B: `null` `""` `true`
- C: `{}` `""` `[]`
- D: `null` `null` `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

使用`||`运算符，我们可以返回第一个真值。 如果所有值都是假值，则返回最后一个值。

`（false || {} || null）`：空对象`{}`是一个真值。 这是第一个（也是唯一的）真值，它将被返回。`one`等于`{}`。

`（null || false ||“”）`：所有值都是假值。 这意味着返回传递的值`""`。 `two`等于`""`。

`（[] || 0 ||“”）`：空数组`[]`是一个真值。 这是第一个返回的真值。 `three`等于`[]`。

</p>
</details>

---

## 102. 依次输出什么？

```javascript
const myPromise = () => Promise.resolve('I have resolved!')

function firstFunction() {
  myPromise().then(res => console.log(res))
  console.log('second')
}

async function secondFunction() {
  console.log(await myPromise())
  console.log('second')
}

firstFunction()
secondFunction()
```

- A: `I have resolved!`, `second` and `I have resolved!`, `second`
- B: `second`, `I have resolved!` and `second`, `I have resolved!`
- C: `I have resolved!`, `second` and `second`, `I have resolved!`
- D: `second`, `I have resolved!` and `I have resolved!`, `second`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D


有了 promise，我们通常会说：当我想要调用某个方法，但是由于它可能需要一段时间，因此暂时将它放在一边。只有当某个值被 resolved/rejected，并且执行栈为空时才使用这个值。

我们可以在`async`函数中通过`.then`和`await`关键字获得该值。 尽管我们可以通过`.then`和`await`获得 promise 的价值，但是它们的工作方式有所不同。

在 `firstFunction`中，当运行到`myPromise`方法时我们将其放在一边，即 promise 进入微任务队列，其他后面的代码（`console.log('second')`）照常运行，因此`second`被打印出，`firstFunction`方法到此执行完毕，执行栈中宏任务队列被清空，此时开始执行微任务队列中的任务，`I have resolved`被打印出。

在`secondFunction`方法中，我们通过`await`关键字，暂停了后面代码的执行，直到异步函数的值被解析才开始后面代码的执行。这意味着，它会等着直到 `myPromise` 以值`I have resolved`被解决之后，下一行`second`才开始执行。


</p>
</details>

---

## 103. 输出什么？

```javascript
const set = new Set()

set.add(1)
set.add("Lydia")
set.add({ name: "Lydia" })

for (let item of set) {
  console.log(item + 2)
}
```

- A: `3`, `NaN`, `NaN`
- B: `3`, `7`, `NaN`
- C: `3`, `Lydia2`, `[Object object]2`
- D: `"12"`, `Lydia2`, `[Object object]2`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

“+” 运算符不仅用于添加数值，还可以使用它来连接字符串。 每当 JavaScript 引擎发现一个或多个值不是数字时，就会将数字强制为字符串。 

第一个是数字 1。 1 + 2 返回数字 3。

但是，第二个是字符串 “Lydia”。 “Lydia” 是一个字符串，2 是一个数字：2 被强制转换为字符串。 “Lydia” 和 “2” 被连接起来，产生字符串 “Lydia2”。

`{name：“ Lydia”}`是一个对象。 数字和对象都不是字符串，因此将二者都字符串化。 每当我们对常规对象进行字符串化时，它就会变成`[Object object]`。 与 “2” 串联的 “ [Object object]” 成为 “[Object object]2”。

</p>
</details>

---

## 104. 结果是什么？

```javascript
Promise.resolve(5)
```

- A: `5`
- B: `Promise {<pending>: 5}`
- C: `Promise {<fulfilled>: 5}`
- D: `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

我们可以将我们想要的任何类型的值传递`Promise.resolve`，无论是否`promise`。 该方法本身返回带有已解析值的`Promise` (`<fulfilled>`)。 如果您传递常规函数，它将是具有常规值的已解决`promise`。 如果你通过了 promise，它将是一个已经 resolved 的且带有传的值的 promise。

上述情况，我们传了数字 5，因此返回一个 resolved 状态的 promise，resolve 值为`5`

</p>
</details>


## 105. 输出什么？

```javascript
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Not the same!")
  } else {
    console.log("They are the same!")
  }
}

const person = { name: "Lydia" }

compareMembers(person)
```

- A: `Not the same!`
- B: `They are the same!`
- C: `ReferenceError`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

对象通过引用传递。 当我们检查对象的严格相等性（===）时，我们正在比较它们的引用。

我们将 “person2” 的默认值设置为 “person” 对象，并将 “person” 对象作为 “person1” 的值传递。

这意味着两个值都引用内存中的同一位置，因此它们是相等的。

运行 “ else” 语句中的代码块，并记录`They are the same!` 。

</p>
</details>

---

## 106. 输出什么？


```javascript
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false,
}

const colors = ["pink", "red", "blue"]

console.log(colorConfig.colors[1])
```

- A: `true`
- B: `false`
- C: `undefined`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

在 JavaScript 中，我们有两种访问对象属性的方法：括号表示法或点表示法。 在此示例中，我们使用点表示法（`colorConfig.colors`）代替括号表示法（`colorConfig [“ colors”]`）。

使用点表示法，JavaScript 会尝试使用该确切名称在对象上查找属性。 在此示例中，JavaScript 尝试在 colorConfig 对象上找到名为 colors 的属性。 没有名为 “colors” 的属性，因此返回 “undefined”。
然后，我们尝试使用`[1]`访问第一个元素的值。 我们无法对未定义的值执行此操作，因此会抛出`Cannot read property '1' of undefined`。

JavaScript 解释（或取消装箱）语句。 当我们使用方括号表示法时，它会看到第一个左方括号`[`并一直进行下去，直到找到右方括号`]`。 只有这样，它才会评估该语句。 如果我们使用了 colorConfig [colors [1]]，它将返回 colorConfig 对象上 red 属性的值。


</p>
</details>

---

## 107. 输出什么？

```javascript
console.log('❤️' === '❤️')
```

- A: `true`
- B: `false`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

在内部，表情符号是 unicode。 heat 表情符号的 unicode 是`“ U + 2764 U + FE0F”`。 对于相同的表情符号，它们总是相同的，因此我们将两个相等的字符串相互比较，这将返回 true。

</p>
</details>

---

## 108. 哪些方法修改了原数组？


```javascript
const emojis = ['✨', '🥑', '😍']

emojis.map(x => x + '✨')
emojis.filter(x => x !== '🥑')
emojis.find(x => x !== '🥑')
emojis.reduce((acc, cur) => acc + '✨')
emojis.slice(1, 2, '✨') 
emojis.splice(1, 2, '✨')
```

- A: `All of them`
- B: `map` `reduce` `slice` `splice`
- C: `map` `slice` `splice` 
- D: `splice`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

使用`splice`方法，我们通过删除，替换或添加元素来修改原始数组。 在这种情况下，我们从索引 1 中删除了 2 个元素（我们删除了`'🥑'`和`'😍'`），同时添加了✨emoji 表情。

`map`，`filter`和`slice`返回一个新数组，`find`返回一个元素，而`reduce`返回一个减小的值。

</p>
</details>

---

## <a name=20191009></a>109. 输出什么？

```javascript
const food = ['🍕', '🍫', '🥑', '🍔']
const info = { favoriteFood: food[0] }

info.favoriteFood = '🍝'

console.log(food)
```

- A: `['🍕', '🍫', '🥑', '🍔']`
- B: `['🍝', '🍫', '🥑', '🍔']`
- C: `['🍝', '🍕', '🍫', '🥑', '🍔']` 
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

我们将`info`对象上的`favoriteFood`属性的值设置为披萨表情符号 “🍕” 的字符串。字符串是原始数据类型。在 JavaScript 中，原始数据类型通过值起作用

在这种情况下，我们将`info`对象上的`favoriteFood`属性的值设置为等于`food`数组中的第一个元素的值，字符串为披萨表情符号（`'🍕'` ）。字符串是原始数据类型，并且通过值进行交互，我们更改`info`对象上`favoriteFood`属性的值。 food 数组没有改变，因为 favoriteFood 的值只是该数组中第一个元素的值的复制，并且与该元素上的元素没有相同的内存引用食物`[0]`。当我们记录食物时，它仍然是原始数组`['🍕'，'🍫'，'🥑'，'🍔']`。

</p>
</details>

---

## 110. 这个函数干了什么？

```javascript
JSON.parse()
```

- A: Parses JSON to a JavaScript value
- B: Parses a JavaScript object to JSON
- C: Parses any JavaScript value to JSON
- D: Parses JSON to a JavaScript object only

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

使用`JSON.parse()`方法，我们可以将 JSON 字符串解析为 JavaScript 值。

```javascript
// 将数字字符串化为有效的 JSON，然后将 JSON 字符串解析为 JavaScript 值：
const jsonNumber = JSON.stringify(4) // '4'
JSON.parse(jsonNumber) // 4

// 将数组值字符串化为有效的 JSON，然后将 JSON 字符串解析为 JavaScript 值：
const jsonArray = JSON.stringify([1, 2, 3]) // '[1, 2, 3]'
JSON.parse(jsonArray) // [1, 2, 3]

// 将对象字符串化为有效的 JSON，然后将 JSON 字符串解析为 JavaScript 值：
const jsonArray = JSON.stringify({ name: "Lydia" }) // '{"name":"Lydia"}'
JSON.parse(jsonArray) // { name: 'Lydia' }
```

</p>
</details>

---

## 111. 输出什么？

```javascript
let name = 'Lydia'

function getName() {
  console.log(name)
  let name = 'Sarah'
}

getName()
```

- A: Lydia
- B: Sarah
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D 

每个函数都有其自己的执行上下文。 `getName`函数首先在其自身的上下文（范围）内查找，以查看其是否包含我们尝试访问的变量`name`。 上述情况，`getName`函数包含其自己的`name`变量：我们用`let`关键字和`Sarah`的值声明变量`name`。

带有`let`关键字（和`const`）的变量被提升，但是与`var`不同，它不会被*** 初始化***。 在我们声明（初始化）它们之前，无法访问它们。 这称为 “暂时性死区”。 当我们尝试在声明变量之前访问变量时，JavaScript 会抛出`ReferenceError: Cannot access 'name' before initialization`。

如果我们不在`getName`函数中声明`name`变量，则 javascript 引擎会查看原型链。会找到其外部作用域有一个名为`name`的变量，其值为`Lydia`。 在这种情况下，它将打印`Lydia`：

```javascript
let name = 'Lydia'

function getName() {
  console.log(name)
}

getName() // Lydia
```

</p>
</details>

---

## 112. 输出什么？

```javascript
function* generatorOne() {
  yield ['a', 'b', 'c'];
}

function* generatorTwo() {
  yield* ['a', 'b', 'c'];
}

const one = generatorOne()
const two = generatorTwo()

console.log(one.next().value)
console.log(two.next().value)
```

- A: `a` and `a`
- B: `a` and `undefined`
- C: `['a', 'b', 'c']` and `a`
- D: `a` and `['a', 'b', 'c']`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

通过 `yield` 关键字，我们在 `Generator` 函数里执行`yield`表达式。通过 `yield*` 关键字，我们可以在一个`Generator` 函数里面执行（`yield`表达式）另一个 `Generator` 函数，或可遍历的对象 (如数组).

在函数 `generatorOne` 中，我们通过 `yield` 关键字 yield 了一个完整的数组 `['a', 'b', 'c']`。函数`one`通过`next`方法返回的对象的`value` 属性的值 (`one.next().value`) 等价于数组 `['a', 'b', 'c']`.

```javascript
console.log(one.next().value) // ['a', 'b', 'c']
console.log(one.next().value) // undefined
```

在函数 `generatorTwo` 中，我们使用 `yield*` 关键字。就相当于函数`two`第一个`yield`的值，等价于在迭代器中第一个 `yield` 的值。数组`['a', 'b', 'c']`就是这个迭代器。第一个 `yield` 的值就是 `a`，所以我们第一次调用 `two.next().value`时，就返回`a`。

```javascript
console.log(two.next().value) // 'a'
console.log(two.next().value) // 'b'
console.log(two.next().value) // 'c'
console.log(two.next().value) // undefined
```

</p>
</details>

---

## 113. 输出什么？

```javascript
console.log(`${(x => x)('I love')} to program`)
```

- A: `I love to program`
- B: `undefined to program`
- C: `${(x => x)('I love') to program`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

带有模板字面量的表达式首先被执行。相当于字符串会包含表达式，这个立即执行函数 `(x => x)('I love')` 返回的值。我们向箭头函数 `x => x` 传递 `'I love'` 作为参数。`x` 等价于返回的 `'I love'`。这就是结果 `I love to program`。

</p>
</details>

---

## 114. 将会发生什么？

```javascript
let config = {
  alert: setInterval(() => {
    console.log('Alert!')
  }, 1000)
}

config = null
```

- A: `setInterval` 的回调不会被调用
- B: `setInterval` 的回调被调用一次
- C: `setInterval` 的回调仍然会被每秒钟调用
- D: 我们从没调用过 `config.alert()`, config 为 `null`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

一般情况下当我们将对象赋值为 `null`，那些对象会被进行 _垃圾回收（garbage collected）_ 因为已经没有对这些对象的引用了。然而，`setInterval`的参数是一个箭头函数（所以上下文绑定到对象 `config` 了），回调函数仍然保留着对 `config`的引用。只要存在引用，对象就不会被垃圾回收。因为没有被垃圾回收，`setInterval` 的回调每 1000ms (1s) 会被调用一次。

</p>
</details>

---

## 115. 哪一个方法会返回 `'Hello world!'` ？

```javascript
const myMap = new Map()
const myFunc = () => 'greeting'

myMap.set(myFunc, 'Hello world!')

//1
myMap.get('greeting')
//2
myMap.get(myFunc)
//3
myMap.get(() => 'greeting')
```

- A: 1
- B: 2
- C: 2 and 3
- D: All of them

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

当通过 `set` 方法添加一个键值对，一个传递给 `set`方法的参数将会是键名，第二个参数将会是值。在这个 case 里，键名为 _函数_ `() => 'greeting'`，值为`'Hello world'`。 `myMap` 现在就是 `{ () => 'greeting' => 'Hello world!' }`。

1 是错的，因为键名不是 `'greeting'` 而是 `() => 'greeting'`。
3 是错的，因为我们给`get` 方法传递了一个新的函数。对象受 _引用_ 影响。函数也是对象，因此两个函数严格上并不等价，尽管他们相同：他们有两个不同的内存引用地址。

</p>
</details>

---

## 116. 输出什么？

```javascript
const person = {
  name: "Lydia",
  age: 21
}

const changeAge = (x = { ...person }) => x.age += 1
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1
  x.name = "Sarah"
}

changeAge(person)
changeAgeAndName()

console.log(person)
```

- A: `{name: "Sarah", age: 22}`
- B: `{name: "Sarah", age: 23}`
- C: `{name: "Lydia", age: 22}`
- D: `{name: "Lydia", age: 23}`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

函数 `changeAge` 和函数 `changeAgeAndName` 有着不同的参数，定义一个 _新_ 生成的对象 `{ ...person }`。这个对象有着所有 `person` 对象 中 k/v 值的副本。

首项，我们调用 `changeAge` 函数并传递 `person` 对象作为它的参数。这个函数对 `age` 属性进行加一操作。`person` 现在是 `{ name: "Lydia", age: 22 }`。

然后，我们调用函数 `changeAgeAndName` ，然而我们没有传递参数。取而代之，`x` 的值等价 _new_ 生成的对象：`{ ...person }`。因为它是一个新生成的对象，它并不会对对象 `person` 造成任何副作用。`person` 仍然等价于 `{ name: "Lydia", age: 22 }`。

</p>
</details>

---

## 117. 下面那个选项将会返回 `6`?

```javascript
function sumValues(x, y, z) {
	return x + y + z;
}
```

- A: `sumValues([...1, 2, 3])`
- B: `sumValues([...[1, 2, 3]])`
- C: `sumValues(...[1, 2, 3])`
- D: `sumValues([1, 2, 3])`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

通过展开操作符 `...`，我们可以 _暂开_ 单个可迭代的元素。函数 `sumValues` function 接收三个参数： `x`, `y` 和 `z`。`...[1, 2, 3]` 的执行结果为 `1, 2, 3`，将会传递给函数 `sumValues`。

</p>
</details>

---

## 118. 输出什么？

```javascript
let num = 1;
const list = ["🥳", "🤠", "🥰", "🤪"];

console.log(list[(num += 1)]);
```

- A: `🤠`
- B: `🥰`
- C: `SyntaxError`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

通过 `+=` 操作符，我们对值 `num` 进行加 `1` 操作。 `num` 有初始值 `1`，因此 `1 + 1` 的执行结果为 `2`。数组 `list` 的第二项为 🥰，`console.log(list[2])` 输出 🥰.

</p>
</details>

---

## 119. 输出什么？

```javascript
const person = {
	firstName: "Lydia",
	lastName: "Hallie",
	pet: {
		name: "Mara",
		breed: "Dutch Tulip Hound"
	},
	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}
};

console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());
```

- A: `undefined` `undefined` `undefined` `undefined`
- B: `Mara` `undefined` `Lydia Hallie` `ReferenceError`
- C: `Mara` `null` `Lydia Hallie` `null`
- D: `null` `ReferenceError` `null` `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

通过 ES10 或 TS3.7+[可选链操作符 `?.`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE)，我们不再需要显式检测更深层的嵌套值是否有效。如果我们尝试获取 `undefined` 或 `null` 的值 (_nullish_)，表达将会短路并返回 `undefined`.

`person.pet?.name`： `person` 有一个名为 `pet` 的属性： `person.pet` 不是 nullish。它有个名为 `name` 的属性，并返回字符串 `Mara`。
`person.pet?.family?.name`： `person` 有一个名为 `pet` 的属性： `person.pet` 不是 nullish. `pet` _并没有_ 一个名为 `family` 的属性，`person.pet.family` 是 nullish。表达式返回 `undefined`。
`person.getFullName?.()`： `person` 有一个名为 `getFullName` 的属性： `person.getFullName()` 不是 nullish 并可以被调用，返回字符串 `Lydia Hallie`。
`member.getLastName?.()`: 变量`member` 不存在，因此会抛出错误`ReferenceError`。

</p>
</details>

---

## 120. 输出什么？

```javascript
const groceries = ["banana", "apple", "peanuts"];

if (groceries.indexOf("banana")) {
	console.log("We have to buy bananas!");
} else {
	console.log(`We don't have to buy bananas!`);
}
```

- A: We have to buy bananas!
- B: We don't have to buy bananas
- C: `undefined`
- D: `1`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

我们传递了一个状态 `groceries.indexOf("banana")` 给 if 条件语句。`groceries.indexOf("banana")` 返回 `0`， 一个 falsy 的值。因为 if 条件语句的状态为 falsy，`else` 块区内的代码执行，并且 `We don't have to buy bananas!` 被输出。

</p>
</details>

---

## 121. 输出什么？

```javascript
const config = {
	languages: [],
	set language(lang) {
		return this.languages.push(lang);
	}
};

console.log(config.language);
```

- A: `function language(lang) { this.languages.push(lang }`
- B: `0`
- C: `[]`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

方法 `language` 是一个 `setter`。Setters 并不保存一个实际值，它们的使命在于 _修改_ 属性。当调用方法 `setter`， 返回 `undefined`。

</p>
</details>

---

## 122. 输出什么？

```javascript
const name = "Lydia Hallie";

console.log(!typeof name === "object");
console.log(!typeof name === "string");
```

- A: `false` `true`
- B: `true` `false`
- C: `false` `false`
- D: `true` `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

`typeof name` 返回 `"string"`。字符串 `"string"` 是一个 truthy 的值，因此 `!typeof name` 返回一个布尔值 `false`。 `false === "object"` 和 `false === "string"` 都返回 `false`。

（如果我们想检测一个值的类型，我们应该用 `!==` 而不是 `!typeof`）

</p>
</details>

---

## 123. 输出什么？

```javascript
const add = x => y => z => {
	console.log(x, y, z);
	return x + y + z;
};

add(4)(5)(6);
```

- A: `4` `5` `6`
- B: `6` `5` `4`
- C: `4` `function` `function`
- D: `undefined` `undefined` `6`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

函数 `add` 是一个返回 返回箭头函数的箭头函数 的箭头函数（still with me?）。第一个函数接收一个值为 `4` 的参数 `x`。我们调用第二个函数，它接收一个值为 `5` 的参数 `y`。然后我们调用第三个函数，它接收一个值为 `6` 的参数 `z`。当我们尝试在最后一个箭头函数中获取 `x`, `y` 和 `z` 的值，JS 引擎根据作用域链去找 `x` 和 `y` 的值。得到 `4` `5` `6`.

</p>
</details>

---

## 124. 输出什么？

```javascript
async function* range(start, end) {
	for (let i = start; i <= end; i++) {
		yield Promise.resolve(i);
	}
}

(async () => {
	const gen = range(1, 3);
	for await (const item of gen) {
		console.log(item);
	}
})();
```

- A: `Promise {1}` `Promise {2}` `Promise {3}`
- B: `Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}`
- C: `1` `2` `3`
- D: `undefined` `undefined` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

我们给 函数 range 传递： `Promise{1}`, `Promise{2}`, `Promise{3}`，Generator 函数 `range` 返回一个全是 async object promise 数组。我们将 async object 赋值给变量 `gen`，之后我们使用`for await ... of` 进行循环遍历。我们将返回的 Promise 实例赋值给 `item`： 第一个返回 `Promise{1}`， 第二个返回 `Promise{2}`，之后是 `Promise{3}`。因为我们正 _awaiting_ `item` 的值，resolved 状态的 promise，promise 数组的 resolved _值_ 以此为： `1`，`2`，`3`.

</p>
</details>

---

## 125. 输出什么？

```javascript
const myFunc = ({ x, y, z }) => {
	console.log(x, y, z);
};

myFunc(1, 2, 3);
```

- A: `1` `2` `3`
- B: `{1: 1}` `{2: 2}` `{3: 3}`
- C: `{ 1: undefined }` `undefined` `undefined`
- D: `undefined` `undefined` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

`myFunc` 期望接收一个包含 `x`, `y` 和 `z` 属性的对象作为它的参数。因为我们仅仅传递三个单独的数字值 (1, 2, 3) 而不是一个含有 `x`, `y` 和 `z` 属性的对象 ({x: 1, y: 2, z: 3})， `x`, `y` 和 `z` 有着各自的默认值 `undefined`.

</p>
</details>

---

## 126. 输出什么？

```javascript
function getFine(speed, amount) {
  const formattedSpeed = new Intl.NumberFormat(
    'en-US',
    { style: 'unit', unit: 'mile-per-hour' }
  ).format(speed)

  const formattedAmount = new Intl.NumberFormat(
    'en-US',
    { style: 'currency', currency: 'USD' }
  ).format(amount)

  return `The driver drove ${formattedSpeed} and has to pay ${formattedAmount}`
}

console.log(getFine(130, 300))
```

- A: The driver drove 130 and has to pay 300
- B: The driver drove 130 mph and has to pay \$300.00
- C: The driver drove undefined and has to pay undefined
- D: The driver drove 130.00 and has to pay 300.00

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

通过方法 `Intl.NumberFormat`，我们可以格式化任意区域的数字值。我们对数字值 `130` 进行 `mile-per-hour` 作为 `unit` 的 `en-US` 区域 格式化，结果为 `130 mph`。对数字值 `300` 进行 `USD` 作为 `currency` 的 `en-US` 区域格式化，结果为 `$300.00`.

</p>
</details>

---

## 127. 输出什么？

```javascript
const spookyItems = ["👻", "🎃", "🕸"];
({ item: spookyItems[3] } = { item: "💀" });

console.log(spookyItems);
```

- A: `["👻", "🎃", "🕸"]`
- B: `["👻", "🎃", "🕸", "💀"]`
- C: `["👻", "🎃", "🕸", { item: "💀" }]`
- D: `["👻", "🎃", "🕸", "[object Object]"]`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

通过解构对象们，我们可以从右手边的对象中拆出值，并且将拆出的值分配给左手边对象同名的属性。在这种情况下，我们将值 "💀" 分配给 `spookyItems[3]`。相当于我们正在篡改数组 `spookyItems`，我们给它添加了值 "💀"。当输出 `spookyItems` 时，结果为 `["👻", "🎃", "🕸", "💀"]`。

</p>
</details>

---

## 128. 输出什么？

```javascript
const name = "Lydia Hallie";
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));

console.log(isNaN(name));
console.log(isNaN(age));
```

- A: `true` `false` `true` `false`
- B: `true` `false` `false` `false`
- C: `false` `false` `true` `false`
- D: `false` `true` `false` `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

通过方法 `Number.isNaN`，你可以检测你传递的值是否为 _数字值_ 并且是否等价于 `NaN`。`name` 不是一个数字值，因此 `Number.isNaN(name)` 返回 `false`。`age` 是一个数字值，但它不等价于 `NaN`，因此 `Number.isNaN(age)` 返回 `false`.

通过方法 `isNaN`， 你可以检测你传递的值是否一个 number。`name` 不是一个 `number`，因此 `isNaN(name)` 返回 `true`. `age` 是一个 `number` 因此 `isNaN(age)` 返回 `false`.

</p>
</details>

---

## 129. 输出什么？

```javascript
const randomValue = 21;

function getInfo() {
	console.log(typeof randomValue);
	const randomValue = "Lydia Hallie";
}

getInfo();
```

- A: `"number"`
- B: `"string"`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

通过 `const` 关键字声明的变量在被初始化之前不可被引用：这被称之为 _暂时性死区_。在函数 `getInfo` 中，变量 `randomValue` 声明在`getInfo` 的作用域的此法环境中。在想要对 `typeof randomValue` 进行 log 之前，变量 `randomValue` 仍未被初始化： 错误`ReferenceError` 被抛出！JS 引擎并不会根据作用域链网上寻找该变量，因为我们已经在 `getInfo` 函数中声明了 `randomValue` 变量。

</p>
</details>

---

## 130. 输出什么？

```javascript
const myPromise = Promise.resolve("Woah some cool data");

(async () => {
	try {
		console.log(await myPromise);
	} catch {
		throw new Error(`Oops didn't work`);
	} finally {
		console.log("Oh finally!");
	}
})();
```

- A: `Woah some cool data`
- B: `Oh finally!`
- C: `Woah some cool data` `Oh finally!`
- D: `Oops didn't work` `Oh finally!`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

在 `try` 块区，我们打印 `myPromise` 变量的 awaited 值： `"Woah some cool data"`。因为`try` 块区没有错误抛出，`catch` 块区的代码并不执行。`finally` 块区的代码 _总是_ 执行，`"Oh finally!"` 被输出。

</p>
</details>

---

## 131. 输出什么？

```javascript
const emojis = ["🥑", ["✨", "✨", ["🍕", "🍕"]]];

console.log(emojis.flat(1));
```

- A: `['🥑', ['✨', '✨', ['🍕', '🍕']]]`
- B: `['🥑', '✨', '✨', ['🍕', '🍕']]`
- C: `['🥑', ['✨', '✨', '🍕', '🍕']]`
- D: `['🥑', '✨', '✨', '🍕', '🍕']`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

通过方法 `flat`， 我们可以创建一个新的，已被扁平化的数组。被扁平化的深度取决于我们传递的值。在这个 case 里，我们传递了值 `1` (并不必要，这是默认值)，相当于只有第一层的数组才会被连接。即这个 case 里的 `['🥑']` and `['✨', '✨', ['🍕', '🍕']]`。连接这两个数组得到结果 `['🥑', '✨', '✨', ['🍕', '🍕']]`.

</p>
</details>

---

## <a name=20191224></a>132. 输出什么？

```javascript
class Counter {
	constructor() {
		this.count = 0;
	}

	increment() {
		this.count++;
	}
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);
```

- A: `0`
- B: `1`
- C: `2`
- D: `3`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

`counterOne` 是类 `Counter` 的一个实例。类 Counter 包含一个`count` 属性在它的构造函数里， 和一个 `increment` 方法。首先，我们通过 `counterOne.increment()` 调用方法 `increment` 两次。现在，`counterOne.count` 为 `2`.

<img src="https://i.imgur.com/KxLlTm9.png" width="400">

然后，我们创建一个新的变量 `counterTwo` 并将 `counterOne` 的引用地址赋值给它。因为对象受引用地址的影响，我们刚刚创建了一个新的对象，其引用地址和 `counterOne` 的等价。因此它们指向同一块内存地址，任何对其的副作用都会影响 `counterTwo`。现在 `counterTwo.count` 为 `2`。

我们调用 `counterTwo.increment()` 将 `count` 的值设为 `3`。然后，我们打印 `counterOne` 里的 count，结果为 `3`。

<img src="https://i.imgur.com/BNBHXmc.png" width="400">

</p>
</details>

---

## 133. 输出什么？

```javascript
const myPromise = Promise.resolve(Promise.resolve("Promise!"));

function funcOne() {
	myPromise.then(res => res).then(res => console.log(res));
	setTimeout(() => console.log("Timeout!"), 0);
	console.log("Last line!");
}

async function funcTwo() {
	const res = await myPromise;
	console.log(await res);
	setTimeout(() => console.log("Timeout!"), 0);
	console.log("Last line!");
}

funcOne();
funcTwo();
```

- A: `Promise! Last line! Promise! Last line! Last line! Promise!`
- B: `Last line! Timeout! Promise! Last line! Timeout! Promise!`
- C: `Promise! Last line! Last line! Promise! Timeout! Timeout!`
- D: `Last line! Promise! Promise! Last line! Timeout! Timeout!`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

首先，我们调用 `funcOne`。在函数 `funcOne` 的第一行，我们调用`myPromise` promise _异步操作_。当 JS 引擎在忙于执行 promise，它继续执行函数 `funcOne`。下一行 _异步操作_ `setTimeout`，其回调函数被 Web API 调用。 (详情请参考我关于 event loop 的文章.)

promise 和 timeout 都是异步操作，函数继续执行当 JS 引擎忙于执行 promise 和 处理 `setTimeout` 的回调。相当于 `Last line!` 首先被输出， 因为它不是异步操作。执行完 `funcOne` 的最后一行，promise 状态转变为 resolved，`Promise!` 被打印。然而，因为我们调用了 `funcTwo()`，调用栈不为空，`setTimeout` 的回调仍不能入栈。

我们现在处于 `funcTwo`，先 _awaiting_ myPromise。通过 `await` 关键字， 我们暂停了函数的执行直到 promise 状态变为 resolved (或 rejected)。然后，我们输出 `res` 的 awaited 值（因为 promise 本身返回一个 promise）。 接着输出 `Promise!`。

下一行就是 _异步操作_ `setTimeout`，其回调函数被 Web API 调用。

我们执行到函数 `funcTwo` 的最后一行，输出 `Last line!`。现在，因为 `funcTwo` 出栈，调用栈为空。在事件队列中等待的回调函数（`() => console.log("Timeout!")` from `funcOne`, and `() => console.log("Timeout!")` from `funcTwo`）以此入栈。第一个回调输出 `Timeout!`，并出栈。然后，第二个回调输出 `Timeout!`，并出栈。得到结果 `Last line! Promise! Promise! Last line! Timeout! Timeout!`

</p>
</details>

---

## 134. 我们怎样才能在 `index.js` 中调用 `sum.js?` 中的 `sum`？

```javascript
// sum.js
export default function sum(x) {
	return x + x;
}

// index.js
import * as sum from "./sum";
```

- A: `sum(4)`
- B: `sum.sum(4)`
- C: `sum.default(4)`
- D: 默认导出不用 `*` 来导入，只能具名导出

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

使用符号 `*`，我们引入文件中的所有值，包括默认和具名。如果我们有以下文件：

```javascript
// info.js
export const name = "Lydia";
export const age = 21;
export default "I love JavaScript";

// index.js
import * as info from "./info";
console.log(info);
```

将会输出以下内容：

```javascript
{
  default: "I love JavaScript",
  name: "Lydia",
  age: 21
}
```

以 `sum` 为例，相当于以下形式引入值 `sum`：

```javascript
{ default: function sum(x) { return x + x } }
```

我们可以通过调用 `sum.default` 来调用该函数

</p>
</details>

---

## 135. 输出什么？

```javascript
const handler = {
	set: () => console.log("Added a new property!"),
	get: () => console.log("Accessed a property!")
};

const person = new Proxy({}, handler);

person.name = "Lydia";
person.name;
```

- A: `Added a new property!`
- B: `Accessed a property!`
- C: `Added a new property!` `Accessed a property!`
- D: 没有任何输出

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

使用 Proxy 对象，我们可以给一个对象添加自定义行为。在这个 case，我们传递一个包含以下属性的对象 `handler` : `set` and `get`。每当我们 _设置_ 属性值时 `set` 被调用，每当我们 _获取_ 时 `get` 被调用。

第一个参数是一个空对象 `{}`，作为 `person` 的值。对于这个对象，自定义行为被定义在对象 `handler`。如果我们向对象 `person` 添加属性，`set` 将被调用。如果我们获取 `person` 的属性，`get` 将被调用。

首先，我们向 proxy 对象 (`person.name = "Lydia"`) 添加一个属性 `name`。`set` 被调用并输出 `"Added a new property!"`。

然后，我们获取 proxy 对象的一个属性，对象 handler 的属性 `get` 被调用。输出 `"Accessed a property!"`。

</p>
</details>

---

## 136. 以下哪一项会对对象 `person` 有副作用？

```javascript
const person = { name: "Lydia Hallie" };

Object.seal(person);
```

- A: `person.name = "Evan Bacon"`
- B: `person.age = 21`
- C: `delete person.name`
- D: `Object.assign(person, { age: 21 })`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

使用 `Object.seal` 我们可以防止新属性 _被添加_，或者存在属性 _被移除_.

然而，你仍然可以对存在属性进行更改。

</p>
</details>

---

## 137. 以下哪一项会对对象 `person` 有副作用？

```javascript
const person = {
	name: "Lydia Hallie",
	address: {
		street: "100 Main St"
	}
};

Object.freeze(person);
```

- A: `person.name = "Evan Bacon"`
- B: `delete person.address`
- C: `person.address.street = "101 Main St"`
- D: `person.pet = { name: "Mara" }`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

使用方法 `Object.freeze` 对一个对象进行 _冻结_。不能对属性进行添加，修改，删除。

然而，它仅 对对象进行 _浅_ 冻结，意味着只有 对象中的 _直接_ 属性被冻结。如果属性是另一个 object，像案例中的 `address`，`address` 中的属性没有被冻结，仍然可以被修改。

</p>
</details>

---

## 138. 输出什么？

```javascript
const add = x => x + x;

function myFunc(num = 2, value = add(num)) {
	console.log(num, value);
}

myFunc();
myFunc(3);
```

- A: `2` `4` and `3` `6`
- B: `2` `NaN` and `3` `NaN`
- C: `2` `Error` and `3` `6`
- D: `2` `4` and `3` `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

首先我们不传递任何参数调用 `myFunc()`。因为我们没有传递参数，`num` 和 `value` 获取它们各自的默认值：num 为 `2`，而 `value` 为函数 `add` 的返回值。对于函数 `add`，我们传递值为 2 的 `num` 作为参数。函数 `add` 返回 `4` 作为 `value` 的值。

然后，我们调用 `myFunc(3)` 并传递值 `3` 参数 `num` 的值。我们没有给 `value` 传递值。因为我们没有给参数 `value` 传递值，它获取默认值：函数 `add` 的返回值。对于函数 `add`，我们传递值为 3 的 `num`给它。函数 `add` 返回 `6` 作为 `value` 的值。

</p>
</details>

---

## 139. 输出什么？

```javascript
class Counter {
  #number = 10

  increment() {
    this.#number++
  }

  getNum() {
    return this.#number
  }
}

const counter = new Counter()
counter.increment()

console.log(counter.#number)
```

- A: `10`
- B: `11`
- C: `undefined`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

在 ES2020 中，通过 `#` 我们可以给 class 添加私有变量。在 class 的外部我们无法获取该值。当我们尝试输出 `counter.#number`，语法错误被抛出：我们无法在 class `Counter` 外部获取它！

</p>
</details>

---

## 140. 选择哪一个？

```javascript
const teams = [
	{ name: "Team 1", members: ["Paul", "Lisa"] },
	{ name: "Team 2", members: ["Laura", "Tim"] }
];

function* getMembers(members) {
	for (let i = 0; i < members.length; i++) {
		yield members[i];
	}
}

function* getTeams(teams) {
	for (let i = 0; i < teams.length; i++) {
		// ✨ SOMETHING IS MISSING HERE ✨
	}
}

const obj = getTeams(teams);
obj.next(); // { value: "Paul", done: false }
obj.next(); // { value: "Lisa", done: false }
```

- A: `yield getMembers(teams[i].members)`
- B: `yield* getMembers(teams[i].members)`
- C: `return getMembers(teams[i].members)`
- D: `return yield getMembers(teams[i].members)`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

为了遍历 `teams` 数组中对象的属性 `members` 中的每一项，我们需要将 `teams[i].members` 传递给 Generator 函数 `getMembers`。Generator 函数返回一个 generator 对象。为了遍历这个 generator 对象中的每一项，我们需要使用 `yield*`.

如果我们没有写 `yield`，`return yield` 或者 `return`，整个 Generator 函数不会第一时间 return 当我们调用 `next` 方法。

</p>
</details>

---

## 141. 输出什么？

```javascript
const person = {
	name: "Lydia Hallie",
	hobbies: ["coding"]
};

function addHobby(hobby, hobbies = person.hobbies) {
	hobbies.push(hobby);
	return hobbies;
}

addHobby("running", []);
addHobby("dancing");
addHobby("baking", person.hobbies);

console.log(person.hobbies);
```

- A: `["coding"]`
- B: `["coding", "dancing"]`
- C: `["coding", "dancing", "baking"]`
- D: `["coding", "running", "dancing", "baking"]`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

函数 `addHobby` 接受两个参数，`hobby` 和有着对象 `person` 中数组 `hobbies` 默认值的 `hobbies`。

首相，我们调用函数 `addHobby`，并给 `hobby` 传递 `"running"` 以及给 `hobbies` 传递一个空数组。因为我们给 `hobbies` 传递了空数组，`"running"` 被添加到这个空数组。

然后，我们调用函数 `addHobby`，并给 `hobby` 传递 `"dancing"`。我们不向 `hobbies` 传递值，因此它获取其默认值 —— 对象 `person` 的 属性 `hobbies`。我们向数组 `person.hobbies` push `dancing`。

最后，我们调用函数 `addHobby`，并向 `hobby` 传递 值 `"baking"`，并且向 `hobbies` 传递 `person.hobbies`。我们向数组 `person.hobbies` push `dancing`。

pushing `dancing` 和 `baking` 之后，`person.hobbies` 的值为 `["coding", "dancing", "baking"]`

</p>
</details>

---

## 142. 输出什么？

```javascript
class Bird {
	constructor() {
		console.log("I'm a bird. 🦢");
	}
}

class Flamingo extends Bird {
	constructor() {
		console.log("I'm pink. 🌸");
		super();
	}
}

const pet = new Flamingo();
```

- A: `I'm pink. 🌸`
- B: `I'm pink. 🌸` `I'm a bird. 🦢`
- C: `I'm a bird. 🦢` `I'm pink. 🌸`
- D: Nothing, we didn't call any method

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

我们创建了类 `Flamingo` 的实例 `pet`。当我们实例化这个实例，`Flamingo` 中的 `constructor` 被调用。首相，输出 `"I'm pink. 🌸"`，之后我们调用`super()`。`super()` 调用父类的构造函数，`Bird`。`Bird` 的构造函数被调用，并输出 `"I'm a bird. 🦢"`。

</p>
</details>

---

## 143. 哪一个选项会导致报错？

```javascript
const emojis = ["🎄", "🎅🏼", "🎁", "⭐"];

/* 1 */ emojis.push("🦌");
/* 2 */ emojis.splice(0, 2);
/* 3 */ emojis = [...emojis, "🥂"];
/* 4 */ emojis.length = 0;
```

- A: 1
- B: 1 and 2
- C: 3 and 4
- D: 3

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

`const` 关键字意味着我们不能 _重定义_ 变量中的值，它 _仅可读_。然而，值本身不可修改。数组 `emojis` 中的值可被修改，如 push 新的值，拼接，又或者将数组的长度设置为 0。

</p>
</details>

---

## 144. 我们需要向对象 `person` 添加什么，以致执行 `[...person]` 时获得形如 `["Lydia Hallie", 21]` 的输出？

```javascript
const person = {
  name: "Lydia Hallie",
  age: 21
}

[...person] // ["Lydia Hallie", 21]
```

- A: 不需要，对象默认就是可迭代的
- B: `*[Symbol.iterator]() { for (let x in this) yield* this[x] }`
- C: `*[Symbol.iterator]() { yield* Object.values(this) }`
- D: `*[Symbol.iterator]() { for (let x in this) yield this }`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

对象默认并不是可迭代的。如果迭代规则被定义，则一个对象是可迭代的（An iterable is an iterable if the iterator protocol is present）。我们可以通过添加迭代器 symbol `[Symbol.iterator]` 来定义迭代规则，其返回一个 generator 对象，比如说构建一个 generator 函数 `*[Symbol.iterator]() {}`。如果我们想要返回数组 `["Lydia Hallie", 21]`: `yield* Object.values(this)`，这个 generator 函数一定要 yield 对象 `person` 的`Object.values`。

</p>
</details>

---

## 145. 输出什么？
```javascript
let count = 0;
const nums = [0, 1, 2, 3];

nums.forEach(num => {
	if (num) count += 1
})

console.log(count)
```

- A: 1
- B: 2
- C: 3
- D: 4
<details><summary><b>答案</b></summary>
<p>

#### 答案: C

在 `forEach` 循环内部的 `if` 会判断 `num` 的值是 truthy 或者是 falsy。因为 `nums` 数组的第一个数字是 `0`，一个 falsy 值， `if` 语句代码块不会被执行。`count` 仅仅在 `nums` 数组的其他 3 个数字 `1`，`2`，`3` 时加 1。因为 `count` 执行了 3 次加 `1` 运算，所以 `count` 的值为 `3`。

</p>
</details>

---

## 146. 输出是什么？

```javascript
function getFruit(fruits) {
	console.log(fruits?.[1]?.[1])
}

getFruit([['🍊', '🍌'], ['🍍']])
getFruit()
getFruit([['🍍'], ['🍊', '🍌']])
```

- A: `null`, `undefined`, 🍌
- B: `[]`, `null`, 🍌
- C: `[]`, `[]`, 🍌
- D: `undefined`, `undefined`, 🍌

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

`?` 允许我们去选择性地访问对象内部更深层的嵌套属性。 我们尝试打印 `fruits` 数组索引值为 `1` 的子数组内部的索引值为 `1` 的元素。 如果在 `fruits` 数组索引值 为 `1` 的位置不存在元素，会直接返回 `undefined`。 如果 `fruits` 数组在索引值为 `1` 的位置存在元素，但是子数组在索引值为 `1` 的位置不存在元素，也会返回 `undefined`。

首先，我们尝试打印 `[['🍊', '🍌'], ['🍍']]` 的子数组 `['🍍']` 的第 2 个元素。这个子数组只包含一个元素，也就意味着在索引值为 `1` 的位置不存在元素，所以返回的是 `undefined` 。

其次，我们在没有传入任何参数调用了 `getFruits` 函数，也就意味着形参 `fruits` 的默认值为`undefined`。因为我们选择性地链接了 `fruits` 在索引值为 `1` 的元素，因为在索引值为 `1` 的位置不存在元素，因此返回的是 `undefined` 。

最后，我们尝试打印 `['🍍'], ['🍊', '🍌']` 的子数组 `['🍊', '🍌']` 的第 2 个元素。子数组索引值为 `1`的位置为 `🍌` ，因此它被打印出了。

</p>
</details>

---

## 147. 输出什么？

```javascript
class Calc {
	constructor() {
		this.count = 0 
	}

	increase() {
		this.count ++
	}
}

const calc = new Calc()
new Calc().increase()

console.log(calc.count)
```

- A: `0`
- B: `1`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

我们设置 `calc` 变量为 `Calc` 类的一个新实例。 然后，我们初始化一个 `Calc` 的新实例，而且调用了这个实例的 `increase` 方法。因为 count 属性是在 `Calc` class 的 constructor 内部的，所以 count 属性不会在 `Calc` 的原型链上共享出去。这就意味着 calc 实例的 count 值不会被更新，count 仍然是 `0`。

</p>
</details>

---

## 148. 输出什么？

```javascript
const user = {
	email: "e@mail.com",
	password: "12345"
}

const updateUser = ({ email, password }) => {
	if (email) {
		Object.assign(user, { email })
	}

	if (password) {
		user.password = password
	}

	return user
}

const updatedUser = updateUser({ email: "new@email.com" })

console.log(updatedUser === user)
```

- A: `false`
- B: `true`
- C: `TypeError`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

 `updateUser` 函数更新 user 的 `email` 和 `password` 属性的值， 如果它们的值传入函数， 函数返回的就是 `user` 对象。 `updateUser` 函数的返回值是 `user` 对象，意味着 updatedUser 的值与 `user` 指向的是同一个 `user` 对象。`updatedUser === user` 为 `true`.

</p>
</details>

---

## 149. 输出什么？

```javascript
const fruit = ['🍌', '🍊', '🍎']

fruit.slice(0, 1)
fruit.splice(0, 1)
fruit.unshift('🍇')

console.log(fruit)
```

- A: `['🍌', '🍊', '🍎']`
- B: `['🍊', '🍎']`
- C: `['🍇', '🍊', '🍎']`
- D: `['🍇', '🍌', '🍊', '🍎']`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

首先，我们在 fruit 数组上调用 `slice` 方法。 slice 方法不会修改原始数组，但是会返回从数组切片下来的值：香蕉 emoji。
其次，我们在 fruit 数组上调用 `splice` 方法。 splice 方法会修改原始数组，也就意味着 fruit 数组此时为 `['🍊', '🍎']`。
最后，我们在 fruit 数组上调用 `unshift` 方法，通过添加一个值的方式改变了原始数组，添加的是'🍇'，它成为了数组的第一个元素。现在 fruit 数组的组成为 `['🍇', '🍊', '🍎']`。

</p>
</details>

---

## 150. 输出什么？

```javascript
const animals = {};
let dog = { emoji: '🐶' }
let cat = { emoji: '🐈' }

animals[dog] = { ...dog, name: "Mara" }
animals[cat] = { ...cat, name: "Sara" }

console.log(animals[dog])
```

- A: `{ emoji: "🐶", name: "Mara" }`
- B: `{ emoji: "🐈", name: "Sara" }`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

对象的键会被转换为字符串。

因为  `dog` 的值是一个对象，   `animals[dog]` 实际上意味着我们创建了一个叫做 `"object Object"` 的属性来代表新的对象。  `animals["object Object"]` 现在等于 `{ emoji: "🐶", name: "Mara"}`。

`cat` 也是一个对象，`animals[cat]` 实际上意味着我们在用新的 cat 的属性覆盖  `animals[``"``object Object``"``]` 的值。

打印  `animals[dog]`，实际上是`animals["object Object"]`，这是因为转化`dog`对象为一个字符串结果 `"object Object"` ，所以返回 `{ emoji: "🐈", name: "Sara" }`。

</p>
</details>

---

## 151. 输出什么？

```javascript
const user = {
	email: "my@email.com",
	updateEmail: email => {
		this.email = email
	}
}

user.updateEmail("new@email.com")
console.log(user.email)
```

- A: `my@email.com`
- B: `new@email.com`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案: A

`updateEmail` 函数是一个箭头函数，它没有和 `user` 对象绑定。这就意味着 `this` 关键字不会引用到 `user` 对象，但是会引用到全局对象。 `user` 对象内部的 `email` 的值不会更新。当打印 `user.email` 的时候， 原始值 `my@email.com` 被返回。

</p>
</details>

---

## 152. 输出什么？

```javascript
const promise1 = Promise.resolve('First')
const promise2 = Promise.resolve('Second')
const promise3 = Promise.reject('Third')
const promise4 = Promise.resolve('Fourth')

const runPromises = async () => {
	const res1 = await Promise.all([promise1, promise2])
	const res2  = await Promise.all([promise3, promise4])
	return [res1, res2]
}

runPromises()
	.then(res => console.log(res))
	.catch(err => console.log(err))
```

- A: `[['First', 'Second'], ['Fourth']]`
- B: `[['First', 'Second'], ['Third', 'Fourth']]`
- C: `[['First', 'Second']]`
- D: `'Third'`

<details><summary><b>答案</b></summary>
<p>

#### 答案: D

 `Promise.all` 方法可以并行式运行 promise。如果其中一个 promise 失败了，`Promise.all` 方法会带上被 reject 的 promise 的值_rejects_。在这个例子中， `promise3` 带着 `"Third"` 值 reject。我们在调用 `runPromises` 时在 `runPromises` 函数内部的 `catch` 方法去捕获任意 error 从而捕获到被 reject 的值。因为 `promise3` 带着 `"Third"` 被 reject，所以只有 `"Third"` 打印。

</p>
</details>

---

## 153. 哪个作为`method`的值可以打印`{ name: "Lydia", age: 22 }`?

```javascript
const keys = ["name", "age"]
const values = ["Lydia", 22]

const method = /* ?? */
Object[method](keys.map((_, i) => {
	return [keys[i], values[i]]
})) // { name: "Lydia", age: 22 }
```

- A: `entries`
- B: `values`
- C: `fromEntries`
- D: `forEach`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

 `fromEntries` 方法可以将二维数组转换为对象。在每个子数组的第一个元素是 key，在每个子数组的第二个元素是 value。在这个例子中，我们映射了 `keys` 数组，它返回了一个数组，数组的第一个元素为 keys 数组当前索引的值，第二个元素为 values 数组当前索引的值。

这样就创建了一个包含正确 keys 和 values 的子数组的数组，因此结果为`{ name: "Lydia", age: 22 }`。

</p>
</details>

---

## 154. 输出什么？

```javascript
const createMember = ({ email, address = {}}) => {
	const validEmail = /.+\@.+\..+/.test(email)
	if (!validEmail) throw new Error("Valid email pls")

	return {
		email,
		address: address ? address : null
	}
}

const member = createMember({ email: "my@email.com" })
console.log(member)
```

- A: `{ email: "my@email.com", address: null }`
- B: `{ email: "my@email.com" }`
- C: `{ email: "my@email.com", address: {} }`
- D: `{ email: "my@email.com", address: undefined }`

<details><summary><b>答案</b></summary>
<p>

#### 答案: C

 `address` 的默认值是一个空对象 `{}`。当我们设置 `member` 变量为 `createMember` 函数返回的对象，我们没有为 address 参数传值，意味着 address 的值为默认的空对象 `{}`。一个空对象是一个 truthy 值，意味着 `address ? address : null` 条件会返回 `true`。address 的值为空对象 `{}`。

</p>
</details>

---

## 155. 输出什么？

```javascript
let randomValue = { name: "Lydia" }
randomValue = 23

if (!typeof randomValue === "string") {
	console.log("It's not a string!")
} else {
	console.log("Yay it's a string!")
}
```

- A: `It's not a string!`
- B: `Yay it's a string!`
- C: `TypeError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案: B

 `if` 语句的条件判断 `!typeof randomValue` 的值是否等于 `"string"`。 `!` 操作符将这个值转化为一个布尔值。如果值是 truthy 的话，返回值会是 `false`，如果值是 falsy，返回值会是 `true`。在这里， `typeof randomValue` 的返回值是一个 truthy 值 `"number"`，意味着 `!typeof randomValue` 的值是一个布尔值 `false`。

 `!typeof randomValue === "string"` 总是返回 false，因为我们实际上是在执行 `false === "string"`。因为条件返回的是 `false`，所以 `else` 语句中的代码块会被运行，因此打印 `Yay it's a string!` 。

</p>
</details>