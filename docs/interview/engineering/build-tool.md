# 构建工具

* [前端构建工具发展史](https://mp.weixin.qq.com/s/15YxshMsZ7FJyLUfXZHqCQ)
* [如何修改 node_modules 里的文件](https://mp.weixin.qq.com/s/nD9bbpvGA3pTHeLMmTyukQ)
* [还不清楚webpack和vite原理？有这篇足够了！](https://juejin.cn/post/7267791228872671247?utm_source=gold_browser_extension#heading-0)
- [Vite为什么比Webpack快 🌟](https://mp.weixin.qq.com/s/f5D8ZEbPhQbwDrUCwgezTQ)

## webpack的作用

Webpack 是一个现代的前端构建工具，它在前端开发中起着重要的作用。它主要用于将多个前端资源（如 JavaScript、CSS、图片等）进行打包、优化和转换，以便于在浏览器中加载和使用。以下是 Webpack 的主要作用：

1. **模块打包**：Webpack 可以将项目中的多个模块（文件）打包成一个或多个最终的静态资源文件，这些资源文件可以在浏览器中加载和执行。

2. **代码分割**：Webpack 支持将应用代码分割成多个块（chunks），根据需要异步加载。这可以减小初始加载时间，提高页面性能。

3. **依赖管理**：Webpack 可以识别并解析模块之间的依赖关系，使得你可以通过模块导入的方式组织代码。

4. **加载器（Loaders）**：Webpack 可以使用加载器来处理非 JavaScript 文件（如 CSS、图片、字体等），将它们转换为模块，并集成到打包过程中。

5. **插件（Plugins）**：Webpack 的插件系统可以执行各种任务，如代码压缩、打包优化、环境变量注入等。

6. **开发服务器**：Webpack 提供了一个开发服务器，支持热模块替换（Hot Module Replacement）和实时刷新，使得开发过程更加高效。

7. **打包优化**：Webpack 可以对代码进行压缩、混淆、拆分，以减小文件体积，提高加载速度。

8. **处理多样化资源**：Webpack 支持加载和处理各种资源类型，如图片、字体、数据文件等，使得这些资源也可以被视为模块。

9. **环境配置**：Webpack 支持不同环境的配置，可以根据开发、测试、生产等环境需求进行不同的构建配置。

总之，Webpack 在前端开发中起着将多个资源进行打包、优化和转换的关键作用，从而提高项目的性能、可维护性和开发效率。

## chunk 、bundle 的区别

在 Webpack 中，"chunk" 和 "bundle" 都是与代码分割和打包有关的概念，它们在一定程度上有相似之处，但也存在一些区别。以下是它们的区别：

**Bundle（捆绑包）**：

* **定义**：Bundle 是指 Webpack 在构建过程中生成的最终输出文件，它包含了应用程序中的所有代码，包括入口模块和所有依赖模块。
* **特点**：一个 Bundle 可以包含多个模块，用于构建整个应用程序。通常情况下，一个 Webpack 构建会生成一个或多个 Bundle，每个 Bundle 对应一个入口点（entry point）。

**Chunk（代码块）**：

* **定义**：Chunk 是指在代码分割（code splitting）过程中生成的一个或多个代码块，它可以是一个或多个模块的集合。
* **特点**：代码分割是一种将应用程序的代码切分成多个小块，以便在需要时按需加载。每个 Chunk 可以被异步加载，从而提高页面加载性能。
* **关系**：一个 Chunk 可以是一个 Bundle，也可以是多个 Bundle 的一部分。

**区别总结**：

* Bundles 是 Webpack 构建生成的最终文件，它们包含整个应用程序的代码。
* Chunks 是在代码分割过程中形成的代码块，用于按需加载和优化性能。
* 一个 Bundle 可以包含一个或多个 Chunks，一个 Chunk 可以是一个或多个 Bundles 的一部分。
* 使用代码分割技术，可以将应用程序的代码切分成多个 Chunks，从而实现按需加载和更好的性能。

总之，Bundles 和 Chunks 都是 Webpack 中与代码分割和打包相关的概念，它们共同为前端应用程序的性能和加载速度提供了更好的解决方案。
