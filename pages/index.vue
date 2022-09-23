<template>
  <div>
    <p class="flex text-2xl font-bold">Dashboard</p>
    <!-- project and time selector -->
    <div class="my-5 flex justify-end">
      <n-select
          v-model:value="project"
          :options="mappedProjects"
          placeholder="Selecione o projeto"
          style="width: 200px"
      />
    </div>
    <div v-if="userData.projects?.length === 0">
      <DashboardEmptyDash/>
    </div>

    <div v-else id="main-content" class="grid grid-cols-2 gap-3">
      <DashboardGraphContainer1
          :project-id="project"
          :title="'Média dentro do período'"
          :user="user"
      />
      <DashboardGraphContainer2
          :project-id="project"
          :title="'Média entre os períodos'"
          :user="user"
      />

      <div
          id="tabela"
          class="col-span-2 border bg-slate-200 rounded-sm shadow-sm"
      >
        Tabela
        <img
            alt=""
            src="https://mrkremerscience.files.wordpress.com/2013/08/data-table-example1.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {NSelect} from "naive-ui";
import {useStorage} from "vue3-storage";

const nuxtApp = useNuxtApp();
const storage = useStorage();

// refs|data
const project = ref(null);
const user = storage.getStorageSync("user");
const userData = await nuxtApp.$repo.user.getOneUser(user.guid);
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
      console.log("aqui");
      project.value = mappedProjects[0].value;
    }
  }
});
</script>
