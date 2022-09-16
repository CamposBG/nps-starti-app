<template>
  <div>
    <n-dropdown :options="options" trigger="hover" @select="handleSelect">
      <n-button >{{user.name || user.email}}</n-button>
    </n-dropdown>
  </div>
</template>

<script setup>
import { NDropdown, NButton, NIcon } from 'naive-ui';
import { SignOutAlt, UserEdit } from '@vicons/fa';
import {useStorage} from "vue3-storage";

const storage = useStorage();
const router = useRouter();
const nuxtApp = useNuxtApp();

const props = defineProps({

  user: { type: Object }
})


// refs | data
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
}

const options = [
  {
    label: "Editar usuário",
    key: "editProfile",
    icon: renderIcon(UserEdit)
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(SignOutAlt)
  }
]

//methods

const handleLogout = async () => {
  await nuxtApp.$repo.auth.logout({token: user.token});
  store.clearStorageSync();
  router.push('/auth/login');
};

const handleSelect = (key) => {
  if(key === 'logout'){
    localStorage.clear()
  router.push('/auth/login')
  return
  }
  if(key === 'editProfile'){
    console.log('edit')
    router.push(`/users/${props.guid}`)    
  }
}
 
</script>