<template>
  <div>
    <div class="form-table-wrapper">
      <div class="wrapper-itens basis-full lg:basis-1/4">
        <p class="text-xl mb-10">Criar usuário</p>
        <UserCreateForm/>
      </div>
      <div class="wrapper-itens basis-full lg:basis-1/2">
        <p class="text-xl mb-10">Usuários cadastrados</p>
      </div >
    </div>
  </div>
</template>
<script setup>

</script>

<style lang="scss" scoped>
  .form-table-wrapper{
     @apply flex flex-wrap  gap-16;
  }
  .wrapper-itens {
    // @apply basis-full 
  }
</style>