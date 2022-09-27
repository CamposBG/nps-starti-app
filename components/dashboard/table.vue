<template>
  <div class="w-full">
    <div class="flex justify-between">
      <div class="flex gap-9">
        <div class="w-96">
          <div class="flex gap-1">
            <NDatePicker v-model:value="range" type="daterange" clearable />
            <n-button type="tertiary"> Limpar </n-button>
          </div>
        </div>
        <div class="flex items-center gap-2 text-gray-400">
          <p>Tipo de voto:</p>
          <n-popselect v-model:value="score" :options="scoreOptions">
            <n-button>{{ currentScoreLabel }}</n-button>
          </n-popselect>
        </div>
      </div>
      <div class="flex items-center">
        <!-- <p>Buscar nome:</p> -->
        <NInputGroup>
          <NIput
            v-model:value="searchTerm"
            :style="{ width: '100%' }"
            placeholder="Nome ou e-mail"
          />
          <NButton color="teal" type="primary" @click="search">
            Pesquisar</NButton
          >
          <NButton v-if="searchTerm" ghost type="primary" @click="clearSearch"
            >Limpar
          </NButton>
        </NInputGroup>
      </div>
    </div>
    <!-- <div v-if="range && range.length > 0">
      {{ new Date(range[0]).toLocaleDateString() }}
    </div> -->
  </div>
</template>

<script setup>
import {
  NDatePicker,
  NButton,
  NPopselect,
  NInput,
  NInputGroup,
} from "naive-ui";

const searchTerm = ref(null);
const score = ref("all");
const scoreOptions = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Detratores",
    value: "0-6", // 0-6
  },
  {
    label: "Passivos",
    value: "7-8", // 7-8
  },
  {
    label: "Promotores",
    value: "9-10", // 9-10
  },
];
const range = ref(null);
const currentScoreLabel = computed(() => {
  const label = scoreOptions.filter((e) => e.value === score.value);
  return label[0].label;
});
</script>
