<template>
  <div class="grid place-items-center h-full">
    <div class="text-center">
      <component :is="iconComponent" class="w-16 mb-10" />
      <p class="font-bold text-4xl">{{ graphData }}</p>
    </div>
  </div>
</template>

<script setup>
import {
  AccessibleIcon,
  Accusoft,
  AcquisitionsIncorporated,
  Ad,
  AddressBook,
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
    icon: "AccessibleIcon",
  },
  {
    note: 2,
    icon: "Accusoft",
  },
  {
    note: 3,
    icon: "AcquisitionsIncorporated",
  },
  {
    note: 4,
    icon: "Ad",
  },
  {
    note: 5,
    icon: "AddressBook",
  },
];

const noteRounded = computed(() =>
  props.graphData ? Math.round(props.graphData) : null
);

// methods
const getIconToShow = () => {
  return notesMap.find((item) => item.note === noteRounded.value).icon;
};

const getIconComponent = (icon) => {
  if (icon === "AccessibleIcon") {
    iconComponent.value = AccessibleIcon;
  } else if (icon === "Accusoft") {
    iconComponent.value = Accusoft;
  } else if (icon === "AcquisitionsIncorporated") {
    iconComponent.value = AcquisitionsIncorporated;
  } else {
    iconComponent.value = AddressBook;
  }
};

if (getIconToShow()) {
  getIconComponent(getIconToShow());
}
</script>
