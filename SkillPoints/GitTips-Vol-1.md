#### git log --oneline (--pretty=oneline  --pretty:创建高级自定义输出)
将提交历史纪录表现为一行显示

#### git log --graph
图形化展示
组合:git log --oneline --graph

#### git log -p
显示补丁
`git log -p filename` 查看单个文件在历次提交中的详细变更

#### **git log --stat**
显示 在每个提交(commit)中有哪些文件被修改了, 这些文件分别添加或删除了多少行内容.

---
#### **git blame [fileName]**
文件的每一行的详细修改信息:包括SHA串,日期和作者(甩锅必备)

#### git blame -L 40,+10 [fileName]
指定开始和结束行

---
#### git reflog
查看命令历史

---
#### git diff
显示当前你所有已做的但没有加入到暂存区里的修改

#### **git diff --cached**
哪些文件将被提交(commit)

#### git diff branch2
假设当前分支branch1, `git diff branch2`等价于`git diff branch2 branch1`,结合diff的描述`+ 代码段`或`- 代码段`,表示:在`branch2`上执行`+ 代码段`/`- 代码段`操作后能得到`branch1`.

---
#### git stash save "desc"
设置本次stash操作的备注
`git stash apply` 和 `git stash pop`的区别 : 前者不会从stash list中 中移除,移除请使用`git stash drop`

---
#### git checkout  -b local_branch origin/remote_branch
拉取远端分支到本地分支或者创建本地新分支

#### git push -u origin develop
等价 `git push --set-upstream origin develop`  (切出新分支,第一次执行push操作时候用到)
-u的意思是将origin的develop分支设为本地当前仓库的上游。拉取代码时就可以直接执行git pull，而不必添加分支参数)

#### git push origin local_branch:remote_branch
推送本地分支到远程分支，local_branch必须为你本地存在的分支，remote_branch为远程分支，如果remote_branch不存在则会自动创建分支。
类似，`git push origin :remote_branch`，local_branch留空的话则是删除远程remote_branch分支。

#### git branch -r -d origin/branch-name
删除远端分支

#### git branch --set-upstream develop origin/develop
指定本地develop分支与远程origin/develop分支的链接


#### git branch |grep 'branchName' |xargs git branch -D
批量删除分支(通过shell 管道命令来实现的批量删除分支的功能)
```
git branch 输出当前分支列表
grep 是对 git branch 的输出结果进行匹配, 匹配规则为branchName
xargs 的作用是将参数列表转换成小块分段传递给其他命令
这条命令的意思就是:
从分支列表中匹配到指定分支，然后一个一个(分成小块)传递给删除分支的命令，最后进行删除。
```

---
#### **合并多个commit提交**
- git rebase -i [在此之前做合并的commit号(不包括)] 或 git rebase -i HEAD~2 合并最后两个
- 修改为squash 把它与前一提交合并(除了第一行外的其他行,都把pick修改为squash)
- 输入新的commit信息,done!

---


#### git show [commit hash]
显示某次提交的内容变化

#### **git commit --amend**
场景:进行一次提交后,突然意识到某文件有一个`debugger`没有删掉.
解决方案:
1.修复问题,重新提交一次,附上必要的描述信息,结果是多出一条commit信息.
2.修复问题,`git add .` , `git commit --amend`,命令会把最近一次的变更追加到你最新的提交,同时也会给你一个编辑提交信息的机会。
(如果已经推送到远端,就执行`git push -f(--force)`,注:不要在很多人共同工作的分支上这样做 , gitlab上被保护的分支是不能进行强推的!)

---
#### 重置文件

#### git reset --hard [commit hash]
回退到一个特定的历史版本,丢弃这次提交之后的所有变更.

#### git reset [commit hash]
回滚到一个特定的历史版本。将这个版本之后的所有变更移动到“未暂存”的阶段。这也就意味着你需要运行 git add . 和 git commit 才能把这些变更提交到仓库.

#### git reset --soft [commit hash]
回滚到一个特定的历史版本。将这次提交之后所有的变更移动到暂存并准备提交阶段。意味着你只需要运行 git commit 就可以把这些变更提交到仓库。

#### git checkout -- readme.txt
让这个文件回到最近一次git commit或git add时的状态。
`git checkout readme.txt`也是可以的

#### **git reset HEAD readme.txt**
把暂存区的修改撤销掉（unstage），重新放回工作区

#### **git checkout -**
切换到最近使用过的分支

---
