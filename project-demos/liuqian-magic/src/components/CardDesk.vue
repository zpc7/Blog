<template>
  <div class="container" ref="containerEl">
    <div class="inner" v-if="isRendered">
      <TransitionGroup appear name="fade">
        <Card
          v-for="renderCard in renderCards"
          :key="renderCard.card.cardId"
          v-bind="renderCard.card"
          :style="{
            ...renderCard.styles,
          }"
        ></Card>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Desk } from './desk';
import { useResizeObserver } from '@vueuse/core';
import Card from './Card.vue';
import { useRenderCards } from './useRenderCards';
const desk = defineProps<Desk>();
const containerEl = ref<HTMLElement | null>(null);
const containerSize = reactive({ width: 0, height: 0 });
const isRendered = ref(false);
useResizeObserver(containerEl, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  containerSize.width = width;
  containerSize.height = height;
  isRendered.value = true;
});
const renderCards = useRenderCards(desk, isRendered, containerSize);
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.inner {
  width: 100%;
  height: 100%;
  position: relative;
}
.fade-enter-from {
  transform: translateY(-50px);
}
.fade-leave-to {
  transform: translateY(-50px);
}
</style>
