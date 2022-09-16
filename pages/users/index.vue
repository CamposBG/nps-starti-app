<template>
  <div>

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