<template>
  <div>
    <NCard size="large" title="Posicionamento do widget e propabilidade de aparição">
      <NFormItem label="Habilitar no mobile?" label-placement="left" path="enableMobile">
        <NSwitch v-model:value="props.formValue.enableMobile"/>
      </NFormItem>
      <NFormItem label="Posicionamento onde o widget irá aparecer" path="widgetPosition">
        <LazyWidgetSelectPosition :initial-value="props.formValue.widgetPosition"
                                  @selectPosition="(value) => props.formValue.widgetPosition = value"/>
      </NFormItem>
      <NFormItem label="Probabilidade do widget aparecer para o usuário" path="probabilityToShow">
        <NSlider v-model:value="props.formValue.probabilityToShow" :format-tooltip="value => `${value}%`"
                 :marks="marks"
                 :step="5"
                 placement="bottom"
                 show-tooltip/>
      </NFormItem>
    </NCard>
  </div>
</template>

<script setup>
import {NCard, NFormItem, NSlider, NSwitch} from 'naive-ui'


const props = defineProps({
  formValue: {type: Object, default: null, required: true}
});

const rules = ref(null);
const marks = ref({
  0: '0%',
  50: '50%',
  100: '100%'
});
</script>