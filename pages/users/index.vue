<template>
  <div class="flex  items-center justify-between flex-auto mb-4">
    <NBreadcrumb separator=">">
      <NBreadcrumbItem @click="$router.push('/')">
        Home
      </NBreadcrumbItem>
      <NBreadcrumbItem>
        Usuários
      </NBreadcrumbItem>
    </NBreadcrumb>
    <NButton  color="teal" @click="handleCreateUser">
      Adicionar
    </NButton>
  </div>
  <LazyUserList :update="refreshList"/>
</template>
<script setup>
import { PlusCircle} from '@vicons/fa';
import { NBreadcrumb, NBreadcrumbItem, NButton } from 'naive-ui  ';

const nuxtApp = useNuxtApp();

const refreshList = ref (0)

const handleCreateUser = () => {
  nuxtApp.$bus.emit('drawer:open', {
    component: 'UserCreateForm',
    title: 'Criar novo usuário',
    onClose: async () => {
      refreshList.value ++
    },
    maskClosable: false
  });
};

</script>

<style lang="scss" scoped>
  .form-table-wrapper{
     @apply flex flex-wrap  gap-16;
  }
  .wrapper-itens {
    // @apply basis-full 
  }
</style>