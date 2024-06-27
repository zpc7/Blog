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
08. ltr/rtl 中图像会翻转的问题
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
