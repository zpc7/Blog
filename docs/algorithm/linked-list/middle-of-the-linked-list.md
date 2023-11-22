# 链表的中间结点
[876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/description/)

## 推荐题解

[快慢指针（注意链表长度为偶数时，返回第 2 个结点的细节）](https://leetcode.cn/problems/middle-of-the-linked-list/solutions/165152/kuai-man-zhi-zhen-zhu-yao-zai-yu-diao-shi-by-liwei/)

## 快慢指针解法

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
var middleNode = function (head) {

    // 快慢指针
    let slow = head;
    let fast = head;

    // 这里需要判断fast的原因是, fast = fast.next.next 这条赋值语句中, fast可能会变为 null
    // 注意这里在偶数的情况, 慢指针就在第二个节点, 可以使用[1,2,3,4,5,6] 这个示例验证
    while (fast && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next
    }

    return slow;
};
```
