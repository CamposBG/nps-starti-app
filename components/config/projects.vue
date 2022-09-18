<template>
  <div>
    <NSpace class="mb-6" justify="space-between">
      <NBreadcrumb separator=">">
        <NBreadcrumbItem @click="$router.push('/')">
          Home
        </NBreadcrumbItem>
        <NBreadcrumbItem>
          Projetos
        </NBreadcrumbItem>
      </NBreadcrumb>
      <div class="flex  justify-end gap-x-2 items-center">
        <NButton color="teal" size="small" type="primary" @click="handleAddProject">
          Adicionar projeto
        </NButton>
        <NInput v-model:value="search" placeholder="Pesquise um projeto..." round @input="changeSearch">
          <template #prefix>
            <Search class="w-3"/>
          </template>
        </NInput>
      </div>
    </NSpace>
    <div v-if="pending" class="flex justify-center items-center">
      <NSpin size="large"/>
    </div>
    <NEmpty v-else-if="projects.length === 0 && !search" description="Nenhum projeto cadastrado ainda">
      <template #extra>
        <NButton color="teal" size="small" type="primary" @click="handleAddProject">
          Adicionar projeto
        </NButton>
      </template>
    </NEmpty>
    <NEmpty v-else-if="projects.length === 0 && search && !pending"
            description="Nenhum projeto encontrado com esse nome"/>
    <div v-else class="flex flex-wrap gap-x-16 gap-y-14 pl-10">
      <LazyProjectsCard v-for="project in projects" :project-data="project" :title="project.name"
                        @refresh-projects="refresh"/>
    </div>
  </div>
</template>

<script setup>
import {NBreadcrumb, NBreadcrumbItem, NButton, NEmpty, NInput, NSpace, NSpin, useDialog, useMessage} from 'naive-ui';
import {Search} from '@vicons/fa';

const dialog = useDialog();
const message = useMessage();
const nuxtApp = useNuxtApp();

const projects = ref([]);
const search = ref('');

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

