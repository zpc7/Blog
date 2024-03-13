<template>
  <div class="app">
    <div class="buttons">
      <el-button
        type="primary"
        @click="handlePrev"
        :disabled="!ctx.hasPrev || isLoading"
      >
        上一步
      </el-button>
      <el-button
        type="primary"
        @click="handleNext"
        :disabled="!ctx.hasNext || isLoading"
      >
        下一步
      </el-button>
    </div>
    <h1 class="title">
      {{ ctx.currentIndex + 1 }} / {{ ctx.stages.length }}
      {{ ctx.currentStage.name }}
    </h1>
    <div class="desk">
      <CardDesk v-bind="ctx.desk"></CardDesk>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ElMessageBox,
  ElMessageBoxOptions,
  ElButton,
  ElInputNumber,
  ElRadioGroup,
  ElRadioButton,
} from 'element-plus';
import CardDesk from './components/CardDesk.vue';
import { InteractiveDescriptor, StageContext } from './components/stages';
import { h, reactive, ref } from 'vue';
const ctx = reactive(new StageContext(500));
const isLoading = ref(false);
play();
async function play() {
  if (isLoading.value) return;
  isLoading.value = true;
  const desc = ctx.getInteractiveDescriptor();
  if (desc.type === 'none') {
    const opt = desc.getOptions();
    await ctx.play(opt);
  } else {
    const opt = await confirm(desc);
    await ctx.play(opt);
  }
  isLoading.value = false;
}
function handleNext() {
  ctx.next();
  play();
}

function handlePrev() {
  ctx.undo();
  ctx.prev();
}

async function confirm(desc: InteractiveDescriptor) {
  return new Promise(async (resolve) => {
    const v = ref<any>();
    const options: ElMessageBoxOptions = {
      title: desc.title,
      confirmButtonText: '确定',
      showClose: false,
      closeOnClickModal: false,
    };
    if (desc.type === 'number') {
      v.value = desc.payload.defaultValue;
      options.message = () =>
        h(ElInputNumber, {
          modelValue: v.value,
          min: desc.payload.min,
          max: desc.payload.max,
          step: 1,
          stepStrictly: true,
          valueOnClear: desc.payload.defaultValue,
          'onUpdate:modelValue': function (cur: number | undefined) {
            if (cur === undefined || cur === null) return;
            v.value = cur!;
          },
        });
    } else if (desc.type === 'radio') {
      v.value = desc.payload.defaultValue;
      options.message = () =>
        h(
          ElRadioGroup,
          {
            modelValue: v.value,
            'onUpdate:modelValue': function (cur) {
              v.value = cur;
            },
          },
          desc.payload.options.map((option: any) =>
            h(
              ElRadioButton,
              {
                label: option.value,
                border: true,
                size: 'large',
              },
              option.label
            )
          )
        );
    }
    await ElMessageBox(options);
    resolve(desc.getOptions(v.value));
  });
}
</script>

<style scoped>
.app {
  background: #000;
  height: 100vh;
}
.title {
  color: #fff;
  text-align: center;
  margin: 50px auto;
}
.desk {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  /* background: lightblue; */
  margin-top: 50px;
}
.buttons {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
