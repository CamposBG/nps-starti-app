<template>
  <div
  >
    <NModal
      v-model:show="showModal"
      preset="dialog"
      :title="title"
      :content="content"
      :positive-text="positiveText"
      :negative-text="negativeText"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    >

    </NModal>
  </div>
</template>

<script setup>
import {NModal} from 'naive-ui';

const nuxtApp = useNuxtApp();
const propsPass = defineProps({
  dark: { type: Boolean, defalt: false },
});
const openSlideOver = ref(false);
const component = ref(null);
const props = ref(null);
const title = ref(null);
const content = ref(null);
const positiveText = ref(null);
const negativeText = ref(null);
const description = ref(null);
const closeOnDialog = ref(true);
const onClose = ref(null);
const timeout = ref(null);

const close = () => {
  if (closeOnDialog.value) {
    openSlideOver.value = false;
  }
};

// event bus
nuxtApp.$bus.on('slide-over:open', (opts) => {
  if (timeout.value !== null) {
    clearTimeout(timeout.value);
    title.value = null;
    description.value = null;
    onClose.value = null;
  }
  component.value = opts.component;
  props.value = opts.props;
  title.value = opts.title;
  description.value = opts.description !== undefined ? opts.description : null;
  openSlideOver.value = true;
  closeOnDialog.value = opts.closeOnDialog !== undefined ? opts.closeOnDialog : true;
  if (typeof opts.onClose === 'function') {
    onClose.value = opts.onClose;
  }
});

nuxtApp.$bus.on('slide-over:close', () => {
  openSlideOver.value = false;
});

// watch
watch(openSlideOver, (newValue) => {
  if (!newValue) {
    if (typeof onClose.value === 'function') {
      onClose.value();
    }
    timeout.value = setTimeout(() => {
      title.value = null;
      description.value = null;
      onClose.value = null;
    }, 1000);
  }
});
</script>
