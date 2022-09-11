<template>
  <div class="app">

    <Navbar @isSidebarToggle="adjustMargin"/>
    <div class="flex justify-end py-[13px] px-6 bg-slate-200 shadow-sm border-b border-slate-300 gap-3 items-center sticky top-0">
      <p>userName</p>      
      <UserCircle class="w-5 h-5"/>
    </div>
    <div class="main" :class="mainMargin">
      <slot />
    </div>
  </div>
</template>


<script setup>
import { UserCircle} from '@vicons/fa';

const mainMargin = ref('ml-[250px]')

// methods
const adjustMargin = (isSideBarToggled) => {
  if (!isSideBarToggled.value) {
    mainMargin.value = 'ml-[250px]'
  } else {
    mainMargin.value = 'ml-[100px]'
    
  }
}
</script>

<style scoped>
.main {
  padding: 16px;
  transition: margin-left 0.5s;
}
</style>

