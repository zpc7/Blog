# ESM 符号绑定

## 下面的代码输出?

::: code-group

```js:line-numbers [main.js]
import { count, increase } from './counter.js';
import * as counter from './counter.js';
const { count: c } = counter;

increase();
console.log(count);
console.log(counter.counter);
console.log(c);

```

```js:line-numbers [counter.js]
var count = 1;
export { count }
export function increase(){
  count++;
}
```

:::

::: details 答案

```
2
2
1
```

解释如下:

1. 使用 `import { count }` 导入的 `count` 跟模块 `counter` 导出的 `count` 是同一个东西(符号绑定)
2. 使用 `import * as counter` 导入的 `counter.count` 也是同一个东西(符号绑定)
3. 使用 `const { count: c } = counter` 对象解构的方式产生的 `c` 拥有独立的内存空间

:::
