<template>
  <div>
    <!-- filters and search  -->
    <div class="flex justify-between">
      <div class="flex gap-9">
        <div class="w-96">
          <div class="flex gap-1">
            <NDatePicker
              v-model:value="period"
              :actions="null"
              clearable
              close-on-select
              end-placeholder="Data final"
              start-placeholder="Data inicial"
              type="daterange"
            />
            <NButton type="tertiary" @click="period = null"> Limpar</NButton>
          </div>
        </div>
        <div class="flex items-center gap-2 text-gray-400">
          <p>Tipo de voto:</p>
          <NPopselect
            v-model:value="score"
            :on-update:value="(value) => handleChangeVoteType(value)"
            :options="scoreOptions"
          >
            <n-button type="tertiary">{{ currentScoreLabel }}</n-button>
          </NPopselect>
        </div>
      </div>
      <div class="flex items-center">
        <NInputGroup>
          <NInput
            v-model:value="searchRef"
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
    QUERY-PARAMS
    {{ queryParams }}
    <!-- timeline -->
    <div
      id="vote"
      class="p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
    >
      <time class="text-lg font-semibold text-gray-900 dark:text-white">
        {{
          new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </time>
      <ol class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        <li>
          <a
            class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
            href="#"
          >
            <div
              class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0 flex justify-center items-center border-double border-4 border-gray-200"
              :class="voteBgColor(6)"
            >
              <p class="text-3xl text-gray-200">6</p>
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              <div class="text-base font-normal">
                <n-tag
                  v-if="true"
                  rounded
                  size="small"
                  round
                  style="background-color: #bfb5ff; border-color;: #571b86"
                >
                  <template #icon>
                    <Mask class="w-4 text-violet-900" />
                  </template>
                  Anônimo
                </n-tag>

                <span v-else class="font-medium text-gray-900 dark:text-white"
                  >Nome do voter</span
                >
              </div>
              <div class="text-sm font-normal">
                "comentário do voto, caso exista"
              </div>
              <div
                class="flex items-center gap-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                <Globe class="w-3" />
                <p>Nome da Widget</p>
              </div>
            </div>
          </a>
        </li>
        <!-- outro ex -->
        <li>
          <a
            class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
            href="#"
          >
            <div
              class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0 flex justify-center items-center border-double border-4 border-gray-200"
              :class="voteBgColor(9)"
            >
              <p class="text-3xl text-gray-200">9</p>
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              <div class="text-base font-normal">
                <n-tag
                  v-if="false"
                  rounded
                  size="small"
                  round
                  style="background-color: #bfb5ff; border-color;: #571b86"
                >
                  <template #icon>
                    <Mask class="w-4 text-violet-900" />
                  </template>
                  Anônimo
                </n-tag>

                <span v-else class="font-medium text-gray-900 dark:text-white"
                  >Nome do voter</span
                >
              </div>
              <div class="text-sm font-normal">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Facilis officia labore maiores asperiores minima eveniet!
                Aliquid beatae, ipsam facilis explicabo, modi, ducimus quibusdam
                incidunt dolorem necessitatibus excepturi odio illum eaque.
              </div>
              <div
                class="flex items-center gap-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                <Globe class="w-3" />
                <p>Nome da Widget</p>
              </div>
            </div>
          </a>
        </li>
        <!-- outro ex -->
        <li>
          <a
            class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
            href="#"
          >
            <div
              class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0 flex justify-center items-center border-double border-4 border-gray-200"
              :class="voteBgColor(8)"
            >
              <p class="text-3xl text-gray-200">8</p>
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              <div class="text-base font-normal">
                <n-tag
                  v-if="false"
                  rounded
                  size="small"
                  round
                  style="background-color: #bfb5ff; border-color;: #571b86"
                >
                  <template #icon>
                    <Mask class="w-4 text-violet-900" />
                  </template>
                  Anônimo
                </n-tag>

                <span v-else class="font-medium text-gray-900 dark:text-white"
                  >Nome do voter</span
                >
              </div>
              <div class="text-sm font-normal">
                "comentário do voto, caso exista"
              </div>
              <div
                class="flex items-center gap-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                <Globe class="w-3" />
                <p>Nome da Widget</p>
              </div>
            </div>
          </a>
        </li>
      </ol>
    </div>

    <!-- load More -->
    <div class="w-fit mx-auto">
      <NButton :loading="isLoading" icon-placement="left" @click="loadMore">
        Carregar mais
      </NButton>
    </div>
  </div>
</template>
<script setup>
import {
  NButton,
  NDatePicker,
  NInput,
  NInputGroup,
  NPopselect,
  NTag,
} from "naive-ui";
import { Mask, Globe } from "@vicons/fa";

// props
const props = defineProps({
  projectId: { type: Number },
});

const nuxtApp = useNuxtApp();

// async data
const {
  data: response,
  refresh,
  pending: isLoading,
} = await useLazyAsyncData(`dash-table-key-${Math.random()}`, () =>
  nuxtApp.$repo.dash.getDashTableData(queryParams.value)
);

// ref|data
const tableData = ref([]);
const searchRef = ref(null);
const searchTerm = ref(null);
const score = ref("all");
const period = ref(null);
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

// methods
const handleChangeVoteType = (value) => {
  score.value = value;
  console.log({ value });
};

const search = () => {
  console.log("search");
  searchTerm.value = searchRef.value;
};

const voteBgColor = (vote) => {
  if (vote) {
    if (vote <= 6) {
      return "bg-rose-400";
    } else if (vote <= 8) {
      return "bg-amber-400";
    } else {
      return "bg-emerald-400";
    }
  } else {
    return "bg-gray-400 ";
  }
};

const getPeriodFormatted = () => {
  if (period.value?.length > 0) {
    return JSON.stringify({
      startDate: new Date(period.value[0]).toLocaleDateString(),
      endDate: new Date(period.value[1]).toLocaleDateString(),
    });
  } else {
    return null;
  }
};

const clearSearch = () => {
  searchRef.value = null;
  searchTerm.value = null;
};

// computed
const currentScoreLabel = computed(() => {
  const label = scoreOptions.filter((e) => e.value === score.value);
  return label[0].label;
});

const queryParams = computed(() => ({
  projectId: props.projectId,
  page: 1,
  search: searchTerm.value,
  score: score.value,
  period: getPeriodFormatted(),
}));

const loadMore = () => {
  console.log("loadMore");
};

// watch
watch(response, () => {
  tableData.value = response;
  console.log(tableData.value);
});

watch(queryParams, async () => {
  await refresh();
});
</script>
