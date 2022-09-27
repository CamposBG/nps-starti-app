<template>
  <div>
    <!-- filters and search  -->
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
            <n-button type="tertiary">{{ currentScoreLabel }}</n-button>
          </n-popselect>
        </div>
      </div>
      <div class="flex items-center">
        <NInputGroup>
          <NInput
            v-model:value="searchTerm"
            :style="{ width: '100%' }"
            placeholder="Nome ou e-mail"
          />
          <NButton type="tertiary" @click="search"> Pesquisar</NButton>
          <NButton v-if="searchTerm" ghost type="primary" @click="clearSearch"
            >Limpar
          </NButton>
        </NInputGroup>
      </div>
    </div>
    <!-- <div v-if="range && range.length > 0">
      {{ new Date(range[0]).toLocaleDateString() }}
    </div> -->

    <!-- Table  -->
    <div class="mt-2">
      <n-data-table
        remote
        ref="table"
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :row-key="rowKey"
        @update:sorter="handleSorterChange"
        @update:filters="handleFiltersChange"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import {
  NDatePicker,
  NButton,
  NPopselect,
  NInput,
  NInputGroup,
  NDataTable,
} from "naive-ui";

// ref|data
// search and filter variables
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

// Data table variables
const columns = [
  {
    title: "Data",
    key: "date",
    sorter: "default",
  },
  {
    title: "Usuário",
    key: "user",
    sorter: true,
    sortOrder: false,
  },
  {
    title: "Widget",
    key: "widget",
    sorter: true,
    sortOrder: false,
  },
  {
    title: "Voto",
    key: "vote",
    sorter: true,
    sortOrder: false,
  },
];
const data = [
  { date: "2022-09-13", user: "Usuário 1", widget: "login page", vote: 5 },
  { date: "2022-09-14", user: "Usuário 2", widget: "home page", vote: 3 },
  { date: "2022-09-15", user: "Usuário 3", widget: "returning", vote: 9 },
  { date: "2022-09-23", user: "Usuário 4", widget: "new user", vote: 4 },
  { date: "2022-09-30", user: "Usuário 5", widget: "login page", vote: 10 },
];
const table = ref(null);
const loadingRef = ref(true);
const dataRef = ref([]);
const columnsRef = ref(columns);
const columnDateReactive = reactive(columns[0]);
const columnUserReactive = reactive(columns[1]);
const columnWidgetReactive = reactive(columns[2]);
const columnVoteReactive = reactive(columns[3]);
const paginationReactive = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
});

// methods
const search = () => {
  console.log("searchName");
};

const cleaclearSearch = () => {
  console.log("clearn search");
};

const handleSorterChange = (sorter) => {
  console.log(sorter);
  // table.value.sort(a.columnKey, "ascend");
  // a.order = "ascend";
  // console.log(a);
};
</script>
