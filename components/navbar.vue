<template>
  <div>
    <div id="mySidebar" class="sidebar">
      <div class="bg-blue-700 text-center py-3">
        <NuxtLink class="text-blue-200 text-xl tracking-wide" to="/">NPS STARTI</NuxtLink>

      </div>
      <div class="mt-5 text-lg text-blue-100 pl-5 flex flex-col gap-5">
        <div class="menu-icon  hover:text-amber-400" :class="{'text-amber-400':activeLink ==='dash'}">
          <NuxtLink class="link flex gap-4 items-center" to="/dashboard">
            <ChartPie class=" icon w-6 h-6 shrink-0" />Dashboard
          </NuxtLink>
        </div>
        <div class=" menu-icon  hover:text-sky-400 " :class="{'text-sky-400':activeLink ==='config'}">

          <NuxtLink class="link flex gap-4 items-center" to="/config">
            <Cog class="icon w-6 h-6 shrink-0" /> Configurações
          </NuxtLink>
        </div>
        <div class=" menu-icon  hover:text-emerald-400" :class="{'text-emerald-400':activeLink ==='users'}">

          <NuxtLink class="link flex gap-4 items-center" to="/users">
            <AddressCard class="icon w-6 h-6 shrink-0 " />Usuários
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChartPie, Cog, AddressCard } from '@vicons/fa';

const route = useRoute()
// ref|data
const mini = ref(true)

const activeLink = computed(() => {
  if (route.path === '/') {
    return "index"
  } else if (route.path.includes('/dashboard')) {
    return 'dash'
  } else if (route.path.includes('/config')) {
    return 'config'
  } else if (route.path.includes('/users')) {
    return 'users'
  }
})


</script>

<style scoped  lang="scss">
.sidebar {
  @apply h-full w-[200px] fixed top-0 left-0 bg-slate-500 z-10;
}

.menu-icon:hover {
  .icon {
    animation: swing ease-in-out 0.5s 1 alternate;
  }
}

@keyframes swing {

  0%,
  30%,
  50%,
  70%,
  100% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(10deg);
  }

  40% {
    transform: rotate(-10deg);
  }

  60% {
    transform: rotate(5deg);
  }

  80% {
    transform: rotate(-5deg);
  }
}
</style>