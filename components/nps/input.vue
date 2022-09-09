<template>
  <div class="mb-4">
    <label
      v-if="props.label !== null && !props.hideLabel"
      :for="props.id"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >{{ props.label }} {{ getAsteriskIfRequired() }}</label>
    <div
      class="flex relative"
      :class="{ 'mt-1': props.label !== null && !props.hideLabel }"
    >
      <div
        v-if="slots['prepend'] !== undefined"
        class="prepend"
      >
        <slot name="prepend" />
      </div>
      <input
        v-if="!props.static"
        :id="props.id"
        ref="input"
        v-model="value"
        :step="props.step"
        :class="getClass()"
        :name="props.name"
        :type="props.type"
        :autocomplete="props.autocomplete"
        :placeholder="props.placeholder"
        :disabled="disabled"
        @blur="onBlur"
      >
      <div
        v-else-if="props.static"
        :id="props.id"
        :class="getClass()"
        class="py-1.5 shadow-none !text-base !bg-transparent"
      >
        {{ value }}
      </div>
      <div
        v-if="loading"
        class="flex absolute inset-y-0 right-0 items-center pointer-events-none"
      >
        <svg
          class="mr-2 -ml-1 w-5 h-5 text-gray-400 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <div
        v-if="slots['append'] !== undefined"
        class="append"
      >
        <slot name="append" />
      </div>
      <div
        v-if="slots['append-btn'] !== undefined"
        class="append-btn"
      >
        <slot name="append-btn" />
      </div>
    </div>
    <p
      v-if="
        errorMessage !== undefined && errorMessage !== null && !props.disabled
      "
      class="mt-2 text-sm text-red-500 dark:text-red-300"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { toFieldValidator } from '@vee-validate/zod'

import Validators from '~/validators';

const { slots } = getCurrentInstance();

// props
const props = defineProps({
  label: { type: String, default: null},
  id: { type: String, default: null},
  name: { type: String, default: null},
  placeholder: { type: String, default: null},
  modelValue: { type: [String, Number], default: null},
  rules: { type: String, default: null},
  type: { type: String, default: 'text'},
  step: { type: Number, default: 0.1 },
  disabled: { type: Boolean, default: false},
  hideLabel: { type: Boolean, default: false },
  loading: { type: Boolean, default: false},
  static: { type: Boolean, default: false},
  autocomplete: { type: String, default: 'off' },
  isError: { type: Boolean, default: false}
});

const emit = defineEmits(['update:modelValue', 'blur']);
const input = ref(null);
defineExpose(input);

let fieldSchema = null;

if (props.rules) {
  const zodSchema = Validators.getSchema(props.rules, props.type);

  fieldSchema = toFieldValidator(zodSchema);
}

const { errorMessage, value } = useField(props.id, fieldSchema);

if (props.modelValue !== null) {
    value.value = props.modelValue;
}

// methods
const getClass = () => {
  let classes = 'block w-full sm:text-sm rounded-md shadow-sm focus:ring-2 dark:ring-gray-400 dark:text-white dark:bg-gray-800 dark:placeholder-gray-400 ';
  if ((errorMessage.value !== undefined && !props.disabled) || props.isError) {
    classes += 'border-red-300 focus:border-red-500 focus:ring-red-200';
  } else {
    classes
      += 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-200';
  }
  if (props.disabled) {
    classes
      += ' bg-gray-200 dark:text-white dark:bg-gray-700/90 dark:placeholder-gray-400';
  }
  if (slots.append !== undefined || slots['append-btn'] !== undefined) {
    classes += ' border-r-0 !rounded-r-none';
  }
  if (slots.prepend !== undefined) {
    classes += ' border-l-0 !rounded-l-none';
  }
  return classes;
};

const getAsteriskIfRequired = () => {
  if (props.rules && String(props.rules).indexOf('required') > -1) {
    return '*';
  }
  return null;
};

const onBlur = () => {
  emit('blur');
};

// watch
watch(value, () => {
  emit(
    'update:modelValue',
    typeof value.value === 'string' ? value.value.trim() : value.value,
  );
});

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  },
);

</script>

<style lang="scss" scoped>
  .append {
    @apply p-2.5 rounded-r-md sm:p-2 text-sm bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600;
    @apply dark:text-gray-400;
  }
  
  .prepend {
    @apply p-2.5 rounded-l-md sm:p-2 text-sm bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600;
    @apply dark:text-gray-400;
  }
  </style>