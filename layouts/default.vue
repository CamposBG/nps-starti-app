<template>
  <div class="app h-full">
    <!--    <Navbar @isSidebarToggle="adjustMargin" />-->
    <!--    <div class="top-bar">-->
    <!--      <UserOptions :user="user"/>-->
    <!--    </div>-->
    <!--    <div class="main" :class="mainMargin">-->
    <!--      <slot />-->
    <!--    </div>-->
    <Navbar @isSidebarToggle="adjustMargin">
      <div class="p-10">
        <slot />
      </div>
    </Navbar>
  </div>
</template>

<script setup>
import { useStorage } from "vue3-storage";

const store = useStorage();
const nuxtApp = useNuxtApp();
const user = store.getStorageSync("user");
const router = useRouter();

const mainMargin = ref("ml-[250px]");

// methods
const adjustMargin = (isSideBarToggled) => {
  if (!isSideBarToggled.value) {
    mainMargin.value = "ml-[250px]";
  } else {
    mainMargin.value = "ml-[100px]";
  }
};
</script>

<style scoped>
.top-bar {
  @apply flex justify-end py-[13px] px-6 bg-slate-200 shadow-sm border-b border-slate-300 gap-3 items-center sticky top-0;
}

.main {
  padding: 16px;
  transition: margin-left 0.5s;
}
</style>
