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
      <NFormItem label="Sua senha" path="password" :show-require-mark="true">
        <NInput v-model:value="formValue.password" placeholder="Digite a sua senha" type="password"
          @input="handlePasswordInput" @keydown.enter.prevent>
          <template #prefix>
            <Lock class="w-3" />
          </template>
        </NInput>
      </NFormItem>

      <!-- confirmPassword -->
      <NFormItem ref="confirmPasswordRef" first label="Confirme sua senha" path="confirmPassword"
        :show-require-mark="true">
        <NInput v-model:value="formValue.confirmPassword" placeholder="Digite a sua senha" type="password"
          @keydown.enter.prevent>
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
      <NButton round @click="submitForm">
        Enviar
      </NButton>
    </NForm>
  </div>
</template>

<script setup>
import { Envelope, Lock, User } from '@vicons/fa';
import { NForm, NFormItem, NInput, useMessage, NSwitch, NButton } from 'naive-ui'

const emit = defineEmits(['submit']);

// refs | data
const formRef = ref(null);
const confirmPasswordRef = ref(null)
const isSubmitting = ref(false);
const message = useMessage();

const formValue = ref({
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  isAdmin: "false"
});

const rules = ref(null);

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
  password: [{
    required: true,
    message: "A senha é obrigatória",
    trigger: ["blur"]
  },
  {
    validator: validatePasswordSame,
    message: "Passwods devem ser identicos",
    trigger: ["blur", "password-input"]
  }
  ],
};

// methods
function validatePasswordSame(rule, value) {
  return value === formValue.value.confirmPassword;
}

function handlePasswordInput() {
  if (modelRef.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
}


const submitForm = (e) => {
  e.preventDefault();
  formRef.value?.validate(
    (errors) => {
      if (!errors) {

        isSubmitting.value = true;
        console.log("PASSOu validação");
        // TODO vazer requisição e validação
        message.success("Usuário salvo com sucesso");
      } else {
        console.log("falhou validação");
        return false
      }
      console.log(errors)
    }
  )
}

</script>