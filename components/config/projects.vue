<template>
  <div>
    <NPageHeader>
      <template #title>
        <p class="flex text-2xl font-bold">Configuração dos projetos</p>

      </template>
      <template #extra>
        <NSpace align="center" justify="space-between">
          <NButton v-if="isUserAdmin" color="teal" size="small" type="primary" @click="handleAddProject">
            Adicionar projeto
          </NButton>
          <NInput v-model:value="search" clearable placeholder="Pesquise um projeto..." round @input="changeSearch">
            <template #prefix>
              <Search class="w-3"/>
            </template>
          </NInput>
        </NSpace>
      </template>
    </NPageHeader>

    <div class="mt-5">
      <div v-if="pending" class="flex justify-center items-center">
        <NSpin size="large"/>
      </div>
      <NEmpty v-else-if="projects.length === 0 && !search" description="Nenhum projeto cadastrado ainda">
      </NEmpty>
      <NEmpty v-else-if="projects.length === 0 && search && !pending"
              description="Nenhum projeto encontrado com esse nome"/>
      <div v-else class="flex gap-x-10 justify-center">
        <LazyProjectsCard v-for="project in projects" :project-data="project" :title="project.name"
                          @refresh-projects="refresh"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {NButton, NEmpty, NInput, NPageHeader, NSpace, NSpin, useMessage} from 'naive-ui';
import {Search} from '@vicons/fa';
import {useStorage} from "vue3-storage";

const message = useMessage();
const nuxtApp = useNuxtApp();
const storage = useStorage();

const projects = ref([]);
const search = ref('');
const isUserAdmin = ref(null);

isUserAdmin.value = storage.getStorageSync('user').user_type === 1;

const {
  data: response,
  refresh,
  pending
} = useLazyAsyncData(`projects-list-${Math.random()}`, () => nuxtApp.$repo.projects.listProjects(search.value));


// methods
const handleAddProject = () => {
  nuxtApp.$bus.emit('drawer:open', {
    component: 'ProjectsForm',
    title: 'Adicionar projeto',
    onClose: async () => {
      await refresh();
    },
  });
};

const changeSearch = nuxtApp.$utils.debounce(async () => {
  if (search.value.length > 3 || search.value.length === 0) {
    await refresh();
  }
}, 500)

// watch
watch(response, () => {
  if (response.value) {
    projects.value = response.value.data;
  }
});

</script>

<style lang="scss" scoped>
.n-input {
  max-width: 200px;

  &:hover {
    outline-color: aqua;
  }
}
</style>

