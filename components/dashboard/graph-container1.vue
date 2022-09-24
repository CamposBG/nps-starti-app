<template>
  <div>
    <div id="graph-1" class="border border-gray-200 rounded-sm shadow-sm">
      <div class="w-full h-10 bg-slate-200 flex items-center pl-5 shadow-md">
        <h1 class="text-xl font-semibold text-gray-700 tracking-wide">
          {{ title }} {{ projectId }}
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
        <div v-if="pending" class="skeleton-wrapper h-max">
          <n-skeleton height="300px" width="50px" />
          <n-skeleton height="150px" width="50px" />
          <n-skeleton height="200px" width="50px" />
          <n-skeleton height="70px" width="50px" />
        </div>
        <div v-else class="w-auto h-96">
          <!-- <DashboardChart1 /> -->
          <DashboardChart1 :graph-data="dataFilterd2[0].score" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NSkeleton, NSlider, pProps } from "naive-ui";

const props = defineProps({
  title: { type: String, defalt: "Titulo do grafico" },
  user: { type: Object },
  projectId: { type: Number },
});
// providers
const nuxtApp = useNuxtApp();

//async data
const {
  data: response,
  refresh,
  pending,
} = await useLazyAsyncData(`graph-key-${Math.random()}`, () =>
  nuxtApp.$repo.dash.firstGraph({
    userId: props.user.id,
    projectId: props.projectId,
    periodSelected: period.value,
  })
);

// ref|data
const graphData = ref(null);
const period = ref(7);
const periodMarks = {
  7: "7 dias",
  15: "15 dias",
  30: "1 mês",
};

// methods

watch(response, () => {
  if (response.susses === true) {
    graphData.value = response;
  }
});
watch(period, () => {
  refresh();
});
watch(
  () => props.projectId,
  (agora, antes) => {
    setTimeout(() => {
      refresh();
    }, 150);
  }
);

// FAKE DATA
const graphData1 = {
  success: true,
  data: [],
};

function generateRandom(min, max, isInteger) {
  const randownNumber = Math.random() * (max - min + 1) + min;
  if (isInteger) {
    return Math.floor(randownNumber);
  } else {
    return randownNumber.toFixed(2);
  }
}

function populateG1Fake() {
  graphData1.data = [
    {
      period: 7,
      score: generateRandom(1, 10, false),
    },
    {
      period: 15,
      score: generateRandom(1, 10, false),
    },
    {
      period: 30,
      score: generateRandom(1, 10, false),
    },
  ];
}
populateG1Fake();

//computed
const dataFilterd2 = computed(() => {
  return graphData1.data.filter((vote) => vote.period === period.value);
});
</script>

<style scoped>
.skeleton-wrapper {
  @apply flex gap-2 justify-center  rotate-180;
}
</style>
