<template>
  <div class="grid place-items-center h-full">
    <div class="text-center">
      <component :is="getIconToShow()" class="w-36 mb-10 text-yellow-400" />
      <p class="font-bold text-5xl">{{ graphData }}</p>
    </div>
  </div>
</template>

<script setup>
import {
  Surprise,
  SadTear,
  Meh,
  GrinAlt,
  SmileWink
} from "@vicons/fa";

const props = defineProps({
  graphData: { type: Number },
});

console.log(props.graphData);

// ref data
// const iconComponent = shallowRef(resolveComponent("AccessibleIcon"));
const iconComponent = shallowRef();

const notesMap = [
  {
    note: 1,
    icon: SadTear
  },
  {
    note: 2,
    icon: Surprise
  },
  {
    note: 3,
    icon: Meh
  },
  {
    note: 4,
    icon: GrinAlt
  },
  {
    note: 5,
    icon: SmileWink
  },
];

const noteRounded = computed(() =>
  props.graphData ? Math.round(props.graphData) : null
);

// methods
const getIconToShow = () => {
  return notesMap.find((item) => item.note === noteRounded.value).icon;
};

</script>
