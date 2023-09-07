<template>
  <div class="slide">
    <div class="content">
      Home
    </div>
    <div class="fixed bg1"></div>
  </div>
  <div class="slide">
    <div class="content">
      Page
    </div>
    <div class="fixed bg2"></div>
  </div>
  <div class="slide">
    <div class="content">
      Footer
    </div>
    <div class="fixed bg3"></div>
  </div>
  <div class="slide">
    <div class="content">
      More..
    </div>
    <div class="fixed bg4"></div>
  </div>
</template>

<style scoped lang="less">
.slide {
  position: relative;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 90px;
    color: #fff;
  }

  .fixed {
    background-attachment: fixed;
    background-repeat: no-repeat;
    height: 90vh;

    &.bg1 {
      background-image: url('/parallax/cool-background-1.png');
    }

    &.bg2 {
      background-image: url('/parallax/cool-background-2.png');
    }

    &.bg3 {
      background-image: url('/parallax/cool-background-3.png');
    }

    &.bg4 {
      background-image: url('/parallax/cool-background-4.png');
    }
  }
}
</style>