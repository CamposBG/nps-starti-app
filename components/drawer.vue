<template>
  <div>
    <NDrawer
        v-model:show="openDrawer"
        :default-width="550"
        :mask-closable="maskClosable"
        placement="right"
    >
      <NDrawerContent :title="title" closable>
        <component
            :is="component"
            :props="props"
        />
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

<script setup>
import {NDrawer, NDrawerContent} from 'naive-ui';

const nuxtApp = useNuxtApp();

const openDrawer = ref(false);
const isLoaded = ref(false);
const component = ref(null);
const props = ref(null);
const title = ref(null);
const maskClosable = ref(null);
const onClose = ref(null);
const timeout = ref(null);

// event bus
nuxtApp.$bus.on('drawer:open', (opts) => {
  if (timeout.value !== null) {
    clearTimeout(timeout.value);
    title.value = null;
    maskClosable.value = null;
    onClose.value = null;
  }
  component.value = opts.component;
  props.value = opts.props ? opts.props : null;
  title.value = opts.title;
  maskClosable.value = opts.maskClosable;
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
      maskClosable.value = null;
      onClose.value = null;
    }, 1000);
  }
});

onMounted(() => {
  isLoaded.value = true;
});

onBeforeUnmount(() => {

  nuxtApp.$bus.off('drawer:close');
});
</script>
