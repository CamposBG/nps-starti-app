<template>
  <div>
    <VueEcharts :option="chartData" class="h-96" />
  </div>
</template>
<script script setup>
import { VueEcharts } from "vue3-echarts";

const nuxtApp = useNuxtApp();

const chartData = {
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Fev", "Mar"],
  },
  grid: {
    top: "3%",
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  animationDelay: 1000,
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [1, 2, 3],
      type: "bar",
      itemStyle: {
        color: "rgb(59, 130, 246)",
      },
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
};
</script>
