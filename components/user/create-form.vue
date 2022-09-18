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
        <NSwitch v-model:value="isChangingPassword" />
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
        <NFormItem ref="confirmPasswordRef" label="Confirme a senha" path="confirmPassword" :show-require-mark="true">
          <NInput v-model:value="formValue.confirmPassword" placeholder="Digite a sua senha" type="password"
            @keydown.enter.prevent>
            <template #prefix>
              <Lock class="w-3" />
            </template>
          </NInput>
        </NFormItem>
      </div>

      <!-- user type radio -->
      <NRadioGroup v-model:value="formValue.userType" name="userTypeGroup" style="margin-bottom: 12px">
        <NRadioButton :value="1">
          Administrador
        </NRadioButton>
        <NRadioButton :value="2">
          Visualizador
        </NRadioButton>
        <NRadioButton :value="3">
          Proprietário
        </NRadioButton>
      </NRadioGroup>

      <!-- project -->
      <NFormItem v-if="formValue.userType != 1" label="Escolha os projetos" path="projects" :show-require-mark="true">
        <NSelect v-model:value="formValue.projects" placeholder="Escolha os projetos" multiple
          :options="projectsMaped" />
      </NFormItem>

      <!-- submit btn -->
      <div>
        <NButton @click="submitForm" :loading="isSubmitting" color="teal">
          <div v-if="isSubmitting === true" class="animate-ping">
            <NSpin size="small" />
          </div>
          <span v-else>Salvar</span>
        </NButton>
      </div>
    </NForm>
  </div>
</template>

<script setup>
import { Envelope, Lock, User } from '@vicons/fa';
import { NForm, NFormItem, NInput, useMessage, NSwitch, NButton, NRadioButton, NRadioGroup, NSelect, NSpin } from 'naive-ui'

const emit = defineEmits(['submit']);


const nuxtApp = useNuxtApp()
const router = useRouter()

const props = defineProps({
  props: { type: Object, default: null, required: false }
});

const { data: projects } = await nuxtApp.$repo.projects.listProjects()
if(projects){
  const projectsMaped = projects.map((element) => ({ label: element.name, value: element.id, disabled: false }))

}


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
  projects: [],
  userType: null
});
// const projectsMaped = projects.map((element) => ({ label: element.name, value: element.id, disabled: false }))
const rules = ref(null);
rules.value = {
  name: {
    required: true,
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
  projects: {
    required: true,
    message: 'Selecione ao menos 1 projeto',
    validator(rule, value) {
      if (value.length < 1 && formValue.value.userType === 3) {
        return new Error("Selecione ao menos 1 projeto");
      }
    },
    trigger: ["blur"]
  }
};
const isChangingPassword = ref(false);

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
            nuxtApp.$bus.emit('drawer:close');
          } else {
            message.error('Não foi possível adicionar o usuário')
          }
        } else {
          const response = await nuxtApp.$repo.user.editUser(formValue.value.guid, formValue.value)
          if (response?.success === true) {
            message.success('Usuário atualizado com sucesso')
            nuxtApp.$bus.emit('drawer:close');
            router.push('/users')
            isSubmitting.value = false;
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

const getUserData = async () => {
  const data = await nuxtApp.$repo.user.getOneUser(props.props.guid)

  if (data) {
    formValue.value.email = data.email;
    formValue.value.guid = data.guid;
    formValue.value.name = data.name;
    formValue.value.userType = data.user_type;
    formValue.value.projects = [];
  }
}

onMounted(async () => {
  if (props.props?.guid) {
    await getUserData();
  }
});

</script>