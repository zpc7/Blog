# CSS 居中

```html
HTML基本结构 块级元素:
<div class="parent">
  <div class="child">child</div>
</div>

行内元素:
<div class="parent">
  <span class="child">child</span>
</div>
```

## 水平居中

1. 行内元素水平居中, 父级设置 `text-align` 即可

   ```css
   .parent {
     text-align: center;
   }
   ```

2. 块级元素水平居中

   - 宽度确定时

   ```css
   .child {
     width: 200px;
     margin: 0 auto;
     background-color: red;
   }
   ```

   - 宽度不确定时

   ```css
   // 方法1: 通过给要居中显示的元素，设置 display:table; margin:0 auto;
   .child {
     display: table;
     margin: 0 auto;
     background-color: red;
   }

   // 方法2: flex 居中
   .parent {
     display: flex;
     justify-content: center;
   }
   .child {
     background-color: red;
   }

   // 方法3: 父级居中,子元素设置 display: inline-block;
   .parent {
     text-align: center;
   }
   .child {
     display: inline-block;
     background-color: red;
   }
   ```

## 垂直居中

1. 行内元素, 单行文字垂直居中 配置`line-height`属性值等于`height`即可
2. 块级元素垂直居中

   - 居中元素高度不确定时(但父级元素高度确定)

   ```css
   // 方法1: 使用flex 居中
   .parent {
     width: 300px;
     height: 150px;
     background-color: green;
     display: flex;
     align-items: center;
   }
   .child {
     background-color: red;
   }

   // 方法2: 使用绝对定位50% + translate -50%
   // 注:CSS3 中新增的 transform，其 translate 属性是根据元素自身计算的。例如：设置 transform: translateX(-50%);，元素会向左偏移自身宽度的一半

   .parent {
     width: 300px;
     height: 150px;
     background-color: green;
     position: relative;
   }
   .child {
     background-color: red;
     position: absolute;
     top: 50%;
     transform: translate(0, -50%);
   }
   ```

   - 居中元素高度确定时

   ```css
   // 方法1:使用绝对定位 + 负margin
   .parent {
     width: 300px;
     height: 150px;
     background-color: green;
     position: relative;
   }
   .child {
     width: 200px;
     height: 80px;
     background-color: red;
     position: absolute;
     top: 50%;
     margin-top: -40px; // 居中元素高度的一半
   }

   // 方法2:使用绝对定位 + top和bottom设为0 + margin:auto
   .parent {
     width: 300px;
     height: 150px;
     background-color: green;
     position: relative;
   }
   .child {
     width: 200px;
     height: 80px;
     background-color: red;
     position: absolute;
     top: 0;
     bottom: 0;
     margin: auto;
   }
   ```

## 水平垂直居中

沿用上文中的思路, 即可举一反三

- flex 方案 (居中元素宽高**不确定**时)

```css
.parent {
  width: 300px;
  height: 150px;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
}
.child {
  background-color: red;
}
// 或者
.parent {
  width: 300px;
  height: 150px;
  background-color: green;
  display: flex;
}
.child {
  background-color: red;
  margin: auto;
}
```

- grid 方案 (居中元素宽高**不确定**时)

```css
.parent {
  width: 300px;
  height: 150px;
  background-color: green;
  display: grid;
}
.child {
  background-color: red;

  justify-self: center;
  align-self: center;

  // 或者使用如下属性替代上面两个属性
  margin: auto;
}
```

- 绝对定位 + translate 方案 (居中元素宽高**不确定**时)

```css
.parent {
  width: 300px;
  height: 150px;
  background-color: green;
  position: relative;
}
.child {
  background-color: red;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

- absolute + calc 方案 (居中元素宽高**确定**时)

```css
.parent {
  width: 300px;
  height: 150px;
  background-color: green;
  position: relative;
}
.child {
  background-color: red;
  width: 150px;
  height: 50px;
  position: absolute;
  left: calc(50% - 75px); // 150/2
  top: calc(50% - 25px); // 50/2
}
```

- absolute + 负 margin 方案 (居中元素宽高**确定**时)

```css
.parent {
  width: 300px;
  height: 150px;
  background-color: green;
  position: relative;
}
.child {
  background-color: red;
  width: 150px;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
```
> 该方案的原理是：使用了 CSS 中的定位属性（absolute、fixed 等）后，如果 left 设置了具体值，没有设置 right 和 width，那么就会自动计算，把剩余的空间分配给 right 和 width。如果 left、right 和 width 都设置了具体值，并且没有占满横向空间，那么剩余空间就处于待分配状态，此时设置 margin: auto; 意味着把剩余的空间分配给 margin，并且左右均分，所以就实现了水平居中，垂直方向同理。

> 但是要知道该方法的副作用：  
> left: 0; right: 0; 相当于 width: 100%;  
> top: 0; bottom: 0; 相当于 height: 100%;  
> 注意: 需要确定居中元素的宽高，否则其宽高会被设为 100%（副作用）
