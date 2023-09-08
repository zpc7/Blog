<template>
  <div class="text-input">
    <input v-model="input" placeholder="输入..." />
  </div>
  <div class="container">
    <div class="mask">
      <div class="content">{{ input }}</div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const input = ref('穿透效果')

</script>


<style lang="less" scoped>
.text-input {
  margin: 10px 0;
  font-size: 20px;
}

.container {
  --bg: url(/parallax/cool-background-1.png) no-repeat center/cover;
  height: 80vh;
  background: var(--bg);

  .mask {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;

    .content {

      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 100px;
      font-weight: bold;
      // 文字描边
      text-stroke: 1px #fff;
      -webkit-text-stroke: 1px #fff;

      // 背景图设置为跟容器一致
      background: var(--bg);
      // 设置背景图的覆盖区域
      background-clip: text;
      -webkit-background-clip: text;

      // 文字设置为透明
      color: transparent;
    }
  }
}
</style>