# `lodash.get`

官方使用方式: https://lodash.com/docs/4.17.15#get

## 参考

```js
function get(obj, path, defaultValue) {
  // 如果路径是字符串，则用 . 分隔成数组
  const pathArray = Array.isArray(path) ? path : path.split(/[\.\[\]]/).filter(Boolean);

  // 使用 reduce 遍历路径数组，逐层取值
  const result = pathArray.reduce((acc, key) => {
    // 如果 acc 不是对象或是 null，直接返回 undefined
    if (acc && typeof acc === 'object') {
      return acc[key];
    }
    return undefined;
  }, obj);

  // 如果结果是 undefined，返回默认值，否则返回结果
  return result === undefined ? defaultValue : result;
}

// 示例用法
const obj = {
  a: {
    b: [{ c: 42 }, { d: 43 }]
  }
};

console.log(get(obj, 'a.b[0].c')); // 输出: 42
console.log(get(obj, 'a.b.0.c')); // 输出: 42
console.log(get(obj, 'a.b[1].d')); // 输出: 43
console.log(get(obj, 'a.b[1].d.e', 'default')); // 输出: default
```

## 说明

`lodash.get` 中的 `path` 参数可能是这几种类型:

1. 字符串: 'a.b[0].c' 或 'a.b.0.c'
2. 数组: `['a', 'b', 0, 'c']`

使用正则 `/[\.\[\]]/` 将字符串中的 `.` 和 `[` 和 `]` 分隔成数组, 但是由于 split 方法可能会产生一些空的字符串元素, 为了去除这些空的字符串元素，我们使用了 filter(Boolean)

```js
'a.b[0].c'.split(/[\.\[\]]/);
// ['a', 'b', '0', '', 'c']
'a.b[0].c'.split(/[\.\[\]]/).filter(Boolean);
// ['a', 'b', '0', 'c']
```
