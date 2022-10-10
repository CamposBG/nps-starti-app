<template>
  <div>
    <LazyConfigProjects/>
  </div>
</template>
<script setup>
definePageMeta({
  userType: 1,
});

const router = useRouter();

// methods
const handleBack = () => {
  router.push('/');
}
</script>