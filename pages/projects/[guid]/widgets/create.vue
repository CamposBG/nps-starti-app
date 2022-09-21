<template>
  <div class="w-full">
    <NPageHeader class="mb-4" subtitle="" @back="handleBack">
      <template #title>
        Configurando novo widget
      </template>
    </NPageHeader>
    <NForm ref="formRef" :inline="false" :model="formValue" :rules="rules">
      <NGrid :cols="2" x-gap="12" y-gap="12">
        <NGi>
          <LazyWidgetTimeConfigCard :formValue="formValue"
                                    @updateForm="value => formValue.value = {...formValue.value, ...value}"/>
        </NGi>
        <NGi>
          <LazyWidgetPositionConfigCard :formValue="formValue"/>
        </NGi>
        <NGi>
          <LazyWidgetMessagesConfigCard :formValue="formValue"/>
        </NGi>
        <NGi>
          <LazyWidgetDomainConfigCard :formValue="formValue"/>
        </NGi>
        <NGi>
          <LazyWidgetColorConfigCard :formValue="formValue"/>
        </NGi>
        <NGi :span="2">
          <NButton :loading="isSubmitting" color="teal" icon-placement="right" type="primary"
                   @click="handleSubmitConfig">
            Salvar configuração
            <template #icon>
              <NIcon>
                <Save/>
              </NIcon>
            </template>
          </NButton>
        </NGi>
      </NGrid>
    </NForm>
  </div>
</template>

<script setup>
import {Save} from '@vicons/fa';

import {NButton, NForm, NGi, NGrid, NIcon, NPageHeader, useNotification} from 'naive-ui';

const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
const notification = useNotification();

const rules = ref(null);
const formRef = ref(null);
const isSubmitting = ref(false);
const formValue = ref({
  description: null,
  timesToShow: null,
  secondsToShow: 2,
  secondsToHide: 15,
  enableMobile: false,
  // widgetPosition: 'box1-left-bottom',
  widgetPosition: null,
  probabilityToShow: 10,
  enableCustomMessage: false,
  message: null,
  enableCustomThanksMessage: false,
  thanksMessage: null,
  domains: [],
  color: '#FFFFFF',

});

rules.value = {
  description: {
    required: true,
    message: "A descrição é obrigatória",
    trigger: ["blur"]
  },
  message: {
    required: true,
    message: "A mensagem personalizada é obrigatória",
    trigger: ["blur"]
  },
  thanksMessage: {
    required: true,
    message: "A mensagem de agradecimento personalizada é obrigatória",
    trigger: ["blur"]
  },
  color: {
    required: true,
    message: "A cor é obrigatória",
    trigger: ["blur"]
  },
  timesToShow: {
    required: true,
    trigger: ["blur"],
    validator(rule, value) {
      if (value === null || value === undefined) {
        return new Error("É necessário escolher uma frequência")
      }
    }
  },
  secondsToShow: {
    required: true,
    trigger: ["blur", "input"],
    validator(rule, value) {
      if (value === null || value === undefined) {
        return new Error("É necessário escolher o tempo para o widget ser exibido")
      } else if (value < 1) {
        return new Error("O tempo deve ser maior que 0")
      } else if (!/^\d*$/.test(value)) {
        return new Error("O tempo deve ser um número")
      }
    }
  },
  secondsToHide: {
    required: true,
    trigger: ["blur", "input"],
    validator(rule, value) {
      if (value === null || value === undefined) {
        return new Error("É necessário escolher o tempo para esconder o widget")
      } else if (value < 1) {
        return new Error("O tempo deve ser maior que 0")
      } else if (!/^\d*$/.test(value)) {
        return new Error("O tempo deve ser um número")
      }
    }
  },
  widgetPosition: {
    required: true,
    trigger: ["blur"],
    validator(rule, value) {
      if (value === null || value === undefined) {
        return new Error("É necessário escolher uma posição onde o widget irá aparecer")
      }
    }
  },
  probabilityToShow: {
    required: true,
    trigger: ["blur", "input"],
    validator(rule, value) {
      if (value === null || value === undefined) {
        return new Error("É necessário escolher o tempo para o widget ser exibido")
      }
    }
  }
};

// methods
const handleBack = () => {
  router.push(`/projects/${route.params.guid}/widgets`);
};

const handleSubmitConfig = async () => {
  isSubmitting.value = true;
  formRef.value?.validate(
      async (errors) => {
        if (!errors) {
          const response = await nuxtApp.$repo.widgets.createWidget(route.params.guid, formValue.value);

          if (response) {
            router.push(`/projects/${route.params.guid}`)
            notification.success({
              content: "Sucesso",
              meta: "Configuração de widget criada",
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
      }
  );
  isSubmitting.value = false;
};


</script>