<template>
  <NPageHeader>
    <template #title>
      <p class="flex text-2xl font-bold">Lista de usuários</p>
    </template>
    <template #extra>
      <NSpace align="center" justify="space-between">
        <NButton v-if="isUserAdmin" color="teal" size="small" @click="handleCreateUser"> Adicionar usuário</NButton>
      </NSpace>
    </template>
  </NPageHeader>
  <div class="mt-5">
    <LazyUserList :update="refreshList"/>
  </div>
</template>
<script setup>
import {NButton, NPageHeader, NSpace} from "naive-ui";
import {useStorage} from "vue3-storage";

const nuxtApp = useNuxtApp();
const storage = useStorage();

definePageMeta({
  userType: 1,
});

const refreshList = ref(0);
const isUserAdmin = ref(null);

isUserAdmin.value = storage.getStorageSync('user').user_type === 1;

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