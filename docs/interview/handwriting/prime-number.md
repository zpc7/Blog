# 手写100以内的质数

质数（Prime Number）是指只能被 1 和自身整除的正整数。下面是一个手写的 JavaScript 代码，用于列出 100 以内的质数，并附带详细解释：

```javascript
function isPrime(num) {
  if (num <= 1) {
    return false; // 1 不是质数
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false; // 如果能被小于等于其平方根的数整除，则不是质数
    }
  }

  return true; // 如果不能被小于等于其平方根的数整除，则是质数
}

function findPrimes(limit) {
  const primes = [];

  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
}

const primesUpTo100 = findPrimes(100);
console.log(primesUpTo100);
```

代码解释：

1. `isPrime(num)` 函数用于判断一个数是否是质数。如果 `num` 小于等于 1，则不是质数，直接返回 `false`。然后使用一个循环从 2 开始，迭代到 `num` 的平方根，如果在这个范围内找到一个能整除 `num` 的数，则返回 `false`，否则返回 `true`。

2. `findPrimes(limit)` 函数用于查找给定范围内的所有质数。它创建一个空数组 `primes` 用于存储找到的质数。然后使用一个循环从 2 开始，迭代到 `limit`，对每个数使用 `isPrime` 函数进行判断，如果是质数就将其加入到 `primes` 数组中。

3. 最后，调用 `findPrimes(100)` 来找到 100 以内的所有质数，然后将结果打印到控制台。

这段代码中的 `isPrime` 函数和 `findPrimes` 函数结合起来，可以用来查找任意范围内的质数。

[JS判断质数那些事](https://juejin.cn/post/6844903895194402824)
