# 配置多个 `remote`

在 Git 中配置多个 remote 允许你将代码推送到或从多个远程仓库拉取代码。这在以下情况下非常有用：

1. **同步代码到多个仓库**（例如同时推送到 GitHub 和 GitLab）
2. **使用不同的远程仓库进行协作**（例如公司和个人仓库）

## `git push`

在 Git 中，执行 `git push` 命令时，如果没有指定远程仓库和分支，它默认会将当前分支推送到默认的远程仓库和分支

默认远程仓库通常是 `origin`，默认分支通常是与当前分支同名的远程分支（如果当前分支是 `main`，则推送到远程的 `main` 分支）

### 设置上游分支

如果没有设置上游分支，`git push` 命令将无法推送，或者你会需要明确指定远程仓库和分支。可以使用以下命令设置上游分支：

```bash
git push --set-upstream origin main
# 简写: git push -u origin main
```

这将设置当前分支（例如 `main`）的上游分支为 `origin/main`。之后，你只需运行 `git push`，它将自动推送到 `origin/main`

`git push` 等同于 `git push origin main`

## 配置多个 remote 的步骤

### `push` 时自动推送 ⭐

1. 给默认 remote 添加新的 url

```bash
git remote set-url --add origin git@zpc:zpc7/xxxxx.git
```

2. 查看远程仓库情况

```bash
git remote -v
# origin  https://github.com/user/repo.git (fetch)
# origin  https://github.com/user/repo.git (push)
# origin  git@zpc:zpc7/xxxxx.git (push)
```

3. 后续想要修改 remote

```bash
# 删除所有 URL
git config --unset-all remote.origin.url
# 重新设置正确的 URL
git remote set-url origin https://new.url/repo.git
# 验证设置
get remote -v
```

### 手动指定推送

1. 查看当前配置的 remote

```bash
git remote -v
# origin	git@zpc:zpc7/Blog.git (fetch)
# origin	git@zpc:zpc7/Blog.git (push)
```

这会显示当前配置的所有远程仓库及其对应的 URL。

2. 添加新的 remote 使用 `git remote add` 命令添加新的远程仓库。

例如，添加一个名为 `origin` 的 remote 和一个名为 `backup` 的 remote：

```bash
# 添加第一个远程仓库
git remote add origin https://github.com/user/repo.git
# 添加第二个远程仓库
git remote add backup https://gitlab.com/user/repo.git
```

3. 推送代码到多个 remote, 分别执行推送命令：

```bash
# 推送到 origin
git push origin main
# 推送到 backup
git push backup main
```

5. 拉取代码, 可以从多个 remote 拉取代码。指定 remote 名称即可：

```bash
# 从 origin 拉取
git pull origin main
# 从 backup 拉取
git pull backup main
```

6. 移除和修改 remote

```bash
# 移除 remote
git remote remove backup
# 修改 remote URL
git remote set-url origin https://new-url.com/user/repo.git
```

## 鸣谢

- [一个项目 push 到多个远程 Git 仓库](https://segmentfault.com/a/1190000011294144)
