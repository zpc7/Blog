# 单例模式

单例模式是一种 `创建型` 设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。

## 主要特点

* 单一实例： 单例模式确保类只有一个实例。无论何时，只要有人请求该类的实例，它都返回相同的实例。

* 全局访问点： 单例模式提供一个全局的访问点，允许在整个应用程序中访问该实例。

* 延迟实例化： 实例在需要的时候被创建，而不是在应用程序启动时就被创建，这种方式又称为懒加载。

## 实现

```js
// 定义一个类
function Singleton(name) {
  this.name = name;
  this.instance = null;
}
// 原型扩展类的一个方法getName()
Singleton.prototype.getName = function() {
  console.log(this.name)
};
// 获取类的实例
Singleton.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance
};

// 获取对象1
const a = Singleton.getInstance('a');
// 获取对象2
const b = Singleton.getInstance('b');
// 进行比较
console.log(a === b); // true
```

## 使用场景

例如页面存在一个模态框的时候，只有在用户点击的时候才会创建，而不是加载完成之后再创建弹窗和隐藏，并且保证弹窗全局只有一个

```js
const getSingle = function(fn) {
  let result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
};

const createLoginLayer = function() {
  var divElement = document.createElement('div');
  divElement.innerHTML = '我是浮窗';
  divElement.style.display = 'none';
  document.body.appendChild(divElement);
  return divElement;
};

const createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
};
```

## 参考链接

https://juejin.cn/post/6844903874210299912#heading-5
