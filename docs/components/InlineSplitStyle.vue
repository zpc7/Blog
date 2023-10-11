<template>
  <div>
    <button class="toggle-button" @click="toggleStatus = !toggleStatus">点我 Toggle, 当前: {{ boxDecorationBreak }}</button>
  </div>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates nemo ducimus eveniet, illum repudiandae atque
    similique aspernatur adipisci a neque recusandae vitae quibusdam aliquam ad, odio deserunt cum ipsa libero. Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Fuga et asperiores eligendi quae iste repellendus eos quia,
    sapiente nihil sint dignissimos tempore quidem autem consequatur ipsa aliquid earum fugiat corporis? Lorem ipsum dolor
    sit amet, consectetur adipisicing elit. Ullam iure beatae, consequatur dignissimos unde maxime incidunt quidem quaerat
    minus? <span class="inline-element">Officia eveniet beatae velit fuga praesentium dolorem impedit necessitatibus
      suscipit ex?</span>
    Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Laboriosam voluptates dignissimos animi modi quis quae hic quisquam maxime ipsum
    reprehenderit, dolorum cumque itaque libero culpa quia veniam quidem officia? Possimus.
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
const toggleStatus = ref(false)

const boxDecorationBreak = computed(() => toggleStatus.value ? 'clone' : 'slice')

</script>


<style lang="less" scoped>
.toggle-button {
  border: 1px solid #cad;
  padding: 5px 10px;
}

.inline-element {
  background-color: aquamarine;
  border: 1px solid blueviolet;
  box-decoration-break: v-bind(boxDecorationBreak);
  -webkit-box-decoration-break: v-bind(boxDecorationBreak);
}
</style>