<template>
  <div class="h-1/2">
    <div class="flex justify-between p-2 border-b shadow-md">
      <div class="flex items-center justify-center">
        Starti NPS
      </div>
      <div>
        <LazyUserOptions/>
      </div>
    </div>
    <div class="h-full">
      <NLayout has-sider>
        <NLayoutSider
            :collapsed="collapsed"
            :collapsed-width="64"
            :width="240"
            bordered
            collapse-mode="width"
            content-style="height: 100%"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
          <div class="flex flex-col justify-between flex-auto">
            <NMenu
                v-model:value="activeKey"
                :collapsed="collapsed"
                :collapsed-icon-size="22"
                :collapsed-width="64"
                :options="menuOptions"
                style="color: red"
            />
            <!--            <n-layout-footer bordered> Chengfu Road</n-layout-footer>-->
          </div>
        </NLayoutSider>
        <NLayout>
          <slot/>
        </NLayout>
      </NLayout>
    </div>
  </div>
</template>

<script setup>
import {ChartPie, Cogs, Envelope, UserFriends} from "@vicons/fa";

import {h} from "vue";
import {NIcon, NLayout, NLayoutSider, NMenu} from "naive-ui";
import {RouterLink} from "vue-router";

const route = useRoute();

// ref|data
const collapsed = ref(false);
const activeKey = ref(null);

const renderIcon = (icon) => {
  return () => h(NIcon, null, {default: () => h(icon)});
};

const menuOptions = ref([
  {
    label: () =>
        h(
            RouterLink,
            {
              to: "/",
            },
            {default: () => "Dashboard"}
        ),
    key: "dashboard",
    icon: renderIcon(ChartPie),
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: "/projects",
            },
            {default: () => "Projetos"}
        ),
    key: "projects",
    icon: renderIcon(Cogs),
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: "/users",
            },
            {default: () => "Usuários"}
        ),
    key: "users",
    icon: renderIcon(UserFriends),
  }, {
    label: () =>
        h(
            RouterLink,
            {
              to: "/config-email",
            },
            {default: () => "Configuração de e-mail"}
        ),
    key: "config-email",
    icon: renderIcon(Envelope),
  },
]);

onBeforeMount(() => {
  if (!route.path.split("/")[1]) {
    activeKey.value = "dashboard";
  } else {
    activeKey.value = route.path.split("/")[1];
  }
});
</script>

<style lang="scss">
.n-layout-sider-scroll-container {
  height: 100vh !important;
}
</style>