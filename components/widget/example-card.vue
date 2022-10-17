<template>
  <div>
    <NCard size="large" title="Preview do widget ">
      <LazyWidgetExample :formValue="formValue"/>
    </NCard>
  </div>
</template>

<script setup>
import {NCard} from 'naive-ui'

const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});

</script>

<style scoped>

</style>