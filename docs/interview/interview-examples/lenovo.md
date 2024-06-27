# 联想

## 一面(中文面试)

中文+最后会有一个英文自我介绍/项目英文介绍  
开放型的问题:  组件设计啊 code review关注什么呀, react心智模型你的理解啊

01. ssr 和传统 jsp 的区别?
02. 说说你对 React 自己的理解?
02. 英文自我介绍
---
01. 内存泄漏? Map 中 会存在内存泄漏的可能吗?
  :::details 参考
  + [如何查找和解决前端内存泄漏问题？ - 排查和分析技巧详解](https://juejin.cn/post/7232127712642547770)
  - [阮一峰 WeakMap](https://es6.ruanyifeng.com/#docs/set-map#WeakMap)

  在 ES6 中，`Map` 是一种用于存储键值对的数据结构，与传统的 JavaScript 对象不同，它的键可以是任何值，包括对象。虽然 `Map` 提供了许多强大的功能，但在使用时需要小心，以避免内存泄漏的风险。

  **内存泄漏的概念**

  内存泄漏指的是程序中分配的内存未能及时释放，从而导致内存使用量不断增加。内存泄漏可能会导致程序性能下降，甚至崩溃。在 JavaScript 中，内存泄漏通常发生在某些对象或数据结构（如 `Map`、数组等）中的引用未能及时清除，导致垃圾回收器无法回收这些内存。

  **`Map` 的内存管理**

  `Map` 使用强引用（strong reference）来存储键值对。只要 `Map` 中存在对键的引用，键和值都不会被垃圾回收器回收。这意味着，如果 `Map` 中存储了大量的键值对，而这些键值对没有被及时清除，那么这些键值对所占用的内存将不会被释放，从而导致内存泄漏。

  **内存泄漏示例**

  以下是一个使用 `Map` 可能导致内存泄漏的示例：

  ```javascript
  let map = new Map();

  function addData(key, value) {
      map.set(key, value);
  }

  // 假设我们不断添加新的键值对，但从不删除
  for (let i = 0; i < 1000000; i++) {
      addData(i, `value${i}`);
  }

  // 此时，map 仍然持有所有键值对的引用，内存不会被释放
  ```

  在上述示例中，`Map` 持有对每个键值对的引用，即使这些键值对不再被使用，它们仍然会占用内存，导致内存泄漏。

  **避免内存泄漏的策略**

  1. **及时清除无用的键值对**：确保在不需要使用某些键值对时，使用 `map.delete(key)` 方法及时将它们删除。

      ```javascript
      let map = new Map();

      function addData(key, value) {
          map.set(key, value);
      }

      function removeData(key) {
          map.delete(key);
      }

      // 添加数据
      for (let i = 0; i < 1000000; i++) {
          addData(i, `value${i}`);
      }

      // 删除数据
      for (let i = 0; i < 1000000; i++) {
          removeData(i);
      }
      ```

  2. **使用 `WeakMap`**：如果键是对象且只需要弱引用，可以使用 `WeakMap`。`WeakMap` 中的键是弱引用，如果没有其他引用指向这些键，垃圾回收器会自动回收这些键及其对应的值。

      ```javascript
      let weakMap = new WeakMap();

      function addData(key, value) {
          weakMap.set(key, value);
      }

      // 创建对象并添加到 WeakMap
      let obj = {};
      addData(obj, 'value');

      // 删除对对象的引用
      obj = null;

      // 此时，weakMap 中的键值对会被自动回收
      ```

      使用 `WeakMap` 可以避免内存泄漏，因为它不会阻止垃圾回收器回收键对象。

  **总结**

  `Map` 本身不会导致内存泄漏，但不正确的使用方法可能会导致内存泄漏。为了避免内存泄漏，开发者应当及时清除无用的键值对，并在适当的场景下使用 `WeakMap`。通过正确的内存管理，可以有效地防止内存泄漏问题，确保程序的性能和稳定性。    
  :::
02. js bridge 原理和实现方式? 🌟
  :::details 参考
  + [🌟 深入浅出JSBridge：从原理到使用](https://juejin.cn/post/6936814903021797389)
  + [JSBridge的原理](https://juejin.cn/post/6844903585268891662)
  

```js
const setupWebViewJavascriptBridgeCore = (callback) => {
    if (typeof window === 'undefined' || (isIOS() && !/XXXXXX CN/i.test(navigator.userAgent))) {
        callback(null);
        return;
    }
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
};

function setupWebViewJSBridge(handlerName, parameters, callback) {
    return new Promise((resolve, reject) => {
        setupWebViewJavascriptBridgeCore((bridge) => {
            if (!bridge) {
                reject();
                return;
            }
            bridge.callHandler(handlerName, parameters, (response) => {
                if (`${process.env.VUE_APP_DEBUG}` === 'true') {
                    console.log('setupWebViewJSBridge-parameters:', parameters);
                    console.log('setupWebViewJSBridge-response:', response);
                }
                const res = typeof response === 'string' ? JSON.parse(response) : response;

                callback && callback(res);
                resolve(res);
            });
        });
    });
}
// 调用
const parameters = {
    schema: 'SaveImage',
    action: 'saveImageToPhone',
    parameters: {
        imgUrl: imgUrl || '',
    },
};
bridgeFun('native://plugins', parameters)
  ```

  
  :::
03. commonjs 和 es6 module 的区别?
04. 你做的项目中, 最值得说的优化?
05. React中的合成事件的原理和这样做的原因?
06. React和vue的原理和区别?
07. angular中ngModule的作用?
08. ltr/rtl 中图像会翻转吗?
09. HMR中的热更新和Vite的热更新实现区别?
10. 前端安全中的csrf攻击的原理和解决方案?
  :::details 参考
  [前端安全系列（二）：如何防止CSRF攻击？ - 美团技术团队](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)  
  CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

  一个典型的CSRF攻击有着如下的流程：

  01. 受害者登录a.com，并保留了登录凭证（Cookie）。
  02. 攻击者引诱受害者访问了b.com。
  03. b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的Cookie。
  04. a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
  05. a.com以受害者的名义执行了act=xx。
  06. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。
  :::

代码题目: 布局+抽奖功能扩展, 参考: https://stackblitz.com/edit/vitejs-vite-rbomjg?file=src%2FApp.tsx

## 二面

01. 最有挑战的是啥?
02. 有没有做项目的方法论?
