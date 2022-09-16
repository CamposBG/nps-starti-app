<template>
  <NForm ref="formRef" :model="formValue" :rules="rules" :inline="false">
    <NFormItem label="Nome do projeto" path="name">
      <NInput v-model:value="formValue.name" placeholder="Digite o nome do projeto" />
    </NFormItem>
    <NButton color="teal" @click="submitForm" :loading="isSubmitting">
      <template #icon v-if="!isSubmitting">
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

const props = defineProps({
  props: { type: Object, default: null },
});

// refs | data
const formRef = ref(null);
const isSubmitting = ref(false);
const message = useMessage();
const formValue = ref({
  name: "",
  guid: ''
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
  isSubmitting.value = true;

  e.preventDefault();
  formRef.value?.validate(
      async (errors) => {
        if (!errors) {
         if (!formValue.value.guid) {
           const response = await nuxtApp.$repo.projects.createProject(formValue.value);
           if (response && response.success) {
             message.success("Projeto adicionado com sucesso");
             nuxtApp.$bus.emit('drawer:close')
             isSubmitting.value = false;
           } else {
             message.error("Erro ao adicionar o projeto");
             isSubmitting.value = false;
           }
         } else {
           const response = await nuxtApp.$repo.projects.updateProject(formValue.value.guid, formValue.value);
           if (response && response.success) {
             message.success("Projeto atualizado com sucesso");
             nuxtApp.$bus.emit('drawer:close');
             isSubmitting.value = false;

           } else {
             message.error("Erro ao atualizar o projeto");
             isSubmitting.value = false;
           }
         }
        }
      }
  );
  isSubmitting.value = false;
}

const getProjectData = async () => {
  const response = await nuxtApp.$repo.projects.findOneProject(formValue.value.guid);

  if (response) {
    formValue.value.name = response.name;
  }
};


onMounted(async () => {
  if (props.props.guid) {
    formValue.value.guid = props.props.guid;
    await getProjectData()
  }
})
</script>