<template>
  <div class="app">

    <navbar />
    <div class="flex justify-end py-[13px] px-6 bg-slate-200 shadow-sm border-b border-slate-300 gap-3 items-center sticky top-0">
      <p>userName</p>      
      <UserCircle class="w-5 h-5"/>
    </div>
    <div class="main">
      <slot />

    </div>
  </div>
</template>


<script setup>
import { UserCircle} from '@vicons/fa';

</script>

<style scoped>
.main {
  padding: 16px;
  margin-left: 250px;
  transition: margin-left 0.5s;
}
</style>

