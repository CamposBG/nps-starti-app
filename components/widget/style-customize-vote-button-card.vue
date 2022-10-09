<template>
  <div>
    <NCard size="large" title="Customização do botão de avaliar ">
      <NFormItem v-if="props.formValue.showVoteButton" label="Texto do botão" path="voteButtonText">
        <NInput v-model:value="props.formValue.voteButtonText" clearable
                placeholder="Digite o texto do botão de avaliar"
        />
      </NFormItem>
      <NFormItem label="Cor principal do botão" path="voteButtonColor">
        <NColorPicker v-model:value="props.formValue.voteButtonColor" :show-alpha="false"/>
      </NFormItem>
      <NFormItem label="Cor do texto do botão" path="voteButtonFontColor">
        <NColorPicker v-model:value="props.formValue.voteButtonFontColor" :show-alpha="false"/>
      </NFormItem>
      <NFormItem label="Visualizar um exemplo do widget?" label-placement="left">
        <NSwitch v-model:value="preview"/>
      </NFormItem>
      <NFormItem v-if="props.formValue.showVoteButton" label="Posicionamento onde o botão de avaliar irá aparecer" path="voteButtonPosition">
        <LazyWidgetSelectVoteButtonPosition :initial-value="props.formValue.voteButtonPosition"
                                  @selectPosition="(value) => props.formValue.voteButtonPosition = value"/>
      </NFormItem>
    </NCard>
  </div>
</template>

<script setup>
import {NCard, NColorPicker, NFormItem, NInput, NInputNumber, NSwitch} from 'naive-ui';

const nuxtApp = useNuxtApp();

const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});

const preview = ref(false);
const url = ref('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

const fontsFamiliesOptions = ref([
  {
    label: 'Roboto',
    value: 'Roboto',
    url: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
  },
  {
    label: 'Noto Sans Mono',
    value: 'Noto Sans Mono'
  },
]);

</script>

<!-- <style lang="scss" scoped>
$fonts: 'Inconsolata', 'Roboto', 'Alkalami', 'Gemunu Libre', 'Abyssinica SIL', 'Open Sans', 'Montserrat', 'Inter Tight', 'Lato', 'Poppins', 'Noto Sans Mono', 'Oswald', 'Roboto Mono', 'Noto Sans', 'Raleway';
$fontSelected: v-bind('props.formValue.fontFamily');

$fontSelectedIndex: index($fonts, $fontSelected);

$url: "https://fonts.googleapis.com/css2?family=#{$fontSelected}&display=swap";
@import url($url);

/* @each $color in $colors {
      &.#{$color} {
        .navbar-item {
          @apply before:left-0 before:transition-all before:mt-0 before:top-12 before:absolute before:w-full before:h-full;
          @apply before:bg-#{$color}-50 before:bg-opacity-0 before:-z-10;

          &.router-link-active {
            @apply text-#{$color}-600;
            @apply dark:text-#{$color}-100 dark:before:bg-#{$color}-700 dark:before:bg-opacity-20;
            @apply before:top-0 before:bg-opacity-60;
          }
        }

        .router-link-active {
          @apply border-#{$color}-500;
        }
      }
    } */
.font-selected {
  font-family: v-bind('props.formValue.fontFamily');
}

</style> -->