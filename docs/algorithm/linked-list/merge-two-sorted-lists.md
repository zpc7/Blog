# 合并两个有序链表
[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/description/)

## 递归解法

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (list1 === null) {
    return list2;
  } else if (list2 === null) {
    return list1;
  } else if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
```

递归的 3 要素:

1. 终止条件：两条链表分别名为 list1 和 list2, 当 list1 为 `null` 或 list2 为 `null` 时结束
2. 返回值：每一层调用都返回排序好的链表头
3. 本级递归内容：如果 list1 的 val 值更小, 则将 list1.next 与排序好的链表头相接, list2 同理

## 复杂度分析

时间复杂度：`O(n+m)`, 其中 n 和 m 分别为两个链表的长度。因为每次调用递归都会去掉 list1 或者 list2 的头节点（直到至少有一个链表为空）, 函数 mergeTwoList 至多只会递归调用每个节点一次。因此, 时间复杂度取决于合并后的链表长度, 即 `O(n+m)`。

空间复杂度：`O(n+m)`, 其中 n 和 m 分别为两个链表的长度。递归调用 mergeTwoLists 函数时需要消耗栈空间, 栈空间的大小取决于递归调用的深度。结束递归调用时 mergeTwoLists 函数最多调用 n+m 次, 因此空间复杂度为 `O(n+m)`。
