## 获取网址参数

### 返回包含当前 URL 参数的对象。

通过适当的正则表达式，使用 `String.match()` 来获得所有的键值对， `Array.reduce()` 来映射和组合成一个单一的对象。 将 `location.search` 作为参数传递给当前 `url`。

```js
const getURLParameters = (url) =>
  url
    .match(/([^?=&]+)(=([^&]*))/g)
    .reduce(
      (a, v) => (
        (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
      ),
      {}
    );

// 示例
getURLParameters('http://url.com/page?name=Adam&surname=Smith&bio=zpc7');

// {name: 'Adam', surname: 'Smith', bio: 'zpc7'}
```
### 获取指定的 URL 参数
```js
// 获取 name 
const url = new URL('http://url.com/page?name=Adam&surname=Smith&bio=zpc7');

const paramValue = url.searchParams.get("name");

// Adam
```