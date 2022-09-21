<template>
  <div>
    <NCard size="large" title="Configuração de cor">
      <NForm ref="formRef" :inline="false" :model="formValue">
        <NFormItem label="Cor principal do widget" path="color">
          <NColorPicker v-model:value="props.formValue.color" :show-alpha="false"/>
        </NFormItem>
        <NFormItem label="Visualizar widget?" label-placement="left">
          <NSwitch v-model:value="preview"/>
        </NFormItem>
      </NForm>
      <div v-if="preview" class="flex flex-col items-center gap-y-8">
        <div :style="{backgroundColor: `${props.formValue.color}`}" class="w-96 bg-amber-100 h-48 rounded-md">
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
        <div class="flex gap-x-4">
          <div :class="[props.formValue.color === '#FFFFFF' ? '' : 'text-white']"
               :style="{backgroundColor: `${props.formValue.color}`}"
               class="p-2 w-1/2 flex justify-center items-center rounded-md">
            Mensagem padrão/personalizada
          </div>
          <div :class="[props.formValue.color === '#FFFFFF' ? '' : 'text-white']"
               :style="{backgroundColor: `${props.formValue.color}`}"
               class="p-2 w-1/2 flex justify-center items-center rounded-md">
            Mensagem de agradecimento padrão/personalizada
          </div>
        </div>
      </div>
    </NCard>
  </div>
</template>

<script setup>
import {NCard, NColorPicker, NForm, NFormItem, NSwitch} from 'naive-ui'

const props = defineProps({
  formValue: {
    type: Object, default: null, required: true
  }
});

const preview = ref(false);

</script>