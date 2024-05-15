# 包管理器

`npm` `pnpm` `yarn`

## package.json

[关于前端大管家 package.json，你知道多少？](https://mp.weixin.qq.com/s/Np-tDI84_VTJPHAIAl8aGQ)

## pnpm

[剖析 pnpm 的优势与原理](https://mp.weixin.qq.com/s/E4VEqdMfS9Ea4ijZcqLSOw)

## npm 模块安装机制?

1. `npm` 会检查本地的 `node_modules` 目录中是否已经安装过该模块，如果已经安装，则不再重新安装
2. `npm` 检查缓存中是否有相同的模块，如果有，直接从缓存中读取安装
3. 如果本地和缓存中均不存在, `npm` 会从 `registry` 指定的地址下载安装包，然后将其写入到本地的 `node_modules` 目录中，同时缓存起来

### npm 缓存相关命令

```sh
# 清除缓存
npm cache clean -f

# 获取缓存位置
# 示例输出: /Users/pczheng/.npm
npm config get cache

# 设置缓存位置
npm config set cache '新的缓存位置'
```

## yarn

## npm package

- [图文结合简单易学的 npm 包的发布流程](https://mp.weixin.qq.com/s/oFMz9BQCNXmCdNbhA75jfg)
