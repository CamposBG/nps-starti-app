<!-- <template>
  <div id="main" style="height: 100%; width: 100%"></div>
</template>
<script setup>
import * as echarts from "echarts";

// Specify the configuration items and data for the chart
var option = {
  tooltip: {},
  legend: {
    data: ["sales"],
  },
  xAxis: {
    data: ["Shirts", "Cardigans", "Chiffons", "Pants", "Heels", "Socks"],
  },
  yAxis: {},
  series: [
    {
      name: "sales",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};

onMounted(() => {
  var myChart = echarts.init(document.getElementById("main"));
  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);
});
</script> -->
<template>
  <div>
    <VueEcharts :option="chartData" class="h-96" ref="graph" />
    >
  </div>
</template>
<script setup>
import { VueEcharts } from "vue3-echarts";

// props
const props = defineProps({
  graphData: { type: String },
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
//fake data
// onMounted(() => {
//   graph.value.setOption({
//     series: [
//       {
//         data: [props.graphData],
//       },
//     ],
//   });
// });
</script>
