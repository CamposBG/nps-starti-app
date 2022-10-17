<template>
  <div class="app h-full">
    <Navbar @isSidebarToggle="adjustMargin">
      <div class="p-10 main-content" :class="adustMainContentMarginLeft()">
        <slot />
      </div>
    </Navbar>
  </div>
</template>

<script setup>
import { useStorage } from "vue3-storage";

const store = useStorage();
const sidebarToggledState = useSidebarState();

const mainMargin = ref("ml-[250px]");

const adustMainContentMarginLeft = () => {
  if (sidebarToggledState.value === true) {
    return "ml-[60px]";
  } else if (sidebarToggledState.value === false) {
    return "ml-[250px]";
  }
};
onMounted(() => {
  adustMainContentMarginLeft();
});

// methods
// const adjustMargin = (isSideBarToggled) => {
//   if (!isSideBarToggled.value) {
//     mainMargin.value = "ml-[250px]";
//   } else {
//     mainMargin.value = "ml-[100px]";
//   }
// };
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
<style>
.main-content {
  transition: margin-left 250ms ease-in-out;
}
</style>
