<template>
  <div v-if="isLoading" class="flex justify-center items-center my-48">
    <NSpin size="large"/>
  </div>
  <NForm v-else ref="formRef" :inline="false" :model="formValue" :rules="rules">
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
        <LazyWidgetStyleCustomizeConfigCard :formValue="formValue"/>
      </NGi>
      <NGi v-if="formValue.widget_guid != null">
        <LazyWidgetCode v-if="formValue.widget_guid != null" :formValue="formValue"/>
      </NGi>
      <NGi v-if="formValue.showVoteButton">
        <LazyWidgetStyleCustomizeVoteButtonCard :formValue="formValue"/>
      </NGi>
      <NGi :span="2">
        <NSpace>
          <NButton :loading="isSubmitting" color="teal" icon-placement="left" type="primary"
                   @click="handleSubmitConfig(true)">
            Salvar e ativar configuração
            <template #icon>
              <NIcon>
                <Save/>
              </NIcon>
            </template>
          </NButton>
          <NButton :loading="isSubmitting" icon-placement="right"
                   @click="handleSubmitConfig(false)">
            Salvar configuração como inativa
          </NButton>
        </NSpace>
      </NGi>
    </NGrid>
  </NForm>
</template>

<script setup>
import {Save} from '@vicons/fa';

import {NButton, NForm, NGi, NGrid, NIcon, NSpace, NSpin, useNotification} from 'naive-ui';

const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
const notification = useNotification();

const props = defineProps({
  guid: {type: String, default: '', required: false}
});

const rules = ref(null);
const formRef = ref(null);
const isLoading = ref(false);
const isSubmitting = ref(false);
const formValue = ref({
  description: null,
  timesToShow: null,
  secondsToShow: 2,
  secondsToHide: 15,
  enableMobile: false,
  // widgetPosition: 'box1-left-bottom',
  widgetPosition: '0-15-15-0',
  probabilityToShow: 10,
  enableCustomMessage: false,
  message: null,
  enableCustomThanksMessage: false,
  thanksMessage: null,
  domains: [],
  color: '#FFFFFF',
  showVoteButton: false,
  widget_guid: null,
  forceJustification: false,
  bgColor: '#FFFFFF',
  showBackdrop: false,
  voteButtonPosition: '0-15-1-0',
  voteButtonText: 'Avaliar',
  voteButtonColor: '#FFFFFF',
  fontSize: 12,
  borderSize: 0,
  borderColor: '#FFFFFF',
  fontFamily: null,
  fontColor: '#000000',
  voteButtonFontColor: '#000000'
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
  fontColor: {
    required: true,
    message: "A cor do texto é obrigatória",
    trigger: ["blur"]
  },
  fontFamily: {
    required: true,
    message: "A fonte do texto é obrigatória",
    trigger: ["blur"]
  },
  bgColor: {
    required: true,
    message: "A cor de fundo é obrigatória",
    trigger: ["blur"]
  },
  voteButtonText: {
    required: true,
    message: "O texto do botão de avaliar é obrigatório",
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
  voteButtonPosition: {
    required: true,
    trigger: ["blur"],
    validator(rule, value) {
      if (value === null || value === undefined) {
        return new Error("É necessário escolher uma posição onde o botão de avaliar irá aparecer")
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

const handleSubmitConfig = async (isActive) => {
  isSubmitting.value = true;
  formRef.value?.validate(
      async (errors) => {
        if (!errors) {
          formValue.value.isActive = isActive

          if (!props.guid) {
            const response = await nuxtApp.$repo.widgets.createWidget(route.params.guid, formValue.value);

            if (response && !response.error) {
              router.push(`/projects/${route.params.guid}/widgets`)
              notification.success({
                content: "Sucesso",
                meta: "Configuração de widget criada",
                duration: 2000,
                keepAliveOnHover: false
              });
            } else {
              notification.error({
                content: "Erro",
                meta: response?.error,
                duration: 2500,
                keepAliveOnHover: true
              });
            }
          } else {
            const response = await nuxtApp.$repo.widgets.updateWidget(props.guid, formValue.value);

            if (response && !response.error) {
              router.push(`/projects/${route.params.guid}/widgets`)
              notification.success({
                content: "Sucesso",
                meta: "Configuração de widget atualizada",
                duration: 2000,
                keepAliveOnHover: false
              });
            } else {
              notification.error({
                content: "Erro",
                meta: response?.error,
                duration: 2500,
                keepAliveOnHover: true
              });
            }
          }
        }
      }
  );
  isSubmitting.value = false;
};

onBeforeMount(async () => {
  if (props.guid) {
    isLoading.value = true;
    const response = await nuxtApp.$repo.widgets.getOneWidget(props.guid);

    if (response && !response.error) {
      formValue.value.description = response.description;
      formValue.value.timesToShow = response.times_to_show;
      formValue.value.secondsToShow = response.seconds_to_show;
      formValue.value.secondsToHide = response.seconds_to_hide;
      formValue.value.enableMobile = response.enable_mobile;
      formValue.value.widgetPosition = response.widget_position;
      formValue.value.probabilityToShow = response.probability_to_show;
      formValue.value.enableCustomMessage = response.enable_custom_message === 1;
      formValue.value.message = response.message;
      formValue.value.enableCustomThanksMessage = response.enable_custom_thanks_message === 1;
      formValue.value.thanksMessage = response.thanks_message;
      formValue.value.domains = response.domains.length > 0 ? response.domains.split(',') : [];
      formValue.value.color = response.color;
      formValue.value.isActive = response.is_active;
      formValue.value.showVoteButton = response.show_vote_button === 1;
      formValue.value.widget_guid = response.widget_guid;
      formValue.value.forceJustification = response.force_justification;
      formValue.value.bgColor = response.bg_color;
      formValue.value.showBackdrop = response.show_backdrop;
      formValue.value.voteButtonPosition = response.vote_button_position;
      formValue.value.voteButtonText = response.vote_button_text;
      formValue.value.voteButtonColor = response.vote_button_color;
      formValue.value.fontSize = response.font_size;
      formValue.value.borderSize = response.border_size;
      formValue.value.borderColor = response.border_color;
      formValue.value.fontFamily = response.font_family;
      formValue.value.fontColor = response.font_color;
      formValue.value.voteButtonFontColor = response.vote_button_font_color;
    } else {
      router.push(`/projects`)
    }

    isLoading.value = false;
  }
});

</script>