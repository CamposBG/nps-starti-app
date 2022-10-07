<template>
  <div>
    <NCard size="large" title="Configuração de domínios">
      <NForm ref="formRef" :inline="false" :model="formValue">
        <NFormItem
            label="Se desejar defina abaixo os domínios que quiser e desta forma o widget irá aparecer apenas nas urls que pertencerem aos domínios configurados nessa sessão"
            path="domains">
          <NDynamicTags v-model:value="props.formValue.domains"/>
        </NFormItem>
      </NForm>
    </NCard>
  </div>
</template>

<script setup>
import {NCard, NDynamicTags, NForm, NFormItem} from 'naive-ui'

const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});
</script>