<template>
  <div>
    <NCard size="large" title="Customização do widget ">
      <NFormItem label="Cor principal" path="color">
        <NColorPicker v-model:value="props.formValue.color" :show-alpha="false"/>
      </NFormItem>
      <NFormItem label="Cor do corpo do widget" path="bgColor">
        <NColorPicker v-model:value="props.formValue.bgColor" :show-alpha="false"/>
      </NFormItem>
      <NFormItem label="Cor dos textos" path="fontColor">
        <NColorPicker v-model:value="props.formValue.fontColor" :show-alpha="false"/>
      </NFormItem>
      <NFormItem label="Deseja que o widget tenha borda?" label-placement="left">
        <NSwitch v-model:value="hasBorder"/>
      </NFormItem>
      <NFormItem v-if="hasBorder" label="Tamanho da borda (px)" path="borderSize">
        <NInputNumber v-model:value="props.formValue.borderSize" clearable min="0"
                      placeholder="Digite o tamanho da borda"/>
      </NFormItem>
      <NFormItem v-if="props.formValue.borderSize > 0" label="Cor da borda" path="borderColor">
        <NColorPicker v-model:value="props.formValue.borderColor" :show-alpha="false"/>
      </NFormItem>
      <NFormItem v-if="props.formValue.borderSize && props.formValue.borderSize > 0" label="Cor da borda"
                 path="borderColor">
        <NColorPicker v-model:value="props.formValue.borderColor" :show-alpha="false"/>
      </NFormItem>
      <NFormItem label="Visualizar um exemplo do widget?" label-placement="left">
        <NSwitch v-model:value="preview"/>
      </NFormItem>
      <NFormItem label="Fonte utilizada nos textos" path="showVoteButton">
        <!-- <NSelect v-model:value="props.formValue.fontFamily" :options="fontsFamiliesOptions"
                 placeholder="Escolha uma opção"/> -->
                 <div id="font-picker"></div>
      </NFormItem>
      <NFormItem label="Tamanho base da fonte (px)" path="fontSize">
        <NInputNumber v-model:value="props.formValue.fontSize" clearable placeholder="Digite o tempo"/>
      </NFormItem>
      <NFormItem label="Preview da fonte" path="showVoteButton">
        <div class="apply-font" :style="{fontSize: `${props.formValue.fontSize}px`}">
          Esse é o preview ta fonte selecionada
        </div>
      </NFormItem>
      <div v-if="preview" class="flex flex-col items-center gap-y-8">
        <div class="border w-full h-96 flex justify-center items-center relative">
          <div :style="{backgroundColor: `${props.formValue.color}`}"
               class="w-96 bg-amber-100 h-48 rounded-md mb-4">
            <span :class="[props.formValue.color === '#FFFFFF' ? '' : 'text-white']" class="p-2">
              Pesquisa de satisfação
            </span>
            <div class="bg-gray-100 h-full font-medium flex justify-center items-center">
              <div :class="[props.formValue.color === '#FFFFFF' ? '' : 'text-white']"
                   :style="{backgroundColor: `${props.formValue.color}`}"
                   class="p-2 w-1/2 flex justify-center rounded-md">
                onde será dada a nota
              </div>
            </div>
          </div>
          <div
              v-if="props.formValue.showVoteButton"
              :style="{backgroundColor: `${props.formValue.color}`}"
              class="absolute bottom-10 text-black -right-5  w-20 h-10 border-b-0 rounded-t-md border-2 border-gray-300 p-2 -rotate-90 flex justify-center items-center font-bold">
            Avaliar
          </div>
        </div>
      </div>

    </NCard>
  </div>
</template>

<script setup>
import {NCard, NColorPicker, NFormItem, NInput, NInputNumber, NSelect, NSwitch} from 'naive-ui';
import FontPicker from 'font-picker';

const nuxtApp = useNuxtApp();

const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});

const fontPicker = ref(null);
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const hasBorder = ref(false);

const preview = ref(false);
const font1 = ref(null);


// watch
watch(hasBorder, (value) => {
  if (!value) {
    props.formValue.borderSize = 0;
  }
});

console.log({apiKey});

// lifecycles
onMounted(() => {
  fontPicker.value = new FontPicker(
    apiKey,
  'Roboto',
  { limit: 100}
);
});
</script>

<style>
 .dropdown-button {
  background-color: #fff !important;
  border-radius: 50% !important;
 }
</style>