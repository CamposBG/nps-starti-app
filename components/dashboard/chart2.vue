<template>
  <div>
    <VueEcharts :option="chartData" class="h-96" ref="graph" />
  </div>
</template>
<script script setup>
import { VueEcharts } from "vue3-echarts";

const props = defineProps({
  chartData: { type: Array, default: [] },
});
console.log("chartData props", props.chartData);
// console.log(props.chartData.map((e) => e.date));

// data|refs
const graph = ref(null);
const chartData = {
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: props.chartData.map((e) => e.date),
    axisLabel: {
      formatter: (value, index) => {
        const date = new Date(value);
        const formattedDate =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        return formattedDate;
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
        if (e.score <= 6) {
          return {
            value: e.score,
            itemStyle: {
              color: "#e49c9c",
            },
          };
        } else if (e.score <= 8) {
          return {
            value: e.score,
            itemStyle: {
              color: "#e4e09c",
            },
          };
        } else {
          return {
            value: e.score,
            itemStyle: {
              color: "#9ce4ab",
            },
          };
        }
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
            if (e.score <= 6) {
              return {
                value: e.score,
                itemStyle: {
                  color: "#e49c9c",
                },
              };
            } else if (e.score <= 8) {
              return {
                value: e.score,
                itemStyle: {
                  color: "#e4e09c",
                },
              };
            } else {
              return {
                value: e.score,
                itemStyle: {
                  color: "#9ce4ab",
                },
              };
            }
          }),
        },
      ],
    });
  }
);
</script>
