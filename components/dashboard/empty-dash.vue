<template>
  <div class="max-w-xl border shadow-md p-14 mx-auto mt-20">
    <div v-if="user.user_type != 1" class="flex justify-center items-center">
      <p class="text-xl">Nenhum projeto encontrado!</p>
    </div>
    <div v-else>
      <p class="text-xl mb-10">Nenhum projeto encontrado!</p>
      <div
        class="flex items-center gap-3 text-gray-600 ml-10 hover:cursor-pointer hover:text-green-600"
        @click="$router.push('/projects')"
      >
        <FolderPlus class="w-8 h-8" />
        <p class="text-xl">Crie um projeto</p>
      </div>
      <div
        class="flex items-center gap-3 text-gray-600 ml-10 hover:cursor-pointer hover:text-green-600 mt-10"
        @click="$router.push('/users')"
      >
        <UserEdit class="w-8 h-8" />
        <p class="text-xl">Gerencie usuários</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStorage } from "vue3-storage";
import { FolderPlus, UserEdit } from "@vicons/fa";

const storage = useStorage();
const user = storage.getStorageSync("user");
</script>
