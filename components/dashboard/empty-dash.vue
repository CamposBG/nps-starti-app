<template>
  <div class="h-[500px] max-w-3xl border shadow-md p-14 mx-auto mt-20">
    <div v-if="user.user_type != 1">
      <p>Nenhum projeto encontrado</p>
    </div>
    <div v-else>
      <p class="text-xl mb-10">Nenhum projeto encontrado</p>
      <div
        class="flex items-center gap-3 text-gray-600 ml-10 hover:cursor-pointer"
        @click="$router.push('/projects')"
      >
        <FolderPlus class="w-8 h-8" />
        <p class="text-xl">Criar um Projeto</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStorage } from "vue3-storage";
import { FolderPlus } from "@vicons/fa";

const storage = useStorage();
const user = storage.getStorageSync("user");
console.log(user.user_type);
</script>
