# css
* [浅谈逻辑选择器 is、where、not、has](https://mp.weixin.qq.com/s/QBEYNDJz54qcAo1IVZ45pg)
* [重排(reflow)和重绘(repaint)](https://juejin.cn/post/6844904083212468238)
* [2023年，回看CSS方案生态全貌](https://juejin.cn/post/7285313335682695228)

## 左边定宽 右边自适应

要实现左边固定宽度、右边自适应的布局，你可以使用 CSS 中的 Flexbox 或 Grid 布局。下面是两种方法的示例：

**Flexbox 布局：**

```html
<div class="container">
  <div class="left">固定宽度</div>
  <div class="right">自适应</div>
</div>
```

```css
.container {
  display: flex;
}

.left {
  width: 200px;
  /* 左边固定宽度 */
  background-color: lightgray;
}

.right {
  flex: 1;
  /* 右边自适应 */
  background-color: lightblue;
}
```

**Grid 布局：**

```html
<div class="container">
  <div class="left">固定宽度</div>
  <div class="right">自适应</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  /* 列定义，第一列固定宽度，第二列自适应 */
  grid-gap: 10px;
  /* 列之间的间隔 */
}

.left {
  background-color: lightgray;
}

.right {
  background-color: lightblue;
}
```

以上两种方法都可以实现左边固定宽度、右边自适应的布局。你可以根据实际情况选择适合你的布局方式。使用 Flexbox 和 Grid 可以在不使用复杂的浮动和定位的情况下实现灵活的布局效果。
