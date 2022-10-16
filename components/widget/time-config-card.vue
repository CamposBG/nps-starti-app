<template>
  <div>
    <NCard size="large" title="Dados básicos do widget ">
      <NFormItem label="Descrição" path="description">
        <NInput v-model:value="props.formValue.description" placeholder="Digite a descrição do widget"/>
      </NFormItem>
      <NFormItem label="Mostrar em dispositivos móveis?" label-placement="left" path="enableMobile">
        <NSwitch v-model:value="props.formValue.enableMobile"/>
      </NFormItem>
      <NFormItem label-placement="left" path="forceJustification" v-if="props.widgetType === 1">
        <template #label>
          <div class="flex flex-col items-start">
            <span>
              Obrigar comentário quando voto for detrator?
            </span>
            <small>Torna obrigatório um comentário quando a nota for abaixo de 7</small>
          </div>
        </template>
        <NSwitch v-model:value="props.formValue.forceJustification"/>
      </NFormItem>
      <NFormItem path="timesToVote" require-mark-placement="left">
        <template #label>
          <div class="flex flex-col">
            Recorência da aparição do widget
            <small>Intervalo para usuários que já votarem</small>
          </div>
        </template>
        <NSelect v-model:value="props.formValue.timesToVote" :options="timesToVoteOptions"
                 placeholder="Escolha uma opção"/>
      </NFormItem>
      <NFormItem path="timesToShow" require-mark-placement="left">
        <template #label>
          <div class="flex flex-col">
            Recorência da aparição do widget quando não votado
            <small>Intervalo de tempo para o widget aparecer para usuários que se recusaram a votar</small>
          </div>
        </template>
        <NSelect v-model:value="props.formValue.timesToShow" :options="timesToShowOptions"
                 placeholder="Escolha uma opção"/>
      </NFormItem>
      <NFormItem label="Tempo (em segundos) para mostrar o widget" path="secondsToShow">
        <NInputNumber v-model:value="props.formValue.secondsToShow" clearable placeholder="Digite o tempo"/>
      </NFormItem>
      <NFormItem label="Tempo (em segundos) para esconder automaticamente o widget" path="secondsToHide">
        <NInputNumber v-model:value="props.formValue.secondsToHide" clearable placeholder="Digite o tempo"/>
      </NFormItem>
    </NCard>
  </div>
</template>

<script setup>
import {NCard, NFormItem, NInput, NInputNumber, NSelect, NSwitch} from 'naive-ui'


const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  },
  widgetType: {type: Number, default: 1}
});

// refs | data
const timesToShowOptions = ref([
  {
    label: 'Uma vez por semana',
    value: 7
  },
  {
    label: 'Uma vez a cada 15 dias',
    value: 15
  },
  {
    label: 'Uma vez por mês',
    value: 30
  }
]);

const timesToVoteOptions = ref([
  {
    label: 'Uma única vez',
    value: 1
  },
  {
    label: 'Uma vez por semana',
    value: 7
  },
  {
    label: 'Uma vez a cada 15 dias',
    value: 15
  },
  {
    label: 'Uma vez por mês',
    value: 30
  }
]);
</script>