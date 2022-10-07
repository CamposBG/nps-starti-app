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
// import 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
import {NCard, NColorPicker, NFormItem, NInput, NInputNumber, NSelect, NSwitch} from 'naive-ui'

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

<style lang="scss" scoped>


.font-selected {
  font-family: v-bind('props.formValue.fontFamily');
}

</style>