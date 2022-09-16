<template>
  <div class="w-full">
    <!-- form -->
    <NForm ref="formRef" :model="formValue" :rules="rules">

      <!-- name -->
      <NFormItem label="Nome do usuário" path="name" :show-require-mark="true">
        <NInput v-model:value="formValue.name" placeholder="Digite o nome do usuário">
          <template #prefix>
            <User class="w-3" />
          </template>
        </NInput>
      </NFormItem>

      <!-- email -->
      <NFormItem label="E-mail" path="email" :show-require-mark="true">
        <NInput v-model:value="formValue.email" placeholder="Digite o seu e-mail">
          <template #prefix>
            <Envelope class="w-3" />
          </template>
        </NInput>
      </NFormItem>

      <!-- password -->
      <div v-if="formValue.guid" class="mb-3">
        Trocar senha?   
        <NSwitch  v-model:value="isChangingPassword"/>
      </div>
      <div v-if="isChangingPassword || !formValue.guid">
        <NFormItem label=" Senha" path="password" :show-require-mark="true">
          <NInput v-model:value="formValue.password" placeholder="Digite a sua senha" type="password"
            @input="handlePasswordInput" @keydown.enter.prevent>
            <template #prefix>
              <Lock class="w-3" />
            </template>
          </NInput>
        </NFormItem>
  
        <!-- confirmPassword -->
        <NFormItem ref="confirmPasswordRef"  label="Confirme a senha" path="confirmPassword" :show-require-mark="true">
          <NInput v-model:value="formValue.confirmPassword" placeholder="Digite a sua senha" type="password"
            @keydown.enter.prevent>
            <template #prefix>
              <Lock class="w-3" />
            </template>
          </NInput>
        </NFormItem>
      </div>

      <!-- user type radio -->
      <n-radio-group v-model:value="formValue.userType" name="left-size" style="margin-bottom: 12px">
        <n-radio-button value="1">
          Admin
        </n-radio-button>
        <n-radio-button value="2">
          Viewer
        </n-radio-button>
        <n-radio-button value="3">
          Owner
        </n-radio-button>
      </n-radio-group>

      <NFormItem v-if="formValue.userType == 3" label="Escolha os projetos" path="project" :show-require-mark="true">
        <n-select v-model:value="formValue.project" multiple :options="options" />
      </NFormItem>

      <!-- submit btn -->
      <div class="flex gap-2 justify-end">
        <NButton  @click="submitForm" color="teal">
          <span v-if="isSubmitting === true" class="animate-ping"> Loading...</span>
          <span v-else>Enviar</span>
        </NButton>
        <NButton  @click="$router.push('/users')">Voltar</NButton>
      </div>
    </NForm>
  </div>
</template>

<script setup>
import { Envelope, Lock, User } from '@vicons/fa';
import { NForm, NFormItem, NInput, useMessage, NSwitch, NButton, NRadioButton, NRadioGroup, NSelect } from 'naive-ui'

const emit = defineEmits(['submit']);


const nuxtApp = useNuxtApp()
const router = useRouter()

const props = defineProps({
  userData: { type: Object, default: null, required: false }
});

// refs | data
const formRef = ref(null);
const confirmPasswordRef = ref(null)
const isSubmitting = ref(false);
const message = useMessage();
const formValue = ref({
  guid: null,
  email: null,
  name: null,
  password: null,
  confirmPassword: null,
  project: [],
  userType: "1"
});
const options = [
  {
    label: "Starti Security",
    value: "stsec",
    disabled: false
  },
  {
    label: "StartiOne",
    value: "stOne",
    disabled: false
  }
]

const rules = ref(null);
const isChangingPassword = ref(false);

rules.value = {
  name:{
    required:true,
    message: 'Nome é obrigatório',
  },
  email: {
    required: true,
    message: 'Email é obrigatório',
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
  password: [{
    required: true,
    message: "A senha é obrigatória",
    trigger: ['input', 'blur']
  },
  {
    validator: validatePasswordSame,
    required: true,
    message: "Passwods devem ser identicos",
    // trigger: ["blur", 'input',"password-input"]
  }
  ],
  project: {
    required: true,
    message: 'Selecione ao menos 1 projeto',
    validator(rule, value){
      if(value.length < 1 && formValue.value.userType === 3){
        return new Error("Selecione ao menos 1 projeto");
      }
    },
    trigger: ["blur"]
  }
};

// methods
function validatePasswordSame(rule, value) {
  return value === formValue.value.confirmPassword;
}

function handlePasswordInput() {
  if (formRef.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
}

const submitForm = async (e) => {
  e.preventDefault();
  isSubmitting.value = true
  formRef.value?.validate(
    async (errors) => {
      if (!errors) {
        if (!formValue.value.guid) {
          const response = await nuxtApp.$repo.user.storeUser(formValue.value)
          if (response?.success === true) {
            message.success('Usuário adicionado com sucesso')
            router.push('/users')
          } else {
            message.error('Não foi possível adicionar o usuário')
          }
        } else {
          const response = await nuxtApp.$repo.user.editUser(formValue.value.guid, formValue.value)
          if (response?.success === true) {
            message.success('Usuário atualizado com sucesso')
            router.push('/users')
          } else {
            message.error('Não foi possível atualizar o usuário')
          }
        }
      } else {
        return false
      }
    }
  )
  isSubmitting.value = false
}

onMounted(() => {
  if (props.userData) {
    formValue.value.email = props.userData.email,
    formValue.value.guid = props.userData.guid,
    formValue.value.name = props.userData.name,
    formValue.value.project = [],
    formValue.value.userType = props.userData.userType
  }
});

</script>