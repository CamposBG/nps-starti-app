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
      <NFormItem label="Fonte utilizada nos textos" path="fontFamily">
        <NSelect v-model:value="props.formValue.fontFamily" :options="fontsFamiliesOptions"
                 placeholder="Escolha uma fonte"/>
      </NFormItem>
      <NFormItem label="Tamanho base da fonte (px)" path="fontSize">
        <NInputNumber v-model:value="props.formValue.fontSize" clearable placeholder="Digite o tempo"/>
      </NFormItem>
      <NFormItem label="Preview do texto com a fonte e o tamanho base selecionado" path="showVoteButton">
        <div class="font-selected" :style="{fontSize: `${props.formValue.fontSize}px`}">
          Esse é um preview de como os textos ficarão
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

const nuxtApp = useNuxtApp();

const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});

const fontsFamiliesOptions = ref([]);
const hasBorder = ref(false);

const preview = ref(false);


// watch
watch(hasBorder, (value) => {
  if (!value) {
    props.formValue.borderSize = 0;
  }
});


// lifecycles
onMounted(async () => {
  const fonts = await nuxtApp.$repo.fonts.getFonts();

  if (fonts && fonts.length > 0) {
    fontsFamiliesOptions.value = fonts.map((font) => ({label: font.name, value: font.name}));
  }
});
</script>

<style lang="scss" scoped>
 $fonts: 'Inconsolata', 'Roboto', 'Alkalami', 'Gemunu Libre', 'Abyssinica SIL', 'Open Sans', 'Montserrat', 'Inter Tight', 'Lato', 'Poppins', 'Noto Sans Mono', 'Oswald', 'Roboto Mono', 'Noto Sans', 'Raleway';
 
@each $font in $fonts {
  $url: "https://fonts.googleapis.com/css2?family=#{$font}&display=swap";
  @import url($url);      
}
.font-selected {
  font-family: v-bind('props.formValue.fontFamily');
}
</style>