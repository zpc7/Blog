## 检查当前 Tab 页是否在前台
我们可以通过使用 `document.hidden` 属性来检查当前标签页是否在前台中。

```js
const isBrowserTabInView = () => document.hidden;

isBrowserTabInView();

// Result: returns true or false depending on if tab is in view / focus
```

`document.hidden` 有什么用处呢?

其可以搭配 `visibilitychange` 事件使用, 一些常见的场景, 例如: 当前网页正在播放音视频, 切换到其他Tab页或浏览器最小化后, 音视频暂停播放, 重新回到当前网页后恢复播放.

`visibilitychange` 的简要说明如下:
> 当其选项卡的内容变得可见或被隐藏时，会在文档上触发 visibilitychange (能见度更改)事件

[visibilitychange MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

[HTML5事件—visibilitychange 页面可见性改变事件](https://blog.csdn.net/yusirxiaer/article/details/73480916)

[浏览器visibilitychange事件](https://www.cnblogs.com/lindsayzhao103011/p/8884418.html)

