<template>
  <div>
    <LazyConfigProjects />
  </div>
</template>
<script setup>
import { NPageHeader, NCard, NTabPane, NTabs } from 'naive-ui';

const router = useRouter();

// methods
const handleBack = () => {
  router.push('/');
}
</script>