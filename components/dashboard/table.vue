<template>
  <div>
    <!-- filters and search  -->
    <div class="flex justify-between">
      <div class="flex gap-9">
        <div class="w-96">
          <div class="flex gap-1">
            <NDatePicker v-model:value="range" :actions="null" clearable close-on-select end-placeholder="Data final"
                         start-placeholder="Data inicial"
                         type="daterange"/>
            <NButton type="tertiary" @click="range = null"> Limpar</NButton>
          </div>
        </div>
        <div class="flex items-center gap-2 text-gray-400">
          <p>Tipo de voto:</p>
          <NPopselect v-model:value="score" :on-update:value="(value) => handleChangeVoteType(value)"
                      :options="scoreOptions">
            <n-button type="tertiary">{{ currentScoreLabel }}</n-button>
          </NPopselect>
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
    <div class="mt-4">
      <!--      <n-data-table-->
      <!--        remote-->
      <!--        ref="table"-->
      <!--        :columns="columns"-->
      <!--        :data="data"-->
      <!--        :loading="loading"-->
      <!--        :pagination="pagination"-->
      <!--        :row-key="rowKey"-->
      <!--        @update:sorter="handleSorterChange"-->
      <!--        @update:filters="handleFiltersChange"-->
      <!--        @update:page="handlePageChange"-->
      <!--      />-->
      <NScrollbar class="hover:cursor-default" style="max-height: 550px; width: 50%;" trigger="hover">
        <NTimeline size="large">
          <NTimelineItem v-for="item in data" :key="item.user"
                         :title="item.user"
                         :type="item.vote <=  6 ? 'error' : item.vote >= 7 && item.vote <= 8 ? 'warning' : 'success'">
            <template #icon>
              <NIcon size="15">
                <SmileRegular v-if="item.vote > 8"/>
                <MehRegular v-else-if="item.vote >= 7"/>
                <AngryRegular v-else-if="item.vote <= 6"/>
              </NIcon>
            </template>
            <p v-if="item.comment">
              {{ item.comment }}
            </p>
            <template #header>
              <div class="flex items-center">
                <p>{{ item.user }}</p><small>({{ item.widget }})</small>
              </div>
            </template>
            <template #footer>
              Deu nota {{ item.vote }}
              <small>
                {{ new Date(item.date).toLocaleDateString() }}
              </small>
            </template>
          </NTimelineItem>
        </NTimeline>
      </NScrollbar>
    </div>
  </div>
</template>

<script setup>
import {
  NButton,
  NDatePicker,
  NIcon,
  NInput,
  NInputGroup,
  NPopselect,
  NScrollbar,
  NTimeline,
  NTimelineItem
} from "naive-ui";
import {AngryRegular, MehRegular, SmileRegular} from '@vicons/fa';

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
    value: "detractors", // 0-6
  },
  {
    label: "Passivos",
    value: "passives", // 7-8
  },
  {
    label: "Promotores",
    value: "promoters", // 9-10
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
let data = ref([
  {date: "2022-09-13", user: "Usuário 1", widget: "login page", vote: 5},
  {date: "2022-09-13", user: "Usuário 1", widget: "login page", vote: 5},
  {date: "2022-09-13", user: "Usuário 1", widget: "login page", vote: 5},
  {date: "2022-09-13", user: "Usuário 1", widget: "login page", vote: 5},
  {
    date: "2022-09-13",
    user: "Usuário 1",
    widget: "login page",
    vote: 5,
    comment: 'Plataforma trava muito, então sugiro que seja feito uma alteração assim, e bla bla bla bla '
  },
  {date: "2022-09-13", user: "Usuário 1", widget: "login page", vote: 5},
  {date: "2022-09-13", user: "Usuário 1", widget: "login page", vote: 5},
  {date: "2022-09-14", user: "Usuário 2", widget: "home page", vote: 3},
  {date: "2022-09-14", user: "Usuário 2", widget: "home page", vote: 3},
  {date: "2022-09-15", user: "Usuário 3", widget: "returning", vote: 9},
  {date: "2022-09-15", user: "Usuário 3", widget: "returning", vote: 9},
  {date: "2022-09-23", user: "Usuário 4", widget: "new user", vote: 8},
  {date: "2022-09-23", user: "Usuário 4", widget: "new user", vote: 3},
  {date: "2022-09-23", user: "Usuário 4", widget: "new user", vote: 7, comment: 'Plataforma boa'},
  {date: "2022-09-23", user: "Usuário 4", widget: "new user", vote: 9},
  {date: "2022-09-23", user: "Usuário 4", widget: "new user", vote: 4},
  {date: "2022-09-23", user: "Usuário 4", widget: "new user", vote: 7},
  {date: "2022-09-30", user: "Usuário 5", widget: "login page", vote: 10, comment: 'Plataforma excelente'},
  {date: "2022-09-30", user: "Usuário 5", widget: "login page", vote: 1},
  {date: "2022-09-30", user: "Usuário 5", widget: "login page", vote: 10},
  {date: "2022-09-30", user: "Usuário 5", widget: "login page", vote: 7},
  {date: "2022-09-30", user: "Usuário 5", widget: "login page", vote: 10, comment: 'Plataforma muito boa'},
  {date: "2022-09-30", user: "Usuário 5", widget: "login page", vote: 8,},
]);
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
  dataRef.value = data.value;
  data.value = data.value.filter((item) => (item.user.includes(searchTerm.value.toLowerCase())));
  console.log({data})
};

const clearSearch = () => {
  console.log("clearn search");
  data.value = dataRef.value;
  searchTerm.value = null;
};

const handleSorterChange = (sorter) => {

};

const handleChangeVoteType = (value) => {
  console.log({value})
  dataRef.value = data.value;
  score.value = value;
  if (score.value === 'all') {
    data.value = dataRef.value;
  } else if (score.value === 'detractors') {
    data.value = data.value.filter((item) => item.vote <= 6);
  } else if (score.value === 'passives') {
    data.value = data.value.filter((item) => item.vote > 6 && item.vote <= 8);
  } else {
    data.value = data.value.filter((item) => item.vote > 8);
  }
};
</script>
