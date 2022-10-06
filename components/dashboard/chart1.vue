<template>
  <div>
    <VueEcharts :option="chartData" class="h-96" ref="graph" />
  </div>
</template>
<script setup>
import { VueEcharts } from "vue3-echarts";

// props
const props = defineProps({
  graphData: { type: Number },
});
// providers

// data|refs
const graph = ref();

const chartData = {
  series: [
    {
      min: 0,
      max: 10,
      type: "gauge",
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.6, " #fd666d"],
            [0.8, "#Beb125"],
            [1, "#25be86"],
          ],
        },
      },
      pointer: {
        itemStyle: {
          color: "auto",
        },
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: "#fff",
          width: 2,
        },
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: "#fff",
          width: 4,
        },
      },
      axisLabel: {
        color: "auto",
        distance: 40,
        fontSize: 20,
      },
      detail: {
        valueAnimation: true,
        formatter: "{value}",
        color: "auto",
      },
      data: [props.graphData],
    },
  ],
};

watch(
  () => props.graphData,
  () => {
    graph.value.setOption({
      series: [
        {
          data: [props.graphData],
        },
      ],
    });
  }
);
</script>
