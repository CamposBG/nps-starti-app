<template>
  <div :style="`background-color: ${color}; color: ${textColor}`"
       class=" h-9 rounded-r-md p-2 w-fit">
    {{ text }}
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String, required: true
  },
  color: {
    type: String, required: true
  },
  textColor: {
    type: String, required: true
  }
});
</script>