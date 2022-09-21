<template>
  <div>
    <div
        class="relative w-56 h-28 bg-slate-200 rounded-sm border border-gray-400 overflow-hidden shadow-md"
    >
      <div
          :class="getXPosition('box-right-top')"
          class="inner-square-right absolute top-5 right-0"
          name="box-right-top"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('box2-left-top')"
          class="inner-square-left absolute top-5 left-0"
          name="box2-left-top"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('box1-left-bottom')"
          class="inner-square-left absolute bottom-5 left-0"
          name="box1-left-bottom"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('box1-right-bottom')"
          class="inner-square-right absolute bottom-5 right-0"
          name="box1-right-bottom"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('box-top-middle')"
          class="inner-square-top absolute top-0 right-[35%]"
          name="box-top-middle"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('box2-bottom-middle')"
          class="inner-square-bottom absolute bottom-0 right-[35%]"
          name="box2-bottom-middle"
          @click="selectBox"
      ></div>
    </div>
  </div>
</template>

<script setup>
const positionSelected = ref(null);

const emit = defineEmits(["selectPosition"]);

const props = defineProps({
  initialValue: {type: String, default: null, required: false}
});

if (props.initialValue) {
  positionSelected.value = props.initialValue;
}

const selectBox = (e) => {
  positionSelected.value = e.target.attributes.name.value;
};
// method
const getXPosition = (boxName) => {
  if (boxName === positionSelected.value) {
    return "bg-emerald-400 opacity-60";
  } else {
    return "bg-slate-300";
  }
};

watch(positionSelected, () => {
  emit("selectPosition", positionSelected.value);
});
</script>

<style scoped>
.inner-square-right {
  @apply w-16 h-5 border-y border-l border-gray-400 hover:outline hover:outline-offset-2 hover:outline-2 hover:border-emerald-400 hover:outline-emerald-400 hover:cursor-pointer;
}

.inner-square-left {
  @apply w-16 h-5  border-y border-r border-gray-400 hover:outline hover:outline-offset-2 hover:outline-2 hover:border-emerald-400 hover:outline-emerald-400 hover:cursor-pointer;
}

.inner-square-top {
  @apply w-16 h-5  border-b border-x border-gray-400 hover:outline hover:outline-offset-2 hover:outline-2 hover:border-emerald-400 hover:outline-emerald-400 hover:cursor-pointer;
}

.inner-square-bottom {
  @apply w-16 h-5  border-t border-x border-gray-400 hover:outline hover:outline-offset-2 hover:outline-2 hover:border-emerald-400 hover:outline-emerald-400 hover:cursor-pointer;
}
</style>
