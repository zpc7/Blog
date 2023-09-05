## 手动实现 `lodash` 的 `omit`

### 忽略单个 `key`

```ts
// 注意这里, keyToOmit 必须放在前面, 否则会报错如下:
//  ReferenceError: Cannot access 'keyToOmit' before initialization
const omit = (keyToOmit: string, { [keyToOmit]: _, ...omittedPropObj } = {}) =>
  omittedPropObj;

const objectFromFrontend = {
  _id: 5,
  data: {
    some: 1,
    useful: 2,
    data: 3,
  },
};

const objectToInsertIntoDB = omit("_id", objectFromFrontend);

console.log(objectToInsertIntoDB);
// { data: { some: 1, useful: 2, data: 3 } }

console.log(objectFromFrontend);
// { _id: 5, data: { some: 1, useful: 2, data: 3 } }
```

### 忽略多个 `key`

```ts
const omit = (keysToOmit: string[], originalObj = {}) =>
  Object.fromEntries(
    Object.entries(originalObj).filter(([key]) => !keysToOmit.includes(key))
  );

const objectFromFrontend = {
  _id: 5,
  keyA: 111,
  data: {
    some: 1,
    useful: 2,
    data: 3,
  },
};

const objectToInsertIntoDB = omit(["_id", "keyA"], objectFromFrontend);

console.log(objectToInsertIntoDB);
// { data: { some: 1, useful: 2, data: 3 } }

console.log(objectFromFrontend);
// { _id: 5, keyA: 111, data: { some: 1, useful: 2, data: 3 } }
```
