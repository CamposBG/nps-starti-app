<template>
  <div>
    <div id="graph-1" class="border border-gray-200 rounded-sm shadow-sm">
      <div class="w-full h-10 bg-slate-200 flex items-center pl-5 shadow-md">
        <h1 class="text-xl font-semibold text-gray-700 tracking-wide">
          {{ title }}
        </h1>
      </div>
      <div class="time-selector px-5">
        <n-slider
          v-model:value="period"
          :marks="periodMarks"
          step="periodMarks"
          :max="30"
          :min="0"
        />
      </div>
      <div id="graph-wrapper" class="p-5 max-h-96">
        <div v-if="isLoading" class="skeleton-wrapper h-max">
          <n-skeleton height="300px" width="50px" />
          <n-skeleton height="150px" width="50px" />
          <n-skeleton height="200px" width="50px" />
          <n-skeleton height="70px" width="50px" />
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NSkeleton, NSlider } from "naive-ui";

const props = defineProps({
  title: { type: String, defalt: "Titulo do grafico" },
  user: { type: Object },
  projectId: { type: Number },
});

// ref|data
const isLoading = ref(true);
const periosSelected = ref();
const period = ref(7);
const periodMarks = {
  7: "7 dias",
  15: "15 dias",
  30: "1 mês",
};

// methods
const handleTimeOptions = (key) => {
  periosSelected.value = key;
};
</script>

<style scoped>
.skeleton-wrapper {
  @apply flex gap-2 justify-center  rotate-180;
}
</style>
