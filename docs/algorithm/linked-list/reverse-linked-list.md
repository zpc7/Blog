# 反转链表

## 推荐题解

- [206. 反转链表（双指针，清晰图解）](https://leetcode.cn/problems/reverse-linked-list/solutions/2361282/206-fan-zhuan-lian-biao-shuang-zhi-zhen-r1jel/)
- [动画演示+多种解法 206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/solutions/36710/dong-hua-yan-shi-206-fan-zhuan-lian-biao-by-user74/)

## 双指针迭代

```js
var reverseList = function (head) {
  let prev = null; // 上一个节点
  let current = head; // 当前的节点

  while (current) {
    let temp = current.next; // 当前节点后面的节点. 方便下一次遍历去拿值
    current.next = prev; // 当前节点的下一个节点,指向原来的上一个节点
    prev = current; // prev 赋值为最终链表的段落, 方便下一次拼接
    current = temp; // 当前设置为最开始存储的值
  }

  return prev;
};
```

## 遍历成数组后, 拼接链表(不推荐)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let arr = [];
  // 先遍历一次, 把链表的所有节点放进数组
  while (head) {
    arr.push(head);
    head = head.next;
  }

  if (arr.length === 0) return head;
  // 当前正在处理的节点
  let currentNode = arr[arr.length - 1];

  let result = currentNode;
  // 反向遍历数组, 依次组装成链表
  for (let i = arr.length - 2; i >= 0; i--) {
    arr[i].next = null;
    currentNode.next = arr[i];
    currentNode = currentNode.next;
  }
  return result;
};
```
