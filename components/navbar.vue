<template>
  <div>    
    <div class="sidebar overflow-hidden" :class="sidebarWidth">
      <div class="bg-slate-500 text-center py-3" :class="{'pl-2':minimized}">
        <NuxtLink class="text-gray-200 text-xl tracking-wide whitespace-nowrap" to="/">NPS  <br><span v-show="!minimized" class="transition ease-in-out delay-500">STARTI</span> </NuxtLink>
      </div>
      <div v-if="!minimized" class=" mt-10 pl-5 text-sm text-gray-100 shadow-sm ">
        <p class="">MENU</p>
      </div>
      
      <div class="mt-5 text-lg text-gray-100 pl-5 flex flex-col gap-5">
        <div class="menu-icon  hover:text-amber-400 hover:shadow-sm" :class="{'text-amber-400':activeLink ==='dash'}">
          <NuxtLink class="link flex gap-4 items-center" to="/dashboard">
            <ChartPie class=" icon w-6 h-6 shrink-0" />Dashboard
          </NuxtLink>
        </div>
        <div class=" menu-icon  hover:text-sky-400 hover:shadow-sm" :class="{'text-sky-400':activeLink ==='config'}">

          <NuxtLink class="link flex gap-4 items-center" to="/config">
            <Cog class="icon w-6 h-6 shrink-0" /> Configurações
          </NuxtLink>
        </div>
        <div class=" menu-icon  hover:text-emerald-400 hover:shadow-sm" :class="{'text-emerald-400':activeLink ==='users'}">

          <NuxtLink class="link flex gap-4 items-center" to="/users">
            <AddressCard class="icon w-6 h-6 shrink-0 " />Usuários
          </NuxtLink>
        </div>
      </div>
      <div class="minimize-icon" :class="{'rotate-180':minimized}" @click="toglleSidebar">
        <AngleDoubleLeft class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChartPie, Cog, AddressCard, AngleDoubleLeft } from '@vicons/fa';

const emit = defineEmits(['isSidebarToggle'])

const route = useRoute()
// ref|data
const minimized = ref(false)

// methods
const toglleSidebar = () => {
  console.log("aqui")
  minimized.value = !minimized.value
}
// computed
const sidebarWidth = computed(()=>{
  return minimized.value? 'w-[61px]': 'w-[200px]'
})

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

watch(minimized, ()=>{
  console.log("mudou")
  emit('isSidebarToggle', minimized)
})

</script>

<style  lang="scss" scoped>
.sidebar {
  @apply h-full fixed top-0 left-0 bg-slate-500 z-10;
  transition: 0.3s ease;
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
.minimize-icon {
  @apply fixed bottom-6 left-6 text-gray-100 hover:cursor-pointer;
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>