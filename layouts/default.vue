<template>
  <div class="app">

    <navbar />
    <div id="main">
      <slot />

    </div>
  </div>
</template>


<script setup>
</script>

<style scoped>
#main {
  transition: margin-left 0.5s;
  padding: 16px;
  margin-left: 250px;
}
</style>

