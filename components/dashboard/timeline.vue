<template>
  <div class="max-w-6xl mx-auto">
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
        <div class="flex items-center gap-2 text-gray-400">
          <p>Comentários:</p>
          <NPopselect
            v-model:value="commentsFilter"
            :on-update:value="(value) => handleChangeComments(value)"
            :options="commentsOptions"
          >
            <n-button type="tertiary">{{ currentCommentLabel }}</n-button>
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
    <!-- timeline -->
    <div v-if="isLoading" class="w-fit mx-auto p-10">
      <NSpin size="large" />
    </div>
    <div v-else class="animationClass">
      <div v-show="isPaginatedItemsEmpty" class="p-10">
        <NEmpty description="Nenhum item encontrado"></NEmpty>
      </div>
      <div
        v-for="dates in paginatedItems"
        id="vote"
        class="p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 mt-5"
      >
        <div class="vote-wrapper">
          <time class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ formatDate(dates.date) }}
          </time>
          <ol class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
            <li v-for="votes in dates.votes">
              <n-popover trigger="click" raw :show-arrow="true">
                <template #trigger>
                  <a
                    class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="#"
                    @click.prevent="() => false"
                  >
                    <div
                      class="mr-3 mb-3 w-10 h-10 flex-shrink-0 rounded-full sm:mb-0 flex justify-center items-center border-double border-4 border-gray-200"
                      :class="voteBgColor(votes.vote)"
                    >
                      <p class="text-2xl text-gray-200">{{ votes.vote }}</p>
                    </div>
                    <div class="text-gray-600 dark:text-gray-400">
                      <div class="text-base font-normal">
                        <n-tag
                          v-if="votes.name === 'anonymous'"
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

                        <span
                          v-else
                          class="font-medium text-gray-900 dark:text-white"
                          >{{ votes.name }}</span
                        >
                      </div>
                      <div
                        v-if="votes.comment?.length > 0"
                        class="text-sm font-normal"
                      >
                        "{{ votes.comment }}"
                      </div>
                      <div
                        class="flex items-center gap-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        <Globe class="w-3" />
                        <p>{{ votes.widget }}</p>
                      </div>
                    </div>
                  </a>
                </template>
                <div class="bg-white max-h-40 max-w-lg overflow-y-auto">
                  <div class="sticky p-2 top-0 bg-slate-200 shadow-sm">
                    <p class="font-semibold text-lg">Detalhes</p>
                  </div>
                  <div class="p-2">
                    <p class="mb-2">
                      <strong>Nome</strong>:
                      {{ votes.name }}
                    </p>
                    <p class="mb-2"></p>
                    <p class="mb-2">
                      <strong>E-mail</strong>:
                      {{ votes.email || "nenhum dado vindo da api" }}
                    </p>
                    <p class="mb-2">
                      <strong>Widget</strong>:
                      {{ votes.widget || "nenhum dado vindo da api" }}
                    </p>

                    <p class="mb-2">
                      <strong>URL</strong>:
                      {{ votes.url || "nenhum dado vindo da api" }}
                    </p>
                    <p class="mb-2">
                      <strong>Nota</strong>:
                      {{ votes.vote || "nenhum dado vindo da api" }}
                    </p>
                    <p class="mb-2">
                      <strong>Comentário</strong>:
                      {{ votes.comment || "nenhum dado vindo da api" }}
                    </p>
                  </div>
                </div>
              </n-popover>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="w-fit mx-auto">
      <n-pagination v-model:page="page" :page-count="totalPages" simple />
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
  NPopover,
  NEmpty,
  NPagination,
  NSpin,
} from "naive-ui";
import { Mask, Globe } from "@vicons/fa";

// props
const props = defineProps({
  projectId: { type: Number },
  projectType: { type: Number },
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
const commentsFilter = ref("all");
const page = ref(1);
const totalPages = ref(null);
const previousPage = ref(null);
const nextPage = ref(null);
const paginatedItems = ref([]);
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
const commentsOptions = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Sim",
    value: "yes",
  },
  {
    label: "Não",
    value: "no",
  },
];

// methods
const handleChangeVoteType = (value) => {
  score.value = value;
};
const handleChangeComments = (value) => {
  commentsFilter.value = value;
};

const search = () => {
  searchTerm.value = searchRef.value;
};

const voteBgColor = (vote) => {
  if (props.projectType === 1) {
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
  } else {
    return "bg-gray-400";
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

const formatDate = (date) => {
  return new Date(date.split("-")).toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// computed
const isPaginatedItemsEmpty = computed(() =>
  paginatedItems.value.length >= 1 ? false : true
);
const currentScoreLabel = computed(() => {
  const label = scoreOptions.filter((e) => e.value === score.value);
  return label[0].label;
});

const currentCommentLabel = computed(() => {
  const label = commentsOptions.filter((e) => e.value === commentsFilter.value);
  return label[0].label;
});

const queryParams = computed(() => ({
  projectId: props.projectId,
  search: searchTerm.value,
  voteType: score.value,
  period: getPeriodFormatted(),
  comments: commentsFilter.value,
}));

function paginate(items, page = 1, perPage = 5) {
  const offset = perPage * (page - 1);
  totalPages.value = Math.ceil(items.length / perPage);
  paginatedItems.value = items.slice(offset, perPage * page);
  previousPage.value = page - 1 ? page - 1 : null;
  nextPage.value = totalPages > page ? page + 1 : null;
}
// watch
watch(response, () => {
  if (response.value?.votes) {
    tableData.value = response.value.votes;
    paginate(tableData.value, page.value, 1);
  }
});

watch(queryParams, async () => {
  console.log(queryParams );
  page.value = 1;
  await refresh();
});

watch(page, () => {
  paginate(tableData.value, page.value, 1);
});
</script>

<style scoped>
@keyframes append-animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animationClass {
  animation: append-animate 250ms ease-out;
}
</style>
