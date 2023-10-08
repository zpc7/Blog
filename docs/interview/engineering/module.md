# 模块化

强烈推荐: [阮一峰: Module 的加载实现](https://wangdoc.com/es6/module-loader)

## 异步加载 `defer` 和 `async` 的异同

默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到 `<script>` 标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

上面代码中， `<script>` 标签打开 `defer` 或 `async` 属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

`defer` 与 `async` 的区别是：

`defer` 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行； `async` 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话， `defer` 是“渲染完再执行”， `async` 是“下载完就执行”。另外，如果有多个 `defer` 脚本，会按照它们在页面出现的顺序加载，而多个 `async` 脚本是不能保证加载顺序的。

## [使用 Preload/Prefetch 优化你的应用](https://zhuanlan.zhihu.com/p/48521680)

## [ES6 模块与 CommonJS 模块的差异](https://wangdoc.com/es6/module-loader#es6-%E6%A8%A1%E5%9D%97%E4%B8%8E-commonjs-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)

* CommonJS 模块输出的是一个`值的拷贝`，ES6 模块输出的是`值的引用`。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
* CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

## antd 怎么产出三种规范？

Ant Design 是一个非常流行的 React UI 组件库，其 npm 包结构采用了多种规范，以适应不同的使用场景。下面是 Ant Design 的三种 npm 包规范以及它们的产出方式：

1. **ESM（ES Module）规范**：
   这是 Ant Design 的默认规范，适用于现代浏览器和支持 ES Modules 的环境。
   - 在包的 `package.json` 中设置 `"module"` 字段，指定入口文件为一个 ES Module 形式的文件（一般是 `.es.js` 或 `.mjs` 后缀）。
   - 这种规范使得包可以直接在支持 ES Modules 的环境中导入和使用，也方便 Tree Shaking（只导入使用到的代码部分）。

2. **CommonJS 规范**：
   这是 Ant Design 的兼容规范，适用于老版本浏览器和一些环境（如 Node.js）。
   - 在包的 `package.json` 中设置 `"main"` 字段，指定入口文件为一个 CommonJS 形式的文件（一般是 `.js` 后缀）。
   - 这种规范使得包可以在 Node.js 等环境中被导入和使用。

3. **UMD（Universal Module Definition）规范**：
   这是 Ant Design 的通用规范，适用于浏览器、Node.js 以及其他不同环境。
   - 在包的 `package.json` 中设置 `"umd:main"` 字段，指定一个 UMD 版本的入口文件，用于在浏览器中通过 `<script>` 标签引入。
   - 这种规范使得包可以通过全局变量的方式在浏览器中使用。

Ant Design 会根据这些规范，为不同的使用场景生成相应的构建产物。这样，开发者可以根据自己的项目需要，选择合适的规范来引入 Ant Design。

在 Ant Design 的源代码中，你可以找到类似以下的配置来实现这些规范：

```json
{
  "main": "lib/index.js",    // CommonJS 规范入口
  "module": "es/index.js",   // ESM 规范入口
  "umd:main": "dist/antd.js" // UMD 规范入口
}
```

这些规范的设计和使用，使得 Ant Design 能够在不同环境下高效地被使用，同时也是现代 JavaScript 包的最佳实践之一。
