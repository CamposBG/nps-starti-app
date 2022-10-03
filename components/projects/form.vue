<template>
  <div>
    <NForm v-if="!isLoading" ref="formRef" :inline="false" :model="formValue" :rules="rules">
      <NFormItem label="Nome do projeto" path="name">
        <NInput v-model:value="formValue.name" placeholder="Digite o nome do projeto"/>
      </NFormItem>
      <NFormItem label="Tipo de pesquisa(NPS normal ou pesquisa com emoticons)" path="type">
        <NSelect
            v-model:value="formValue.type"
            :disabled="formValue.guid"
            :options="projectTypesMapped"
            placeholder="Escolha o tipo do projeto"
        />
      </NFormItem>
      <NFormItem label="Visualizadores do projeto" path="viewers">
        <NSelect
            v-model:value="formValue.viewers"
            :options="usersMapped"
            multiple
            placeholder="Escolha os usuários que visualizarão esse projeto"
        >
          <template #empty>
          <span class="text-sm">
            Nenhum usuário disponível
          </span>
          </template>
        </NSelect>
      </NFormItem>
      <NFormItem label="Donos do projeto" path="owners">
        <NSelect
            v-model:value="formValue.owners"
            :options="usersMapped"
            multiple
            placeholder="Escolha os usuários que terão controle sobre esse projeto"
        >
          <template #empty>
          <span class="text-sm">
            Nenhum usuário disponível
          </span>
          </template>
        </NSelect>
      </NFormItem>
      <NButton :loading="isSubmitting" color="teal" icon-placement="right" @click="submitForm">
        <template v-if="!isSubmitting" #icon>
          <NIcon>
            <Save/>
          </NIcon>
        </template>
        Salvar
      </NButton>
    </NForm>
    <div v-else class="flex justify-center items-center">
      <NSpin size="large"/>
    </div>
  </div>


</template>

<script setup>
import {Save} from '@vicons/fa';
import {NButton, NForm, NFormItem, NIcon, NInput, NSelect, NSpin, useMessage, useNotification} from 'naive-ui'
import {useStorage} from "vue3-storage";

const nuxtApp = useNuxtApp();
const storage = useStorage();
const router = useRouter();

const props = defineProps({
  props: {type: Object, default: null},
  guid: {type: String, default: null},
});

// refs | data
const formRef = ref(null);
const isSubmitting = ref(false);
const isLoading = ref(true);
const message = useMessage();
const notification = useNotification();
const formValue = ref({
  name: '',
  type: null,
  viewers: null,
  owners: null,
  guid: null
});
const rules = ref(null);
const projectTypesMapped = ref(null);
const usersMapped = ref(null);

rules.value = {
  name: {
    required: true,
    message: "É obrigatório dar um nome ao projeto",
    trigger: ["blur"]
  },
  type: {
    required: true,
    message: "O tipo de pesquisa do projeto deve ser escolhido",
  },
  viewers: {
    required: false,
  },
  owners: {
    required: false,
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
              notification.success({
                content: "Sucesso",
                meta: "O projeto foi criado",
                duration: 2000,
                keepAliveOnHover: false
              });
              nuxtApp.$bus.emit('drawer:close')
              isSubmitting.value = false;
            } else {
              notification.error({
                content: "Erro",
                meta: response.error,
                duration: 2500,
                keepAliveOnHover: true
              });
              isSubmitting.value = false;
            }
          } else {
            const response = await nuxtApp.$repo.projects.updateProject(formValue.value.guid, formValue.value);
            if (response && response.success) {
              notification.success({
                content: "Sucesso",
                meta: "O projeto foi atualizado",
                duration: 2000,
                keepAliveOnHover: false
              });
              nuxtApp.$bus.emit('drawer:close');
              isSubmitting.value = false;

            } else {
              notification.error({
                content: "Erro",
                meta: response.error,
                duration: 2500,
                keepAliveOnHover: true
              });
              isSubmitting.value = false;
            }
          }
        }
      }
  );
  isSubmitting.value = false;
}

const getProjectData = async () => {
  const response = await nuxtApp.$repo.projects.findOneProject(props.props.guid);
  if (response) {
    formValue.value.guid = response.guid;
    formValue.value.name = response.name;
    formValue.value.type = response.type;

    if (response.viewers?.length > 0) {
      formValue.value.viewers = response.viewers.map((item) => item.id);
    }
    if (response.owners?.length > 0) {
      formValue.value.owners = response.owners.map((item) => item.id);
    }
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

const getUsers = async () => {
  const users = await nuxtApp.$repo.user.usersDropDown();
  if (users) {
    usersMapped.value = users.map((user) => ({
      label: user.name,
      value: user.id,
      disabled: false,
    }));
  }
};


onMounted(async () => {
  if (props.props?.guid) {
    await getProjectData();
  }

  await getProjectTypes();
  await getUsers();
  isLoading.value = false;
});
</script>