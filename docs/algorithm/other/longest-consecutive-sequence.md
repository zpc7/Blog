# 最长连续序列
[128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked)

## 推荐题解

* [给出了几个方法，并查集方法不会（贴出了大佬的并查集题解视频链接）](https://leetcode.cn/problems/longest-consecutive-sequence/solutions/277084/fang-fa-cong-yi-dao-nan-bing-cha-ji-fang-fa-bu-hui/?envType=study-plan-v2&envId=top-100-liked)
* [最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/solutions/276931/zui-chang-lian-xu-xu-lie-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked)

## 哈希

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    const set = new Set(nums) // set存放数组的全部数字
    let max = 0
    for (let i = 0; i < nums.length; i++) {
        if (!set.has(nums[i] - 1)) { // nums[i]没有左邻居，是序列的起点
            let count = 1
            let cur = nums[i]
            
            while (set.has(cur + 1)) { // cur有右邻居cur+1
                cur++ // 更新cur
                count++
            }
            max = Math.max(max, count) // cur不再有右邻居，检查count是否最大
        }
    }
    return max

};
```
