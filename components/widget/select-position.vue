<template>
  <div>
    <div
        class="relative w-56 h-28 bg-slate-200 rounded-sm border border-gray-400 overflow-hidden shadow-md"
    >
      <div
          :class="getXPosition('15-15-0-0')"
          class="inner-square-right absolute top-5 right-0"
          name="15-15-0-0"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('15-0-0-15')"
          class="inner-square-left absolute top-5 left-0"
          name="15-0-0-15"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('0-0-15-15')"
          class="inner-square-left absolute bottom-5 left-0"
          name="0-0-15-15"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('0-15-15-0')"
          class="inner-square-right absolute bottom-5 right-0"
          name="0-15-15-0"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('15-0-0-0')"
          class="inner-square-top absolute top-0 right-[35%]"
          name="15-0-0-0"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('0-0-15-0')"
          class="inner-square-bottom absolute bottom-0 right-[35%]"
          name="0-0-15-0"
          @click="selectBox"
      ></div>
      <div
          :class="getXPosition('50-50-50-50')"
          class="inner-square-center absolute bottom-[40%] right-[35%]"
          name="50-50-50-50"
          @click="selectBox"
      ></div>
    </div>
  </div>
</template>

<script setup>
const positionSelected = ref(null);

const emit = defineEmits(["selectPosition"]);

const props = defineProps({
  initialValue: {type: String, default: '', required: false}
});

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

if (props.initialValue) {
  positionSelected.value = props.initialValue;
}

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

.inner-square-center {
  @apply w-16 h-5  border border-x border-gray-400 hover:outline hover:outline-offset-2 hover:outline-2 hover:border-emerald-400 hover:outline-emerald-400 hover:cursor-pointer;
}
</style>
