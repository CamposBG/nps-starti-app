<template>
  <div class="h-full">
    <Html>
      <Head>
        <Meta name="naive-ui-style" />
        <Title>Starti NPS</Title>
      </Head>
    </Html>
    <NConfigProvider preflight-style-disabled>
      <NDialogProvider >
        <NNotificationProvider>
        <NMessageProvider>
          <NuxtLayout>
            <NuxtPage />
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
import { useProgress } from '@marcoschulte/vue3-progress';
import { NMessageProvider, NConfigProvider, NDialogProvider, NNotificationProvider } from 'naive-ui'

const nuxtApp = useNuxtApp();

const progresses = [];

const finish = () => {
  setTimeout(() => progresses.pop()?.finish(), 200);
};

nuxtApp.hook('page:start', () => {
  progresses.push(useProgress().start());
});

nuxtApp.hook('page:finish', () => {
  finish();
});
</script>

