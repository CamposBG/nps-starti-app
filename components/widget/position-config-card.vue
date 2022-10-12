<template>
  <div>
    <NCard size="large" title="Opções de posicionamento do widget">
      <NFormItem label="Posicionamento onde o widget irá aparecer" path="widgetPosition">
        <LazyWidgetSelectPosition :initial-value="props.formValue.widgetPosition"
                                  @selectPosition="(value) => props.formValue.widgetPosition = value"/>
      </NFormItem>
      <NStatistic label="Probabilidade do widget aparecer">
        {{props.formValue.probabilityToShow}}%
      </NStatistic>
      <NFormItem label="Defina a probabilidade do widget aparecer para o usuário" path="probabilityToShow">
        <NSlider v-model:value="props.formValue.probabilityToShow" :format-tooltip="value => `${value}%`"
                 :marks="marks"
                 :step="5"
                 placement="bottom"/>
      </NFormItem>
      <NFormItem label-placement="left" path="showBackdrop">
        <template #label>
          <div class="flex flex-col items-start">
            <span>
              Blur na página?
            </span>
            <small>Caso habilitado, quando o widget for mostrado, todo o fundo atrás dele ficará desfocado</small>
          </div>
        </template>
        <NSwitch v-model:value="props.formValue.showBackdrop"/>
      </NFormItem>
      <NFormItem label-placement="left" path="showVoteButton">
        <template #label>
          <div class="flex flex-col items-start">
            <span>
              Mostrar botão para avaliar (forçar aparição do widget)?
            </span>
            <small>Será mostrado um botão para abrir o widget, caso o mesmo não apareça para o usuário</small>
          </div>
        </template>
        <NSwitch v-model:value="props.formValue.showVoteButton"/>
      </NFormItem>
    </NCard>
  </div>
</template>

<script setup>
import {NCard, NFormItem, NSlider, NSwitch, NStatistic} from 'naive-ui'


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