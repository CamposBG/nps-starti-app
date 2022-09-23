<template>
  <div class="mt-2">
    <NAlert closable title="Conta no SendGrid" type="info">
      É necessário ter uma conta criada no SendGrid para configurar essa integração, crie uma conta no SendGrid
      <a
          class="text-blue-400"
          data-vivaldi-spatnav-clickable="1"
          href="https://signup.sendgrid.com/"
          target="_blank"
      >clicando aqui.</a>
    </NAlert>
    <NForm ref="formRef" :inline="false" :model="formValue" :rules="rules" class="mt-2">
      <NFormItem label="API key do SendGrid" path="api">
        <div>
          <NInput v-model:value="formValue.apiKey" placeholder="Digite a api key fornecida no site "
                  showPasswordOn="click"
                  type="password"/>
          <span class="text-xs">
        Saiba como criar a API Key no SendGrid
        <a
            class="text-blue-400"
            href="https://sendgrid.com/docs/ui/account-and-settings/api-keys/"
            target="_blank"
        >clicando aqui</a>
      </span>
        </div>
      </NFormItem>
      <NFormItem label="E-mail de remetente configurado no SendGrid" path="fromEmail">
        <div>
          <NInput v-model:value="formValue.fromEmail" placeholder="Digite o remetente configurado no SendGrid"/>
          <span class="text-xs">
          Saiba como configurar o e-mail e nome do remetente
          <a
              class="text-blue-400"
              href="https://sendgrid.com/docs/ui/sending-email/sender-verification/"
              target="_blank"
          >clicando aqui</a>
        </span>
        </div>
      </NFormItem>
      <NFormItem label="Nome do remetente" path="fromName">
        <div class="w-96">
          <NInput v-model:value="formValue.fromName" block placeholder="Digite o remetente configurado no SendGrid"/>
        </div>
      </NFormItem>
      <NButton :loading="isSubmitting" color="teal" icon-placement="right" @click="handleSaveEmailConfig">
        <template #icon>
          <NIcon>
            <Save/>
          </NIcon>
        </template>
        Salvar
      </NButton>
    </NForm>
  </div>
</template>

<script setup>
import {NAlert, NButton, NForm, NFormItem, NIcon, NInput} from 'naive-ui';
import {Save} from '@vicons/fa';

// const notification = useNotification();
const nuxtApp = useNuxtApp();

const isSubmitting = ref(false);

const formValue = ref({
  apiKey: "",
  fromEmail: "",
  fromName: "",
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