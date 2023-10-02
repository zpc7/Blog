# TS 基础
* [微信: 「1.9W字总结」一份通俗易懂的 TS 教程，入门 + 实战！](https://mp.weixin.qq.com/s/H9JryV416b6PVuEcemQRhA)
* [阮一峰 TypeScript](https://wangdoc.com/typescript/intro)

## [Typescript 中的 interface 和 type 到底有什么区别](https://juejin.cn/post/6844903749501059085)

## TS的常见配置:

如果希望一旦报错就停止编译，不生成编译产物，可以使用 `--noEmitOnError` 参数。

```bash
$ tsc --noEmitOnError app.ts
```

上面命令在报错后，就不会生成app.js。

tsc 还有一个 `--noEmit` 参数，只检查类型是否正确，不生成 JavaScript 文件。

```bash
$ tsc --noEmit app.ts
```

上面命令只检查是否有编译错误，不会生成app.js。
