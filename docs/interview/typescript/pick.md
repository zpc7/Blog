# 实现 Pick<Type, Keys>

在 TypeScript 中， `Pick` 是一个工具类型（Utility Type），用于从一个对象类型中选择指定的属性，创建一个新的类型。实际上，你可以自己实现一个简单版本的 `Pick` 工具类型，用来更好地理解它是如何工作的。

以下是一个简化版的 `Pick` 工具类型的实现：

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

这里的 `Pick` 类型接受两个参数： `T` 是源对象类型， `K` 是要选择的属性名组成的联合类型。在实现中，我们使用了映射类型（Mapped Type）来创建一个新的类型，它包含了原对象类型 `T` 中所有 `K` 类型属性的映射。

[阮一峰的 TS 教程](https://wangdoc.com/typescript/utility#picktype-keys)
