<template>
  <div class="h-full">
    <Html>
      <Head>
        <Title>Starti NPS</Title>
      </Head>
    </Html>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <vue3-progress-bar />
  </div>
</template>

<script setup>
import { useProgress } from '@marcoschulte/vue3-progress';


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

