<template>
  <div>
    <NSpace justify="space-between" class="mb-6">
      <NBreadcrumb separator=">">
        <NBreadcrumbItem @click="$router.push('/')">
          Home
        </NBreadcrumbItem>
        <NBreadcrumbItem>
          Projetos
        </NBreadcrumbItem>
      </NBreadcrumb>
      <div class="flex  justify-end gap-x-2 items-center">
        <NButton type="primary"  size="small" color="teal" @click="handleAddProject">
          Adicionar projeto
        </NButton>
        <NInput round placeholder="Pesquise um projeto..."  v-model:value="search" @input="changeSearch">
          <template #prefix>
            <Search class="w-3" />
          </template>
        </NInput>
      </div>
    </NSpace>
    <div v-if="pending" class="flex justify-center items-center">
      <h1>
        Carregando...
      </h1>
    </div>
    <NEmpty description="Nenhum projeto cadastrado ainda" v-else-if="projects.length === 0 && !search">
      <template #extra>
        <NButton type="primary"  size="small" color="teal" @click="handleAddProject">
          Adicionar projeto
        </NButton>
      </template>
    </NEmpty>
    <NEmpty description="Nenhum projeto encontrado com esse nome" v-else-if="projects.length === 0 && search && !pending" />
    <div v-else class="flex flex-wrap gap-x-16 gap-y-14 pl-10">
      <LazyConfigProjectsCard v-for="project in projects" :title="project.name" :project-data="project" @refresh-projects="refresh"/>
    </div>
  </div>
</template>

<script setup>
import {NEmpty, NButton, NInput , useMessage, useDialog, NSpace, NBreadcrumb, NBreadcrumbItem} from 'naive-ui';
import { Search } from '@vicons/fa';

const dialog = useDialog();
const message = useMessage();
const nuxtApp = useNuxtApp();

const projects = ref([]);
const search = ref('');

const {data: response, refresh, pending} = useLazyAsyncData(`projects-list-${Math.random()}`, () => nuxtApp.$repo.projects.listProjects(search.value));


// methods
const handleAddProject = () => {
  nuxtApp.$bus.emit('drawer:open', {
    component: 'ConfigProjectsForm',
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
.n-card {
  max-width: 400px;
}

.n-input {
  max-width: 200px;

  &:hover {
    outline-color: aqua;
  }
}
</style>

