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
        <div v-if="isLoading" class="skeleton-wrapper h-96">
          <NSkeleton height="300px" width="50px"/>
          <NSkeleton height="150px" width="50px"/>
          <NSkeleton height="200px" width="50px"/>
          <NSkeleton height="70px" width="50px"/>
        </div>
        <div v-else class="h-fit">
          <LazyDashboardChart2
              v-show="graphData && graphData.length > 0"
              :chart-data="graphData"
              :period-selected="period"
              :project-id="projectId"
              :user="user"
          />
          <div v-show="graphData && graphData.length === 0 && !isLoading" class="h-96 flex justify-center items-center">
            <NEmpty description="Não há dados no período selecionado"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {NEmpty, NSkeleton, NSlider} from "naive-ui";

const props = defineProps({
  title: {type: String, default: "Titulo do grafico"},
  projectId: {type: Number},
  interval: {type: Number, default: 30000}
});

// providers
const nuxtApp = useNuxtApp();

//async data
const {
  data: response,
  refresh,
  pending: isLoading,
} = await useLazyAsyncData(`graph-second-key-${Math.random()}`, () =>
    nuxtApp.$repo.dash.secondGraph({
      projectId: props.projectId,
      periodSelected: period.value,
    })
);

// ref|data
const period = ref(7);
const periodMarks = {
  7: "7 dias",
  15: "15 dias",
  30: "1 mês",
};
const graphData = ref([]);
const intervalToRefresh = ref(null);


// methods
const refreshData = () => {
  intervalToRefresh.value = setInterval(async () => {
    await refresh()
  }, props.interval);
}

// watchs 
watch(response, () => {
  if (response.value && response.value.avgNotes) {
    graphData.value = response.value.avgNotes;
  }
});

watch(period, async () => {
  graphData.value = [];
  await refresh();
});

watch(
    () => props.projectId,
    () => {
      setTimeout(() => {
        refresh();
      }, 150);
    }
);

refreshData();


onBeforeUnmount(() => {
  clearInterval(intervalToRefresh.value)
});
</script>

<style scoped>
.skeleton-wrapper {
  @apply flex gap-2 justify-center  rotate-180;
}
</style>
