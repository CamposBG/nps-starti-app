<template>
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
</script>
