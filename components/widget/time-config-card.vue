<template>
  <div>
    <NCard size="large" title="Dados básicos do widget ">
      <NFormItem label="Descrição" path="description">
        <NInput v-model:value="props.formValue.description" placeholder="Digite a descrição do widget"/>
      </NFormItem>
      <NFormItem path="timesToShow" require-mark-placement="left">
        <template #label>
          <div class="flex flex-col">
            Recorência da aparição do widget
            <small>Intervalo para usuários que já votaram, votarem novamente</small>
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
import {NCard, NFormItem, NInput, NInputNumber, NSelect} from 'naive-ui'

const emit = defineEmits(["updateForm"]);

const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});

// refs | data
const timesToShowOptions = ref([
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