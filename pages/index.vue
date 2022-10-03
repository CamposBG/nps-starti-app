<<<<<<< HEAD
<template>
  <div>
    <p class="flex text-2xl font-bold">Dashboard</p>
    <div class="my-5 flex gap-3 justify-end">
      <NFormItem label="Recarregar dados">
        <NSelect
            v-model:value="interval"
            :options="mappedIntervals"
            placeholder="Selecione um intervalo"
            style="width: 200px"
        />
      </NFormItem>
      <NFormItem label="Selecione um projeto">
        <NSelect
            v-model:value="project"
            :options="mappedProjects"
            placeholder="Selecione o projeto"
            style="width: 200px"
        />
      </NFormItem>
    </div>
    <div v-if="userData.projects?.length === 0">
      <LazyDashboardEmptyDash/>
    </div>

    <div v-else-if="project" id="main-content" class="grid grid-cols-2 gap-3">
      <LazyDashboardGraphContainer1
          :interval="interval"
          :project-id="project"
          :title="'Média dentro do período'"
      />
      <LazyDashboardGraphContainer2
          :project-id="project"
          :title="'Médias diárias'"
      />
    </div>
    <div class="mt-10">
      <LazyDashboardTable/>
    </div>
  </div>
</template>

<script setup>
import {NFormItem, NSelect} from "naive-ui";
import {useStorage} from "vue3-storage";

const nuxtApp = useNuxtApp();
const storage = useStorage();

// refs|data
const project = ref(null);
const interval = ref(30000);
const user = storage.getStorageSync("user");
const userData = await nuxtApp.$repo.user.getOneUser(user.guid);
const mappedIntervals = ref([
  {
    label: 'A cada 30 segundos',
    value: 30000,
    disabled: false
  },
  {
    label: 'A cada 1 minuto',
    value: 100000,
    disabled: false
  },
  {
    label: 'A cada 2 minutos',
    value: 200000,
    disabled: false
  },
  {
    label: 'A cada 5 minutos',
    value: 500000,
    disabled: false
  },
  {
    label: 'A cada 30 minutos',
    value: 3000000,
    disabled: false
  },
]);

let mappedProjects;

if (userData.projects?.length > 0) {
  mappedProjects = userData.projects.map((element) => ({
    label: element.name,
    value: element.id,
    disabled: false,
  }));
}

onMounted(() => {
  if (mappedProjects) {
    if (Object.keys(mappedProjects.length > 0)) {
      project.value = mappedProjects[0].value;
    }
  }
});
</script>
=======
<template>
  <div>
    <p class="flex text-2xl font-bold">Dashboard</p>
    <div class="my-5 flex gap-3 justify-end">
      <NFormItem label="Recarregar dados">
        <NSelect
            v-model:value="interval"
            :options="mappedIntervals"
            placeholder="Selecione um intervalo"
            style="width: 200px"
        />
      </NFormItem>
      <NFormItem label="Selecione um projeto">
        <NSelect
            v-model:value="project"
            :options="mappedProjects"
            placeholder="Selecione o projeto"
            style="width: 200px"
        />
      </NFormItem>
    </div>
    <div v-if="userData.projects?.length === 0">
      <LazyDashboardEmptyDash/>
    </div>

    <div v-else-if="project" id="main-content" class="grid grid-cols-2 gap-3">
      <LazyDashboardGraphContainer1
          :interval="interval"
          :project-id="project"
          :title="'Média dentro do período'"
      />
      <LazyDashboardGraphContainer2
          :project-id="project"
          :title="'Médias diárias'"
      />
    </div>
    <div v-if="project" class="mt-10">
      <!-- <LazyDashboardTable/> -->
      <LazyDashboardTimeline :project-id="project"/>
    </div>
  </div>
</template>

<script setup>
import {NFormItem, NSelect} from "naive-ui";
import {useStorage} from "vue3-storage";

const nuxtApp = useNuxtApp();
const storage = useStorage();

// refs|data
const project = ref(null);
const interval = ref(30000);
const user = storage.getStorageSync("user");
const userData = await nuxtApp.$repo.user.getOneUser(user.guid);
const mappedIntervals = ref([
  {
    label: "A cada 30 segundos",
    value: 30000,
    disabled: false,
  },
  {
    label: "A cada 1 minuto",
    value: 100000,
    disabled: false,
  },
  {
    label: "A cada 2 minutos",
    value: 200000,
    disabled: false,
  },
  {
    label: "A cada 5 minutos",
    value: 500000,
    disabled: false,
  },
  {
    label: "A cada 30 minutos",
    value: 3000000,
    disabled: false,
  },
]);
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

let mappedProjects;

if (userData.projects?.length > 0) {
  mappedProjects = userData.projects.map((element) => ({
    label: element.name,
    value: element.id,
    disabled: false,
  }));
}

onMounted(() => {
  if (mappedProjects) {
    if (Object.keys(mappedProjects.length > 0)) {
      project.value = mappedProjects[0].value;
    }
  }
});
</script>
>>>>>>> e682dc24158f405cea2eec320d442cc9955ac9ca
