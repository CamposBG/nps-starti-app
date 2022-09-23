<template>
  <div>
    <NDropdown :options="options" trigger="hover" @select="handleSelect">
      <NButton>{{ user.name || user.email }}</NButton>
    </NDropdown>
  </div>
</template>

<script setup>
import {NButton, NDropdown, NIcon} from "naive-ui";
import {SignOutAlt, UserEdit} from "@vicons/fa";
import {useStorage} from "vue3-storage";

const storage = useStorage();
const router = useRouter();
const nuxtApp = useNuxtApp();
const user = reactive({
  name: null,
  email: null,
  guid: null,
  token: null
});

// refs | data
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

user.name = storage.getStorageSync('user').name;
user.email = storage.getStorageSync('user').email;
user.guid = storage.getStorageSync('user').guid;
user.token = storage.getStorageSync('user').token;


const options = [
  {
    label: "Editar usuário",
    key: "editProfile",
    icon: renderIcon(UserEdit),
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(SignOutAlt),
  },
];

//methods

const handleLogout = async () => {
  // await nuxtApp.$repo.auth.logout({token: user.token});
  // storage.clearStorageSync();
  // router.push("/auth/login");
};

const handleSelect = async (key) => {
  if (key === "logout") {
    await nuxtApp.$repo.auth.logout({token: user.token});
    storage.clearStorageSync()
    nuxtApp.$bus.emit("logout");
    return;
  }
  if (key === 'editProfile') {
    nuxtApp.$bus.emit("drawer:open", {
      component: "UserCreateForm",
      title: "Editar usuário",
      onClose: async () => {
        // await refresh();
      },
      maskClosable: false,
      props: ({guid: user.guid}),
    });
  }
};

</script>