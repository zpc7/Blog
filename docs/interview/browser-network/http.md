# HTTP

* [axios取消请求总结](https://juejin.cn/post/7153831304042119198)
* [前端请求大比拼：Fetch、Axios、Ajax、XHR](https://mp.weixin.qq.com/s/kxP4vwxuTALqmLVP-RoghA)
* [面试官：Fetch API发起的请求可以被暂停吗？](https://mp.weixin.qq.com/s/Xw2udl5mUyGsQUtp6n1xNw)

## HTTP/2 相比 1.0 有哪些重大改进？

// TODO:

## `Fetch` 和 `XHR` 区别?

fetch 没有办法原生监测请求的进度(例如: 文件上传进度)，而 XHR 可以

| 功能点                   | XHR      | Fetch     |
| ------------------------ | -------- | --------- |
| 基本的请求能力           | ✅        | ✅         |
| 基本的获取响应能力       | ✅        | ✅         |
| 监控请求进度             | ✅        | ❌         |
| 监控响应进度             | ✅        | ✅         |
| Service Worker中是否可用 | ❌        | ✅         |
| 控制cookie的携带         | ❌        | ✅         |
| 控制重定向               | ❌        | ✅         |
| 请求取消                 | ✅        | ✅         |
| 自定义referrer           | ❌        | ✅         |
| 流                       | ❌        | ✅         |
| API风格                  | `Event`  | `Promise` |
| 活跃度                   | 停止更新 | 不断更新  |
