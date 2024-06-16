# 二叉树的路径总和
[113. 路径总和 II](https://leetcode.cn/problems/path-sum-ii/description/)

## 推荐题解

* [leetcode🧑‍💻 113. 路径总和 II](https://ricepudding.cn/article/b6adebdf)
* [二叉树回溯，击败93%](https://leetcode.cn/problems/path-sum-ii/solutions/2529613/javascript-er-cha-shu-hui-su-ji-bai-93-b-o6cm/)

## DFS+回溯

```typescript
// Definition for a binary tree node.
 class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    let res: number[][] = []

    function dfs(node: TreeNode | null, path: number[], sum: number) {
        if (node === null) return

        path.push(node.val) // 记录路径
        sum += node.val // 累加

        // 该节点为叶子结点, 并且和等于目标值, 则将路径加入结果集
        if (sum === targetSum && !node.left && !node.right) {
            res.push([...path]) // path 是引用类型, 需要拷贝一份
            path.pop() // path开始 回溯, 因为当前路径已经找到了
            // sum -= node.val  注意!! 这里不要像path再减了, 因为这里的sum是基础类型, 只在当前函数中用到, 不需要回溯
            return;
        }
        dfs(node.left, path, sum)
        dfs(node.right, path, sum)
        path.pop() // path开始 回溯, 因为当前节点和其左右子树都遍历完了
    }

    dfs(root, [], 0)
    return res
}
```
