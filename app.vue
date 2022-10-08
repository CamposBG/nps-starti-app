<template>
  <div class="h-full">
    <Html>
      <Head>
        <Meta name="naive-ui-style" />
        <Title>Starti NPS</Title>
      </Head>
    </Html>
    <NConfigProvider preflight-style-disabled>
      <NDialogProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <NuxtLayout>
              <NuxtPage :key="$route.fullPath" />
            </NuxtLayout>
            <LazyDrawer />
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NConfigProvider>
    <vue3-progress-bar />
  </div>
</template>

<script setup>
import { useProgress } from "@marcoschulte/vue3-progress";
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
} from "naive-ui";
import { useStorage } from "vue3-storage";

const nuxtApp = useNuxtApp();
const router = useRouter();
const storage = useStorage();

const user = storage.getStorageSync("user");

const progresses = [];

const finish = () => {
  setTimeout(() => progresses.pop()?.finish(), 200);
};

nuxtApp.$bus.on("logout", () => {
  router.push("/auth/login");
});

nuxtApp.hook("page:start", () => {
  progresses.push(useProgress().start());
});

nuxtApp.hook("page:finish", () => {
  finish();
});
</script>

<style>
.n-layout .n-layout-scroll-container {
  overflow-y: hidden !important;
}
</style>
