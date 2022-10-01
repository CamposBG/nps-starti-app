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

    <div>
      <div class="p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <time class="text-lg font-semibold text-gray-900 dark:text-white">
          {{
            new Date().toLocaleDateString('pt-BR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
          }}
        </time>
        <ol class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
          <li>
            <a class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
              <div class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0 border-amber-200"
              >
                6
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                <div class="text-base font-normal"><span
                    class="font-medium text-gray-900 dark:text-white">Nome do voter</span>
                  <!--                  likes <span-->
                  <!--                    class="font-medium text-gray-900 dark:text-white">Bonnie Green's</span> post in <span-->
                  <!--                    class="font-medium text-gray-900 dark:text-white"> How to start with Flowbite library</span></div>-->
                </div>
                <div class="text-sm font-normal">"comentário do voto, caso exista"</div>
                <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd"
                                                                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                                                      fill-rule="evenodd"></path></svg>
                        Public
                    </span>
              </div>
            </a>
          </li>
          <li>
            <div class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
              <!--              <img alt="Bonnie Green image" class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"-->
              <!--                   src="/docs/images/people/profile-picture-3.jpg"/>-->
              <div>
                <div class="text-base font-normal text-gray-600 dark:text-gray-400"><span
                    class="font-medium text-gray-900 dark:text-white">Bonnie Green</span> react to <span
                    class="font-medium text-gray-900 dark:text-white">Thomas Lean's</span> comment
                </div>
                <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd"
                                                                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                                                      fill-rule="evenodd"></path><path
                            d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>
                        Private
                    </span>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div class="p-5 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <time class="text-lg font-semibold text-gray-900 dark:text-white">January 12th, 2022</time>
        <ol class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
          <li>
            <a class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
              <img alt="Laura Romeros image" class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                   src="/docs/images/people/profile-picture-4.jpg"/>
              <div class="text-gray-600 dark:text-gray-400">
                <div class="text-base font-normal"><span
                    class="font-medium text-gray-900 dark:text-white">Laura Romeros</span> likes <span
                    class="font-medium text-gray-900 dark:text-white">Bonnie Green's</span> post in <span
                    class="font-medium text-gray-900 dark:text-white"> How to start with Flowbite library</span></div>
                <div class="text-sm font-normal">"I wanted to share a webinar zeroheight."</div>
                <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd"
                                                                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                                                      fill-rule="evenodd"></path><path
                            d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>
                        Private
                    </span>
              </div>
            </a>
          </li>
          <li>
            <a class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
              <img alt="Mike Willi image" class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                   src="/docs/images/people/profile-picture-2.jpg"/>
              <div>
                <div class="text-base font-normal text-gray-600 dark:text-gray-400"><span
                    class="font-medium text-gray-900 dark:text-white">Mike Willi</span> react to <span
                    class="font-medium text-gray-900 dark:text-white">Thomas Lean's</span> comment
                </div>
                <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd"
                                                                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                                                      fill-rule="evenodd"></path></svg>
                        Public
                    </span>
              </div>
            </a>
          </li>
          <li>
            <a class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
              <img alt="Jese Leos image" class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                   src="/docs/images/people/profile-picture-5.jpg"/>
              <div class="text-gray-600 dark:text-gray-400">
                <div class="text-base font-normal"><span
                    class="font-medium text-gray-900 dark:text-white">Jese Leos</span> likes <span
                    class="font-medium text-gray-900 dark:text-white">Bonnie Green's</span> post in <span
                    class="font-medium text-gray-900 dark:text-white"> How to start with Flowbite library</span></div>
                <div class="text-sm font-normal">"I wanted to share a webinar zeroheight."</div>
                <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd"
                                                                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                                                      fill-rule="evenodd"></path></svg>
                        Public
                    </span>
              </div>
            </a>
          </li>
          <li>
            <a class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
              <img alt="Bonnie Green image" class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                   src="/docs/images/people/profile-picture-3.jpg"/>
              <div class="text-gray-600 dark:text-gray-400">
                <div class="text-base font-normal"><span
                    class="font-medium text-gray-900 dark:text-white">Bonnie Green</span> likes <span
                    class="font-medium text-gray-900 dark:text-white">Bonnie Green's</span> post in <span
                    class="font-medium text-gray-900 dark:text-white"> Top figma designs</span></div>
                <div class="text-sm font-normal">"I wanted to share a webinar zeroheight."</div>
                <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd"
                                                                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                                                      fill-rule="evenodd"></path><path
                            d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>
                        Private
                    </span>
              </div>
            </a>
          </li>
        </ol>
      </div>
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
