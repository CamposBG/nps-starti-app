<template>
  <div>
    <!-- <div class="form-table-wrapper">
      <div class="wrapper-itens basis-full lg:basis-1/4">
        <p class="text-xl mb-10">Criar usuário</p>
        <UserCreateForm/>
      </div>
      <div class="wrapper-itens basis-full lg:basis-1/2">
        <p class="text-xl mb-10">Usuários cadastrados</p>
      </div >
    </div> -->

    <!-- teste -->
    <p class="text-xl mb-10">Usuários cadastrados</p>
    <div class="flex gap-2 justify-end items-center ml-5  cursor-pointer" @click="$router.push('/users/create')">
      <PlusCircle class="w-5 h-5"/>
      <p>Adicionar</p>
    </div>
    <UserList/>
  </div>
</template>
<script setup>
import { PlusCircle} from '@vicons/fa';

</script>

<style lang="scss" scoped>
  .form-table-wrapper{
     @apply flex flex-wrap  gap-16;
  }
  .wrapper-itens {
    // @apply basis-full 
  }
</style>