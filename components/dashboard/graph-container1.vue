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
          :max="30"
          :min="0"
          step="periodMarks"
        />
      </div>
      <div id="graph-wrapper" class="max-h-96">
        <div class="w-auto h-96">
          <LazyDashboardChart1
            v-if="projectType === 1 && graphData"
            :graph-data="graphData"
          />
          <LazyDashboardChart1Type2
            v-else-if="projectType === 2 && graphData"
            :graph-data="graphData"
          />
          <div
            v-show="!graphData"
            class="h-96 flex justify-center items-center"
          >
            <NEmpty description="Não há dados no período selecionado" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NEmpty, NSlider } from "naive-ui";

const props = defineProps({
  title: { type: String, default: "Titulo do grafico" },
  projectId: { type: Number },
  interval: { type: Number, default: 0 },
  projectType: { type: Number },
});
// providers
const nuxtApp = useNuxtApp();

//async data
const { data: response, refresh } = await useLazyAsyncData(
  `graph-key-${Math.random()}`,
  () =>
    nuxtApp.$repo.dash.firstGraph({
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
const intervalToRefresh = ref(null);

// methods
const refreshData = () => {
  if (props.interval) {
    intervalToRefresh.value = setInterval(async () => {
      await refresh();
    }, props.interval);
  }
};

// watch

watch(response, () => {
  graphData.value = null;
  if (response.value?.avgNote) {
    graphData.value = response.value.avgNote;
  }
});

watch(period, async () => {
  await refresh();
});

watch(
  () => props.projectId,
  () => {
    graphData.value = null;
    period.value = 7;
    setTimeout(async () => {
      await refresh();
    }, 150);
  }
);

watch(
  () => props.interval,
  (newValue) => {
    if (newValue !== 0) {
      clearInterval(intervalToRefresh.value);
      refreshData();
    } else clearInterval(intervalToRefresh.value);
  }
);

onBeforeUnmount(() => {
  clearInterval(intervalToRefresh.value);
});
</script>
