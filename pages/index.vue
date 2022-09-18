<template>
  <p class="flex justify-center text-2xl font-bold">
    Bem-vindo ao sistema de NPS da Starti
  </p>
  <ConfigSelectPosition @selectPosition="getSelectedPosition"/>
  <div class="mt-5">
    <NSpace justify="space-evenly">
      <NProgress
          :percentage="10"
          gap-position="bottom"
          type="dashboard"
      ></NProgress>
      <NProgress
          :percentage="10"
          gap-position="bottom"
          type="dashboard"
      ></NProgress>
      <NProgress
          :percentage="80"
          gap-position="bottom"
          type="dashboard"
      ></NProgress>
    </NSpace>
  </div>
</template>

<script setup>
import {NProgress, NSpace} from "naive-ui";

const getSelectedPosition = (positionValue) => {
  console.log({positionValue})
}
</script>