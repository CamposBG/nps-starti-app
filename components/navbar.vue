<template>
  <div class="h-1/2">
    <div
      class="flex justify-between p-2 border-b z-[3000] shadow-sm sticky top-0 bg-white"
    >
      <div class="flex items-center justify-center">Starti NPS</div>
      <div>
        <LazyUserOptions />
      </div>
    </div>
    <div class="h-full">
      <NLayout has-sider>
        <NLayoutSider
          :collapsed="collapsed"
          :collapsed-width="64"
          :on-update:collapsed="changeIconPosition"
          :width="240"
          bordered
          collapse-mode="width"
          content-style="height: 100%"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <div>
            <NMenu
              v-model:value="activeKey"
              :collapsed="collapsed"
              :collapsed-icon-size="22"
              :collapsed-width="64"
              :options="menuOptions"
              style="color: red"
            />
          </div>
        </NLayoutSider>
        <NLayout>
          <slot />
        </NLayout>
      </NLayout>
    </div>
  </div>
</template>

<script setup>
import { ChartPie, Cogs, Envelope, UserFriends } from "@vicons/fa";

import { h } from "vue";
import { NIcon, NLayout, NLayoutSider, NMenu } from "naive-ui";
import { RouterLink } from "vue-router";
import { useStorage } from "vue3-storage";
import { values } from "lodash";

const route = useRoute();
const storage = useStorage();

// ref|data
const collapsed = ref(false);
const activeKey = ref(null);
const user = ref(null);
user.value = storage.getStorageSync("user");

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const menuOptions = ref([
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/",
        },
        { default: () => "Dashboard" }
      ),
    key: "dashboard",
    icon: renderIcon(ChartPie),
    permission: "*",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/projects",
        },
        { default: () => "Projetos" }
      ),
    key: "projects",
    icon: renderIcon(Cogs),
    permission: "*",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/users",
        },
        { default: () => "Usuários" }
      ),
    key: "users",
    icon: renderIcon(UserFriends),
    permission: 1,
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/config-email",
        },
        { default: () => "Configuração de e-mail" }
      ),
    key: "config-email",
    icon: renderIcon(Envelope),
    permission: 1,
  },
]);

menuOptions.value = menuOptions.value.filter(
  (menu) => menu.permission === user.value.user_type || menu.permission === "*"
);

const changeIconPosition = (isCollapsed) => {
  const icon = document.getElementsByClassName("n-layout-toggle-button");
  icon[0].style.left = isCollapsed ? "38px" : "215px";
  const colorBg = document.getElementsByClassName("n-menu--vertical");
  if (colorBg[0]) {
    colorBg[0].style.width = isCollapsed ? "63px" : "215px";
  }
};

onBeforeMount(() => {
  if (!route.path.split("/")[1]) {
    activeKey.value = "dashboard";
  } else {
    activeKey.value = route.path.split("/")[1];
  }
});

onMounted(() => {
  changeIconPosition(false);
});
</script>

<style lang="scss">
.n-layout-sider-scroll-container {
  height: 100vh !important;
  position: fixed;
  overflow: hidden;
}
.n-layout-sider {
  height: 100vh !important;
}

.n-layout-toggle-button {
  position: fixed !important;
}

.n-layout-sider {
  justify-content: center;
}

.n-menu--collapsed {
  // margin-left: 30px !important;
  overflow: hidden;
  position: fixed;
  left: 2px;
}
</style>
