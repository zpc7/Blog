<template>
  <div>
    <div class="operation">
      切换 Mode
      <button @click="currentMode = 'overlay'">overlay</button>
      <button @click="currentMode = 'difference'">difference</button>
      <button @click="currentMode = 'saturation'">saturation</button>
      <button @click="currentMode = 'soft-light'">soft-light</button>
      <button @click="currentMode = 'color'">color</button>
    </div>
    <div class="container">
      <img src="/parallax/cool-background-1.png" v-on:mousemove="onMouseMove">
      <div id="flashlight" ref="lightRef"></div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
const lightRef = ref(null)
const currentMode = ref('difference')

const onMouseMove = (e) => {
  const { offsetX, offsetY } = e

  const x = offsetX - 75 < 0 ? 0 : offsetX - 75;
  const y = offsetY - 75 < 0 ? 0 : offsetY - 75;

  lightRef.value.style.left = `${x}px`;
  lightRef.value.style.top = `${y}px`;
}

</script>

<style lang="less" scoped>
button {
  background-color: #1081de;
  border-radius: 8px;
  padding: 0 10px;
  line-height: 38px;
  font-size: 14px;
  margin: 0 8px;
  color: white;
}

.operation {
  margin-bottom: 15px;
}

.container {
  position: relative;

  #flashlight {
    position: absolute;
    width: 150px;
    aspect-ratio: 1;
    border-radius: 100%;
    top: 0;
    left: 0;

    background-color: white;
    mix-blend-mode: v-bind(currentMode);
  }
}
</style>