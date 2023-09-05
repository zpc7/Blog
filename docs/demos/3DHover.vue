<template>
  <div class="card" v-on="{ mousemove: onMouseMove, mouseleave: onMouseLeave }" ref="cardRef">
    <img src="/pokemon.png" alt="">
  </div>
</template>

<script setup>
import { ref } from 'vue'
const rotatePosition = ref({
  rx: 0,
  ry: 0
})
const cardRef = ref(null)

const xRange = [-20, 20]
const yRange = [-20, 20]

const getRotate = (range, value, max) => {
  return (value / max) * (range[1] - range[0]) + range[0]
}

const onMouseMove = (e) => {
  const { offsetX, offsetY } = e
  const { offsetWidth, offsetHeight } = cardRef?.value

  const ry = -getRotate(yRange, offsetX, offsetWidth)
  const rx = getRotate(xRange, offsetY, offsetHeight)

  rotatePosition.value = {
    rx: rx + 'deg',
    ry: ry + 'deg'
  }
}
const onMouseLeave = () => {
  rotatePosition.value = {
    rx: 0 + 'deg',
    ry: 0 + 'deg'
  }
}


</script>

<style scoped lang="less">
.card {
  width: 200px;
  border-radius: 10px;
  transition: 0.3s;
  transform: perspective(500px) rotateX(v-bind("rotatePosition.rx")) rotateY(v-bind("rotatePosition.ry"));

  img {
    border-radius: inherit;
    width: 100%;
  }

  &:hover {
    box-shadow: -3px -3px 10px #54a29e, 3px 3px 10px #a79d66;
  }
}
</style>