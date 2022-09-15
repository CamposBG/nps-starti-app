<template>
  <div class="max-w-lg mx-auto">
    <p class="text-lg font-bold mb-5">Editar Usuário</p>
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

      <!-- confirmPassword -->
      <NFormItem ref="confirmPasswordRef" first label="Senha" path="confirmPassword"
        :show-require-mark="true">
        <NInput v-model:value="formValue.confirmPassword" placeholder="Digite a sua senha" type="password"
          @keydown.enter.prevent>
          <template #prefix>
            <Lock class="w-3" />
          </template>
        </NInput>
      </NFormItem>

      <!-- password -->
      <NFormItem label="Confirme a senha" path="password" :show-require-mark="true">
        <NInput v-model:value="formValue.password" placeholder="Digite a sua senha" type="password"
          @input="handlePasswordInput" @keydown.enter.prevent>
          <template #prefix>
            <Lock class="w-3" />
          </template>
        </NInput>
      </NFormItem>

      <!-- isAdmin -->
      <NFormItem :span="12" label="Administrador" path="isAdmin">
        <NSwitch v-model:value="formValue.isAdmin" />
      </NFormItem>

      <!-- submit btn -->
      <div class="flex gap-2 justify-end">
        <NButton round  @click="submitForm" type="primary">
          <span v-if="isSubmitting === true" class="animate-ping"> Loading...</span>
          <span v-else>Enviar</span>
        </NButton>        
        <NButton round @click="$router.push('/users')">Voltar</NButton>
      </div>
    </NForm>
  </div>
</template>

<script setup>
import { Envelope, Lock, User } from '@vicons/fa';
import { NForm, NFormItem, NInput, useMessage, NSwitch, NButton } from 'naive-ui'

const emit = defineEmits(['submit']);

const router = useRouter()
const nuxtApp = useNuxtApp()
const route = useRoute()

//AsyncData
const {data:response, pending, error} = useLazyAsyncData(
  `user-${Math.random}`, 
  () => nuxtApp.$repo.user.getOneUser(route.params.guid), 
  {pick:['name','email','is_admin']}
)

// refs | data
const formRef = ref(null);
const confirmPasswordRef = ref(null)
const isSubmitting = ref(false);
const message = useMessage();
const formValue = ref({
  email: null,
  name: null,
  password: null,
  confirmPassword: null,
  isAdmin: "false",
  changePassword:true
});

const rules = ref(null);

rules.value = {
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
    message: "Passwods devem ser identicos",
    trigger: ["blur"]
  },
  {
    validator: validatePasswordSame,
    required: true,
    message: "A senha é obrigatória ",
    trigger: ["blur", "password-input"]
  }
  ],
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
        const response = await nuxtApp.$repo.user.editUser(formValue.value)
        if (response.data?.susses === true) {
          message.success('Usuário adicionado com sucesso')
          router.push('/users')
        } else {
          message.error('Não foi possível adicionar o usuário')
          isSubmitting.value = false
        }
      } else {
        return false
      }
    }
  )
  isSubmitting.value = false
}

watch(response, ()=>{
  if(response.value.data?.name.length > 0){
    formValue.value.email = response.value.data.email;
    formValue.value.name = response.value.data.name;
    formValue.value.isAdmin = response.value.data.is_admin;
  }
})
onBeforeMount(()=>{
  console.log(error)
})

</script>