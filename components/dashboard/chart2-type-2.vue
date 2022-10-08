<template>
  <div>
    <VueEcharts ref="graph" :option="chartData" class="h-96" />
  </div>
</template>

<script setup>
import { VueEcharts } from "vue3-echarts";

const props = defineProps({
  chartData: { type: Array, default: [] },
});

const graph = ref(null);

const chartData = {
  tooltip: {
    trigger: "axis",
    formatter: (seriesName) => {
      const formattedDate = seriesName[0].axisValue
        .split("-")
        .reverse()
        .join("/");
      return `${formattedDate} <br> Nota: ${seriesName[0].value} <br>`;
    },
  },
  xAxis: {
    type: "category",
    data: props.chartData.map((e) => e.date),
    axisLabel: {
      formatter: (value, index) => {
        const date = value.split("-").reverse().join("/");
        return date;
      },
    },
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
    position: "left",
    name: "Nota",
    nameLocation: "center",
  },
  series: [
    {
      data: props.chartData.map((e) => {
        return { value: e.noteAvg };
      }),
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

watch(
  () => props.chartData,
  () => {
    graph.value.setOption({
      xAxis: {
        data: props.chartData.map((e) => e.date),
      },
      series: [
        {
          data: props.chartData.map((e) => {
            return { value: e.noteAvg };
          }),
        },
      ],
    });
  }
);
</script>
