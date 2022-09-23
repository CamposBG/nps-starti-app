<template>
  <NPageHeader>
    <template #title>
      Lista de usuários
    </template>
    <template #extra>
      <NSpace align="center" justify="space-between">
        <NButton color="teal" size="small" @click="handleCreateUser"> Adicionar usuário</NButton>
      </NSpace>
    </template>
  </NPageHeader>
  <div class="mt-5">
    <LazyUserList :update="refreshList"/>
  </div>
</template>
<script setup>
import {NButton, NPageHeader, NSpace} from "naive-ui";

const nuxtApp = useNuxtApp();

const refreshList = ref(0)

const handleCreateUser = () => {
  nuxtApp.$bus.emit('drawer:open', {
    component: 'UserCreateForm',
    title: 'Criar novo usuário',
    onClose: async () => {
      refreshList.value++
    },
    maskClosable: false
  });
};
</script>

<style lang="scss" scoped>
.form-table-wrapper {
  @apply flex flex-wrap  gap-16;
}

.wrapper-itens {
  // @apply basis-full
}
</style>