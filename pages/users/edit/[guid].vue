<template>
  <div>
    <div class=" max-w-md mx-auto">
  <p class="text-lg font-bold mb-5">Editar usuário</p>
    <UserCreateForm :user-data="userData"/>
    {{error}}
  </div>  
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const route = useRoute()
const userData = ref(null);

const data =  await nuxtApp.$repo.user.getOneUser(route.params.guid)

if (data) {
  userData.value = data;
}

</script>