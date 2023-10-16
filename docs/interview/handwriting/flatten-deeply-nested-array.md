# 扁平化嵌套数组

LeetCode 原题: https://leetcode.cn/problems/flatten-deeply-nested-array/description/

## 题目描述

请你编写一个函数，它接收一个 多维数组 arr 和它的深度 n ，并返回该数组的 扁平化 后的结果。

多维数组 是一种包含整数或其他 多维数组 的递归数据结构。

数组 扁平化 是对数组的一种操作，定义是将原数组部分或全部子数组删除，并替换为该子数组中的实际元素。只有当嵌套的数组深度大于 n 时，才应该执行扁平化操作。第一层数组中元素的深度被认为是 0。

请在没有使用内置方法 Array.flat 的前提下解决这个问题。

 

### 示例 1：

输入
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]  
n = 0  
输出
[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

解释
传递深度 n=0 的多维数组将始终得到原始数组。这是因为 子数组(0) 的最小可能的深度不小于 n=0 。因此，任何子数组都不应该被平面化。

### 示例 2：

输入
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 1
输出
[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

解释
以 4 、7 和 13 开头的子数组都被扁平化了，这是因为它们的深度为 0 ， 而 0 小于 1 。然而 [9, 10, 11] 其深度为 1 ，所以未被扁平化。

### 示例 3：

输入
arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 2
输出
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

解释
所有子数组的最大深度都为 1 。因此，它们都被扁平化了。

## 解题方法

### 递归

```js
function flat(arr, n) {
  if (n <= 0) return arr
  const result = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flat(item, n - 1))
      // result = result.concat(flat(item, n - 1)) concat 不会改变原数组!
    } else {
      result.push(item)
    }
  }

  return result
};
```

### 循环

```js
function flat(arr, n) {
  while (n > 0 && arr.some(Array.isArray)) {
    arr = [].concat(...arr);
    n--;
  }
  return arr;
};
```

## 参考链接

* [MDN Array.concat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
* [JS数组扁平化的一些方法(7-8种)](https://juejin.cn/post/6844903805876699150)
