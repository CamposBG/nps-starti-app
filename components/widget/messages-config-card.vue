<template>
  <div>
    <NCard size="large" title="Configuração dos textos">
      <NFormItem label="Alterar mensagem padrão do widget?" label-placement="left" path="enableCustomMessage">
        <NSwitch v-model:value="props.formValue.enableCustomMessage"/>
      </NFormItem>
      <NFormItem v-if="props.formValue.enableCustomMessage"
                 label="Mensagem personalizada" path="message">
        <NInput v-model:value="props.formValue.message" clearable
                placeholder="Digite a mensagem a ser exibida no widget"
                type="textarea"/>
      </NFormItem>
      <NFormItem label="Alterar mensagem de agradecimento padrão do widget?" label-placement="left"
                 path="enableCustomMessage">
        <NSwitch v-model:value="props.formValue.enableCustomThanksMessage"/>
      </NFormItem>
      <NFormItem v-if="props.formValue.enableCustomThanksMessage" label="Mensagem de agradecimento personalizada"
                 path="message">
        <NInput v-model:value="props.formValue.thanksMessage" clearable
                placeholder="Digite a mensagem de agradecimento que será exibida após o usuário realizar o seu voto"
                type="textarea"/>
      </NFormItem>
    </NCard>
  </div>
</template>

<script setup>
import {NCard, NFormItem, NInput, NSwitch} from 'naive-ui'

const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});


// watchs
watch(() => props.formValue.enableCustomMessage, (value) => {
  if (!value) {
    props.formValue.message = null;
  }
})

watch(() => props.formValue.enableCustomThanksMessage, (value) => {
  if (!value) {
    props.formValue.thanksMessage = null;
  }
})
</script>