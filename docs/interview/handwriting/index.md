# 手写题

## 高频

* [JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
* [JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26#issue-236763046)

## 提炼一个字符串中的数字，并组成一个数组

可以使用正则表达式来从字符串中提取数字，并将其组成一个数组。以下是一个使用 JavaScript 的示例代码：

```javascript
const inputString = 'a,12b3c56d7e=';
const numbersArray = inputString.match(/\d+/g).map(Number);

console.log(numbersArray); // 输出 [12, 3, 56, 7]
```

在上面的代码中， `match(/\d+/g)` 会返回一个包含所有匹配的数字字符串的数组，然后我们使用 `map(Number)` 将这些字符串转换为数字，得到最终的数字数组。
