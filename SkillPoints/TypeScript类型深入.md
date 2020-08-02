# TypeScript - 类型深入


## 目标

- 更深入了解 <u>TypeScript</u> 类型系统
- 通过 <u>联合类型</u>、<u>交叉类型</u>、<u>字面量类型</u> 来满足更多的标注需求
- 通过 <u>类型别名</u>、<u>类型推导</u> 简化标注操作
- 通过 <u>类型断言</u>、<u>类型操作符</u>、<u>类型保护</u> 来缩小类型标注范围



## 类型深入

类型标注 针对一些更为特殊情况，<u>TypeScript</u> 也提供了一些方法

### 联合类型

联合类型也可以称为多选类型，当我们希望标注一个变量为多个类型之一时可以选择联合类型标注，<u>或</u> 的关系

标注语法

```typescript
变量: 类型一 | 类型二
```

```typescript
function css(ele: Element, attr: string, value: string|number) {
    // ...
}

let box = document.querySelector('.box');
// document.querySelector 方法返回值就是一个联合类型
if (box) {
    // ts 会提示有 null 的可能性，加上判断更严谨
    css(box, 'width', '100px');
    css(box, 'opacity', 1);
    css(box, 'opacity', [1,2]);  // 错误
}
```

### 交叉类型

交叉类型也可以称为合并类型，可以把多种类型合并到一起成为一种新的类型，<u>并且</u> 的关系

标注语法

```typescript
变量: 类型一 & 类型二
```

如，对一个对象进行扩展：

```typescript
interface o1 {x: number, y: string};
interface o2 {z: number};

let o: o1 & o2 = Object.assign({}, {x:1,y:'2'}, {z: 100});
```

### 字面量类型

有的时候，我们希望标注的不是某个类型，而是一个固定值，就可以使用字面量类型，配合联合类型会更有用

```typescript
function setPosition(ele: Element, direction: 'left' | 'top' | 'right' | 'bottom') {
  	// ...
}

box && setDirection(box, 'bottom');
box && setDirection(box, 'hehe');  // 错误
```

### 类型别名

有的时候类型标注比较复杂，这个时候我们可以类型标注起一个相对简单的名字

语法

```typescript
type 新的类型名称 = 类型
```

如前面说到的对象字面类型标注

```typescript
type dir = 'left' | 'top' | 'right' | 'bottom';
function setPosition(ele: Element, direction: dir) {
  	// ...
}
```

### 类型推导

每次都显式标注类型会比较麻烦，<u>TypeScript</u> 提供了一种更加方便的特性：类型推导。<u>TypeScript</u> 编译器会根据当前上下文自动的推导出对应的类型标注，这个过程发生在：

- 初始化变量
- 设置函数默认参数值
- 返回函数值

```typescript
// 自动推断 x 为 number
let x = 1;
// 不能将类型“"a"”分配给类型“number”
x = 'a';
```

### 类型断言

有的时候，我们可能标注一个更加精确的类型（缩小类型标注范围），比如：

```typescript
let img = document.querySelector('#img');
```

我们可以看到 <u>img</u> 的类型为 <u>Element</u>，而 <u>Element</u> 类型其实只是元素类型的通用类型，如果我们去访问 <u>src</u> 这个属性是有问题的，我们需要把它的类型标注得更为精确：<u>HTMLImageElement</u> 类型，这个时候，我们就可以使用类型断言，它类似于一种 类型转换：

```typescript
let img = <HTMLImageElement>document.querySelector('#img');
```

或者

```typescript
let img = document.querySelector('#img') as HTMLImageElement;
```

> <span style="color:red">注意：断言只是一种预判，并不会数据本身产生实际的作用，即：类似转换，但并非真的转换了</span>

###类型操作符

**typeof**

获取值的类型，注：<u>typeof</u> 操作的是值

```typescript
let colors = {
    color1: 'red',
    color2: 'blud'
};

type tColors = typeof colors;
/**
tColors 类型
type tColors = {
    color1: string;
    color2: string;
}
*/
let color2: tColors;
```

