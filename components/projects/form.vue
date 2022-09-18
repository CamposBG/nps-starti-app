<template>
  <NForm ref="formRef" :inline="false" :model="formValue" :rules="rules">
    <NFormItem label="Nome do projeto" path="name">
      <NInput v-model:value="formValue.name" placeholder="Digite o nome do projeto"/>
    </NFormItem>
    <NFormItem label="Tipo de pesquisa(NPS normal ou pesquisa com emoticons)" path="type">
      <NSelect
          v-model:value="formValue.type"
          :options="projectTypesMapped"
          placeholder="Escolha o tipo do projeto"
      />
    </NFormItem>
    <NFormItem label="Visualizadores do projeto" path="viewers">
      <NSelect
          v-model:value="formValue.viewers"
          :options="projectTypesMapped"
          multiple
          placeholder="Escolha os usuários que visualizaram esse projeto"
      />
    </NFormItem>
    <NFormItem label="Donos do projeto" path="owners">
      <NSelect
          v-model:value="formValue.owners"
          :options="projectTypesMapped"
          multiple
          placeholder="Escolha os usuários que terão controle sobre esse projeto"
      />
    </NFormItem>
    <NButton :loading="isSubmitting" color="teal" @click="submitForm">
      <template v-if="!isSubmitting" #icon>
        <NIcon>
          <Save/>
        </NIcon>
      </template>
      Salvar
    </NButton>
  </NForm>
</template>

<script setup>
import {Save} from '@vicons/fa';
import {NButton, NForm, NFormItem, NIcon, NInput, NSelect, useMessage} from 'naive-ui'
import {useStorage} from "vue3-storage";

const nuxtApp = useNuxtApp();
const storage = useStorage();
const router = useRouter();

const props = defineProps({
  props: {type: Object, default: null},
});

// refs | data
const formRef = ref(null);
const isSubmitting = ref(false);
const message = useMessage();
const formValue = ref({
  name: '',
  type: null,
  guid: ''
});
const rules = ref(null);
const projectTypesMapped = ref(null);
// let projectTypesMapped;

rules.value = {
  name: {
    required: true,
    message: "O nome do projeto é obrigatório",
    trigger: ["blur"]
  },
  type: {
    required: true,
    message: "O tipo de pesquisa do projeto é obrigatório",
    trigger: ["blur"]
  },
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

const getProjectTypes = async () => {
  const types = await nuxtApp.$repo.projects.listProjectsTypes();
  if (types) {
    projectTypesMapped.value = types.map((type) => ({
      label: type.name,
      value: type.id,
      disabled: false,
    }));
  }
};


onMounted(async () => {
  if (props.props?.guid) {
    formValue.value.guid = props.props.guid;
    await getProjectData()
  }

  await getProjectTypes();
})
</script>