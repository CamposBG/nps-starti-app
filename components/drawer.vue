<template>
    <NDrawer
      v-model:show="openDrawer"
      placement="right"
      :default-width="550"
    >
      <NDrawerContent :title="title" closable>
        <component
          :is="component"
          :props="props"
        />
      </NDrawerContent>
    </NDrawer>
</template>

<script setup>
import {
  NDrawer,
  NDrawerContent
} from 'naive-ui';

const nuxtApp = useNuxtApp();

const openDrawer = ref(false);
const component = ref(null);
const props = ref(null);
const title = ref(null);
const onClose = ref(null);
const timeout = ref(null);

// event bus
nuxtApp.$bus.on('drawer:open', (opts) => {
  if (timeout.value !== null) {
    clearTimeout(timeout.value);
    title.value = null;
    onClose.value = null;
  }
  component.value = opts.component;
  props.value = opts.props;
  title.value = opts.title;
  openDrawer.value = true;
  if (typeof opts.onClose === 'function') {
    onClose.value = opts.onClose;
  }
});

nuxtApp.$bus.on('drawer:close', () => {
  openDrawer.value = false;
});

// watch
watch(openDrawer, (newValue) => {
  if (!newValue) {
    if (typeof onClose.value === 'function') {
      onClose.value();
    }
    timeout.value = setTimeout(() => {
      title.value = null;
      onClose.value = null;
    }, 1000);
  }
});
</script>
