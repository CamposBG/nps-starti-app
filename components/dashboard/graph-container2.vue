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
      <div id="graph-wrapper" class="max-h-96">
        <div v-if="!isLoading" class="skeleton-wrapper h-max">
          <n-skeleton height="300px" width="50px" />
          <n-skeleton height="150px" width="50px" />
          <n-skeleton height="200px" width="50px" />
          <n-skeleton height="70px" width="50px" />
        </div>
        <div v-else class="h-fit">
          <DashboardChart2
            :user="user"
            :project-id="projectId"
            :period-selected="period"
            :chart-data="graphFakeData.data"
          />
        </div>
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
const period = ref(7);
const periodMarks = {
  7: "7 dias",
  15: "15 dias",
  30: "1 mês",
};

// methods
let graphFakeData = {
  success: true,
  data: [],
};

function generateRandom(min, max, isInteger) {
  const randownNumber = Math.random() * (max - min) + min;
  if (isInteger) {
    return Math.floor(randownNumber);
  } else {
    return randownNumber.toFixed(2);
  }
}

function populateG2Fake(period) {
  let InitialDay = 1;
  for (let index = 0; index < period; index++) {
    graphFakeData.data.push({
      date: `2022-09-${InitialDay}`,
      score: generateRandom(1, 10, false),
    });
    InitialDay++;
  }
}
populateG2Fake(period.value);

watch(period, () => {
  graphFakeData.data = [];
  populateG2Fake(period.value);
  console.log(graphFakeData);
});
</script>

<style scoped>
.skeleton-wrapper {
  @apply flex gap-2 justify-center  rotate-180;
}
</style>
