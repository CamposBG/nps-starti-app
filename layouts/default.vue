<template>
  <div class="app">
    <Navbar @isSidebarToggle="adjustMargin" />
    <div class="top-bar">
      <UserCircle class="w-5 h-5" />
      <p>{{user.email}}</p>
      <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
          <DoorOpen class="w-5 h-5 hover: cursor-pointer" v-on:click="logOut" />
        </template>
        <span> Sair do sistema </span>
      </NTooltip>
    </div>
    <div class="main" :class="mainMargin">
      <slot />
    </div>
  </div>
</template>


<script setup>
import { NTooltip } from 'naive-ui';
import { UserCircle, DoorOpen } from '@vicons/fa';
import { useStorage } from 'vue3-storage';


const store = useStorage();
const user = store.getStorageSync('user')
const router = useRouter()

const mainMargin = ref('ml-[250px]')

// methods
const adjustMargin = (isSideBarToggled) => {
  if (!isSideBarToggled.value) {
    mainMargin.value = 'ml-[250px]'
  } else {
    mainMargin.value = 'ml-[100px]'
  }
}

const logOut = () => {
  localStorage.clear()
  router.push('/auth/login')
}
</script>

<style scoped>
.top-bar {
  @apply flex justify-end py-[13px] px-6 bg-slate-200 shadow-sm border-b border-slate-300 gap-3 items-center sticky top-0 ;
}

.main {
  padding: 16px;
  transition: margin-left 0.5s;
}
</style>

