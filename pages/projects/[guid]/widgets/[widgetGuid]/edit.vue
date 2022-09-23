<template>
  <div class="w-full">
    <NPageHeader class="mb-4" subtitle="" @back="handleBack">
      <template #title>
        <p class="flex text-2xl font-bold">Editando configuração de widget</p>
      </template>
    </NPageHeader>
    <LazyWidgetForm :guid="route.params.widgetGuid"/>
  </div>
</template>

<script setup>
import {NPageHeader} from 'naive-ui';


const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();

const rules = ref(null);
const formRef = ref(null);

// methods
const handleBack = () => {
  router.push(`/projects/${route.params.guid}/widgets`);
};

</script>