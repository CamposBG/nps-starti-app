<template>
  É necessário ter uma conta criada no SendGrid
  Para configurar essa integração, crie uma conta no SendGrid
  <a
      href="https://signup.sendgrid.com/"
      target="_blank"
      class="blue item"
      data-vivaldi-spatnav-clickable="1"
  >clicando aqui.</a
  <NForm ref="formRef" :inline="false" :model="formValue" :rules="rules">
    <NFormItem label="API key do SendGrid" path="api">
      <a
          href="https://sendgrid.com/docs/ui/account-and-settings/api-keys/"
          target="_blank"
          class="blue item"
          data-vivaldi-spatnav-clickable="1"
      >Saiba como criar a API Key no SendGrid</a
      >
      <NInput v-model:value="formValue.apiKey" placeholder="Digite a api key fornecida no site " show-password-toggle
              type="password"/>
    </NFormItem>
    <NFormItem label="Remetente configurado no SendGrid" path="sender">
      <a
          href="https://sendgrid.com/docs/ui/sending-email/sender-verification/"
          target="_blank"
          class="blue item"
          data-vivaldi-spatnav-clickable="1"
      >Saiba como configurar o E-mail e nome do remetente</a
      >
      <NInput v-model:value="formValue.sender" placeholder="Digite o remetente configurado no SendGrid"/>
    </NFormItem>
    <NButton :loading="isSubmitting" color="teal" icon-placement="right" @click="handleSaveEmailConfig">
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
import {NButton, NForm, NFormItem, NIcon, NInput, useNotification} from 'naive-ui';

const notification = useNotification();
const nuxtApp = useNuxtApp();

const isSubmitting = ref(false);

const formValue = ref({
  apiKey: "",
  sender: "",
});

const rules = ref(null);

rules.value = {
  apiKey: {
    required: true,
    message: "A API Key do SendGrid é obrigatória",
    trigger: ["blur"]
  },
  sender: {
    required: true,
    message: "O remetente é obrigatório",
    trigger: ["blur"]
  }
};

const handleSaveEmailConfig = () => {
  isSubmitting.value = true;

  e.preventDefault();

  formRef.value?.validate(
      async (errors) => {
        if (!errors) {
          if (!formValue.value.guid) {
            // const response = await nuxtApp.$repo.projects.createProject(formValue.value);
            // if (response && response.success) {
            //   notification.success({
            //     content: "Sucesso",
            //     meta: "O projeto foi criado",
            //     duration: 2000,
            //     keepAliveOnHover: false
            //   });
            //   nuxtApp.$bus.emit('drawer:close')
            //   isSubmitting.value = false;
            // } else {
            //   notification.error({
            //     content: "Erro",
            //     meta: response.error,
            //     duration: 2500,
            //     keepAliveOnHover: true
            //   });
            //   isSubmitting.value = false;
            // }
          } else {
            // const response = await nuxtApp.$repo.projects.updateProject(formValue.value.guid, formValue.value);
            // if (response && response.success) {
            //   notification.success({
            //     content: "Sucesso",
            //     meta: "O projeto foi atualizado",
            //     duration: 2000,
            //     keepAliveOnHover: false
            //   });
            //   nuxtApp.$bus.emit('drawer:close');
            //   isSubmitting.value = false;
            //
            // } else {
            //   notification.error({
            //     content: "Erro",
            //     meta: response.error,
            //     duration: 2500,
            //     keepAliveOnHover: true
            //   });
            //   isSubmitting.value = false;
            // }
          }
        }
      }
  );
  isSubmitting.value = false;
};

</script>

<style scoped>

</style>