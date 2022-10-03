<template>
  <div>
    <VueEcharts ref="graph" :option="chartData" class="h-96"/>
  </div>
</template>
<script script setup>
import {VueEcharts} from "vue3-echarts";

const props = defineProps({
  chartData: {type: Array, default: []},
});

// data|refs
const graph = ref(null);
const chartData = {
  tooltip: {
    trigger: "axis",
    formatter: (seriesName) => {
      const formattedDate = seriesName[0].axisValue.split("-").reverse().join("/");
      return `${formattedDate} <br> Nota: ${seriesName[0].value} <br> ${
          seriesName[0].value <= 6
              ? "<strong>Detrator<strong>"
              : seriesName[0].value <= 8
                  ? "<strong>Passivo<strong>"
                  : "<strong>Promotor<strong>"
      } `;
      // return formattedDate + "<br> nota: " + seriesName[0].value + ;
    },
  },
  xAxis: {
    type: "category",
    data: props.chartData.map((e) => e.date),
    axisLabel: {
      formatter: (value, index) => {
        // const date = new Date(`${value} `);
        const date = value.split("-").reverse().join("/");

        // const formattedDate =
        //   date.getDate() +
        //   "/" +
        //   (date.getMonth() + 1) +
        //   "/" +
        //   date.getFullYear();
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
        if (e.noteAvg <= 6) {
          return {
            value: e.noteAvg,
            itemStyle: {
              color: "#e49c9c",
            },
          };
        } else if (e.noteAvg <= 8) {
          return {
            value: e.noteAvg,
            itemStyle: {
              color: "#e4e09c",
            },
          };
        } else {
          return {
            value: e.noteAvg,
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
              if (e.noteAvg <= 6) {
                return {
                  value: e.noteAvg,
                  itemStyle: {
                    color: "#e49c9c",
                  },
                };
              } else if (e.noteAvg <= 8) {
                return {
                  value: e.noteAvg,
                  itemStyle: {
                    color: "#e4e09c",
                  },
                };
              } else {
                return {
                  value: e.noteAvg,
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
