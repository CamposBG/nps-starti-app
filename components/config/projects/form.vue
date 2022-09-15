<template>
  <NForm ref="formRef" :model="formValue" :rules="rules" :inline="false">
    <NFormItem label="Nome do projeto" path="name">
      <NInput v-model:value="formValue.name" placeholder="Digite o nome do projeto" />
    </NFormItem>
    <NButton color="#1C52FF" @click="submitForm" :loading="isSubmitting">
      <template #icon>
        <NIcon>
          <Save />
        </NIcon>
      </template>
      Salvar
    </NButton>
  </NForm>
</template>

<script setup>
import { Save } from '@vicons/fa';
import { NForm, NFormItem, NInput, NButton, NIcon, useMessage } from 'naive-ui'
import {useStorage} from "vue3-storage";

const nuxtApp = useNuxtApp();
const storage = useStorage();
const router = useRouter();

// refs | data
const formRef = ref(null);
const isSubmitting = ref(false);
const message = useMessage();
const formValue = ref({
  name: "",
});
const rules = ref(null);

rules.value = {
  name: {
    required: true,
    message: "O nome do projeto é obrigatório",
    trigger: ["blur"]
  }
};

// methods
const submitForm = (e) => {
  e.preventDefault();
  formRef.value?.validate(
      async (errors) => {
        if (!errors) {
          isSubmitting.value = true;
          const response = await nuxtApp.$repo.projects.createProject(formValue);
          if (response && response.success) {
            message.success("Projeto adicionado com sucesso");
            nuxtApp.$bus.emit('drawer:close')
          } else {
            message.error("Erro ao adicionar o projeto");
          }

          isSubmitting.value = false;
        }
      }
  );
}
</script>