<template>
  <div>
    <LazyConfigProjects/>
  </div>
</template>
<script setup>

const router = useRouter();

// methods
const handleBack = () => {
  router.push('/');
}
</script>