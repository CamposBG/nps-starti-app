<template>
  <NForm ref="formRef" :model="formValue" :rules="rules" :inline="false">
    <NFormItem label="Frequência de aparição do widget" path="timesToShow">
      <NSelect v-model:value="formValue.timesToShow" placeholder="Escolha uma opção" :options="timesToShowOptions" />
    </NFormItem>
    <NFormItem label="Tempo (em segundos) para mostrar o widget" path="secondsToShow">
      <NInputNumber v-model:value="formValue.secondsToShow" clearable placeholder="Digite o tempo" />
    </NFormItem>
    <NFormItem label="Tempo (em segundos) para esconder automaticamente o widget" path="secondsToHide">
      <NInputNumber v-model:value="formValue.secondsToHide" clearable placeholder="Digite o tempo" />
    </NFormItem>
    <NFormItem label="Posição do widget na tela" path="widgetPosition">
      <NSelect v-model:value="formValue.widgetPosition" placeholder="Escolha uma opção" :options="widgetPositionOptions" />
    </NFormItem>
    <div class="mb-3">
      Habilitar para celular?
      <NSwitch  v-model:value="formValue.enableMobile"/>
    </div>
    <div class="mb-3">
      Habilitar mensagem customizável?
      <NSwitch  v-model:value="formValue.enableCustomMessage"/>
      <div v-if="formValue.enableCustomMessage">
        <NInput
            v-model:value="formValue.message"
            type="textarea"
            placeholder="Basic Textarea"
        />
      </div>
    </div>
    <div class="mb-3">
      Trocar senha?
      <NSwitch  v-model:value="formValue.enableCustomThanksMessage"/>
    </div>
    <NButton color="#1C52FF" block @click="submitForm" :loading="isSubmitting">
      <template #icon>
        <NIcon>
          <SignInAlt />
        </NIcon>
      </template>
      Entrar no sistema
    </NButton>
  </NForm>
</template>

<script setup>
import { Envelope, Lock, SignInAlt } from '@vicons/fa';
import {NForm, NInput, NFormItem, NButton, NIcon, useMessage, useNotification, NSelect, NInputNumber, NSwitch} from 'naive-ui'
import {useStorage} from "vue3-storage";

const storage = useStorage();
const router = useRouter();
const nuxtApp = useNuxtApp();

// refs | data
const formRef = ref(null);
const isSubmitting = ref(false);
const message = useMessage();
const notification = useNotification();
const formValue = ref({
  timesToShow: null,
  secondsToShow: 2,
  secondsToHide: 15,
  widgetPosition: null,
  enableMobile: false,
  enableCustomMessage: false,
  enableCustomThanksMessage: false
});
const rules = ref(null);
const timesToShowOptions = ref([
  {
    label: 'Uma única vez',
    value: 1
  },
  {
    label: 'Uma vez por semana',
    value: 2
  },
  {
    label: 'Uma vez a cada 15 dias',
    value: 3
  },
  {
    label: 'Uma vez por mês',
    value: 4
  }
]);
const widgetPositionOptions = ref([
  {
    label: 'Esquerda',
    value: 'left'
  },
  {
    label: 'Em cima',
    value: 'up'
  },
  {
    label: 'Direita',
    value: 'right'
  },
  {
    label: 'Embaixo',
    value: 'bottom'
  }
]);

rules.value = {
  email: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error("E-mail é obrigatório");
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return new Error("Deve ser um em-mail válido");
      }
      return true;
    },
    trigger: ["blur"]
  },
  password: {
    required: true,
    message: "A senha é obrigatória",
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
          const response = await nuxtApp.$repo.auth.login(formValue.value);

          if (response && response.token && response.user) {
            const { user, token } = response
            const  {id, name, email, user_type, guid} = user
            storage.setStorageSync('user', {
              id,
              name,
              email,
              guid,
              user_type,
              token
            });

            router.push('/')
            notification.success({
              content: "Sucesso",
              meta: "Login no sistema realizado",
              duration: 2000,
              keepAliveOnHover: false
            });
          } else if (response.error) {
            notification.error({
              content: "Erro",
              meta: response.error,
              duration: 2500,
              keepAliveOnHover: true
            });
          }
        }
        // else {
        //   message.error("Erro ao realizar o login");
        // }
      }
  );
  isSubmitting.value = false;
}
</script>

{
"timesToShow": 2,
"secondsToShow": 2,
"secondsToHide": 15,
"enableMobile": true,
"enableCustomMessage": true,
"enableCustomThanksMessage": false
}