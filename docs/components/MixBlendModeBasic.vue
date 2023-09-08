<template>
  <div class="basic-demo"></div>
</template>


<script setup>


</script>


<style lang="less" scoped>
.basic-demo {
  height: 280px;
  position: relative;
  background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%);

  &::before {
    content: "TENET 0.0 TENET";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 60px;
    white-space: nowrap;
    mix-blend-mode: difference;
    animation: move 3s infinite linear alternate;
  }
}

@keyframes move {
  0% {
    transform: translate(-30%, -50%);
  }

  100% {
    transform: translate(-70%, -50%);
  }
}
</style>