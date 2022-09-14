<template>
  <div>
    <NEmpty description="Nenhum projeto cadastrado ainda">
      <template #extra>
        <NButton type="primary"  size="small" color="#38BDF8" @click="handleAddProject">
          Adicionar projeto
        </NButton>
      </template>
    </NEmpty>
    <NDrawer v-model:show="openDrawer" :width="502" placement="right">
      <NDrawerContent title="Adicionar projeto" closable="true">
        <ConfigProjectsForm />
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

<script setup>
import {NEmpty, NButton, useMessage, useDialog, NDrawer, NDrawerContent} from 'naive-ui';
const dialog = useDialog();
const message = useMessage();
const nuxtApp = useNuxtApp();

const openDrawer = ref(false);


// methods
const handleAddProject = () => {
  openDrawer.value = true;
};


nuxtApp.$bus.on('drawer:close', () => {
  openDrawer.value = false;
})
</script>

