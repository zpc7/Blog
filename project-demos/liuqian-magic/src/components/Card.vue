<template>
  <div class="card" :class="card.tear" :key="card.cardId">
    <img
      :src="card.imagePath"
      :alt="card.value"
      :class="`card-img ${card.tear}`"
    />
  </div>
</template>

<script setup lang="ts">
import { Card } from './card';

const card = defineProps<Card>();
</script>

<style scoped>
.card {
  position: absolute;
  outline: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.5s, opacity 0.5s, left 0.5s, top 0.5s;
  /* transition: 0.5s; */
  filter: drop-shadow(0 0 0.5rem #0005);
}
.card.keep-top {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.card.keep-bottom {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.card-img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.card-img.keep-bottom {
  top: auto;
  bottom: 0;
}
</style>
