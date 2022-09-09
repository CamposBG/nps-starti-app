<template>
   <Form @submit="onSubmit">
    <slot />
  </Form>
</template>

<script setup>
import { Form, useForm, defineRule } from 'vee-validate';

defineRule('required', (value) => {
  if ( !value || !value.length) {
    return 'Esse campo é obrigatório';
  }

  return true;
});

const emit = defineEmits(['isSubmittingForm', 'submit']);
const { handleSubmit, isSubmitting } = useForm();

// methods
const onSubmit = handleSubmit(() => {
  emit('isSubmittingForm', isSubmitting.value);
  emit('submit');
}, () => {
  emit('isSubmittingForm', false);
}
);

defineExpose({ onSubmit, handleSubmit });
</script>