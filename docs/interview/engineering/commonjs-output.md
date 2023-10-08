# CommonJS 代码输出题和 require 伪代码

## 下面的代码输出?

::: code-group

```js [require.js]
const mod = require("./test"); 

console.log(mod); 

```

```js:line-numbers [test.js]
this.a = 1; 
exports.b = 2; 
exports = { c: 3 };
module.exports = { c: 4 };
exports.e = 5; 
this.f = 6; 
```

:::

::: details 答案

```json
{ c: 4 }
```

解释如下:
1. `this` `exports` `module.exports` 3者指向同一个对象 `{ a:1 }`
2. 步骤1中的同一对象修改为 `{ a:1, b:2 }`
3. `exports` 指向新的对象 `{ c:3 }`
4. `module.exports` 指向新的对象 `{ c:4 }`
5. 步骤3中指向的对象修改为 `{ c:3, e:5 }`
6. `this` 指向的对象从步骤2中的 `{ a:1, b:2 }` 修改为 `{ a:1, b:2, f:6 }`

验证: 在 `test.js` 中直接添加 `console.log` 输出如下, 与解释一致

```json
// console.log("this:", this);
// console.log("exports:", exports);
// console.log("module.exports:", module.exports);
this: { a: 1, b: 2, f: 6 }
exports: { c: 3, e: 5 }
module.exports: { c: 4 }
```

:::

## require 伪代码

```js
// CommonJS的本质@必修课DDD
function require(modulePath) {
  // 1. 根据传递的模块路径, 得到模块完整的绝对路径
  var moduleId = getModuleId(modulePath);
  // 2. 判断模块是否已缓存
  if (cache[moduleId]) {
    return cache[moduleId];
  }
  // 3. 真正运行模块代码的辅助函数
  function _require(exports, require, module, __filename, __dirname) {
    // 目标模块的代码放置在这里(模块中的代码可以直接使用这些参数, 因为处于函数的作用域中)
  }

  // 4. 准备并运行辅助函数
  var module = {
    exports: {},
  };
  var exports = module.exports;
  // 模块文件的绝对路径
  var __filename = moduleId;
  // 模块文件所在文件夹的绝对路径
  var __dirname = getDirname(__filename);

  // 调用函数, 绑定this 为exports, 并传递剩余的参数
  // 所以在模块中, this === exports === module.exports 3者指向同一对象⭐️
  _require.call(exports, exports, require, module, __filename, __dirname);

  // 5. 缓存 module.exports
  cache[moduleId] = module.exports;
  // 6. 返回 module.exports ⭐️
  return module.exports;
}
```