**keyof**

获取类型的所对应的类型的 <u>key</u> 的集合，返回值是 <u>key</u> 的联合类型，注：<u>keyof</u> 操作的是类型

 ```typescript
interface Person {
    name: string;
    age: number;
};
type personKeys = keyof Person;
// 等同：type personKeys = "name" | "age"

let p1 = {
    name: 'zMouse',
    age: 35
}
function getPersonVal(k: personKeys) {
    return p1[k];
}
/**
等同：
function getPersonVal(k: 'name'|'age') {
    return p1[k];
}
*/
getPersonVal('name');	//正确
getPersonVal('gender');	//错误
 ```

**in**

<u>in</u> 操作符对值和类型都可以使用

针对值进行操作，用来判断值中是否包含指定的 <u>key</u>

```typescript
console.log( 'name' in {name:'zmouse', age: 35} );
console.log( 'gender' in {name:'zmouse', age: 35} );
```

针对类型进行操作的话，内部使用的 <u>for…in</u> 对类型进行遍历

```typescript
interface Person {
    name: string;
    age: number;
}
type personKeys = keyof Person;
type newPerson = {
    [k in personKeys]: number;
  	/**
  	等同 [k in 'name'|'age']: number;
  	也可以写成
  	[k in keyof Person]: number;
  	*/
}
/**
type newPerson = {
    name: number;
    age: number;
}
*/
```

注意：<u>in</u> 后面的类型值必须是 <u>string</u> 或者 <u>number</u> 或者 <u>symbol</u>

**extends**

类型继承操作符

```typescript
interface type1 {
    x: number;
    y: number;
}
interface type2 extends type1 {}
```

或者

```typescript
type type1 = {
    x: number;
    y: number;
}
function fn<T extends type1>(args: T) {}
fn({x:1, y: 2});
```

### 类型保护

有的时候，值的类型并不唯一，比如一个联合类型的参数，这个时候，在该参数使用过程中只能调用联合类型都有的属性和方法

```typescript
function toUpperCase(arg: string|string[]) {
  	arg.length;	// 正确
  	arg.toUpperCase(1);	// 错误
  
  	// 即使作为条件判断也不行
  	if (arg.substring) {
        arg.substring(1);
    }
}
```

可以使用类型断言

```typescript
if ((<string>arg).substring) {
		(<string>arg).substring(1);
}
```

但是这样做还是很麻烦的，其实在 <u>TypeScript</u> 中，提供了一个类型保护措施来帮助更加方便的处理这样的情况

**typeof**

```typescript
if (typeof arg === 'string') {
    arg.substring(1);
} else {
  	arg.push('1');
}
```

<u>typescript</u> 能够把 <u>typeof</u> 识别为类型保护，作为类型检查的依据，不仅仅是在 <u>if</u> 中有效，在 <u>else</u> 中也是有效的

**instanceof**

<u>typescript</u> 中的 <u>instanceof</u> 也是类型保护的，针对细化的对象类型判断可以使用它来处理

```typescript
if (arg instanceof Array) {
		arg.push('1');
}
```

**自定义类型保护**

有的时候，判断并不是基于数据类型或者构造函数来完成的，那么就可以自定义类型保护

```typescript
function canEach(data: Element[]|NodeList|Element): data is Element[]|NodeList {
    return (<NodeList>data).forEach !== undefined;
}
function fn2(elements: Element[]|NodeList|Element) {
    if ( canEach(elements) ) {
        elements.forEach(_=>{});
    } else {
        elements.classList.add('box');
    }
}
```

<u>data is Element[]|NodeList</u> 是一种类型谓词，格式为：<u>xx is type</u> ，返回这种类型的函数就可以被 <u>TypeScript</u> 识别为类型保护



## 总结

- 联合类型
- 交叉类型
- 字面量类型
- 类型别名
- 类型推导
- 类型断言
- 类型操作符
- 类型保护
