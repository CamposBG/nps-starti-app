<template>
  <div>
    <div v-if="data">
      <NPageHeader :subtitle="data.name" @back="handleBack">
        <template #title>
          Configuração dos widgets
        </template>
        <template #extra>
          <NSpace>
            <NButton v-if="isUserAdmin" color="teal" size="small" type="primary" @click="handleAddWidget">
              Configurar widget
            </NButton>
          </NSpace>
        </template>
      </NPageHeader>
      <div v-if="data.widgets.length === 0" class="mt-5">
        <NEmpty description="Nenhum widget cadastrado ainda"/>
      </div>
      <div v-else-if="data.widgets.length > 0" class="mt-5 flex">
        <NGrid :cols="3" x-gap="12" y-gap="12">
          <NGi v-for="widget in data.widgets" :key="widget.isActive">
            <LazyWidgetSettingCard :description="widget.description" :widget-data="widget"/>
          </NGi>
        </NGrid>
      </div>
    </div>
    <div v-else class="flex justify-center items-center">
      <NSpin size="large"/>
    </div>
  </div>
</template>

<script setup>
import {NButton, NEmpty, NGi, NGrid, NPageHeader, NSpace, NSpin} from 'naive-ui';
import {useStorage} from "vue3-storage";

// composables
const router = useRouter();
const route = useRoute();
const nuxtApp = useNuxtApp();
const storage = useStorage();

const isUserAdmin = ref(null);

isUserAdmin.value = storage.getStorageSync('user').user_type === 1;

const {data} = useLazyAsyncData(`project-${route.params.guid}-${Math.random()}`, () => nuxtApp.$repo.projects.findOneProject(route.params.guid))

// methods
const handleAddWidget = () => {
  router.push(`/projects/${route.params.guid}/widgets/create`);
};

const handleBack = () => {
  router.push(`/projects`);
};

</script>


<style scoped>

</style>