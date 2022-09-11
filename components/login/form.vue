<template>
  <NForm ref="formRef" :model="formValue" :rules="rules" :inline="false">
    <NFormItem label="E-mail" path="email">
      <NInput v-model:value="formValue.email" placeholder="Digite o seu e-mail">
        <template #prefix>
          <Envelope class="w-3"/>
        </template>
      </NInput>
    </NFormItem>
    <NFormItem label="Sua senha" path="password">
      <NInput  v-model:value="formValue.password" placeholder="Digite a sua senha" type="password">
        <template #prefix>
          <Lock class="w-3"/>
        </template>
      </NInput>
    </NFormItem>
    <NButton color="#1C52FF" type="success" block @click="submitForm" :loading="isSubmitting">
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
import { NForm, NFormItem, NInput, NButton, NIcon, useMessage } from 'naive-ui'
import {useStorage} from "vue3-storage";


const emit = defineEmits(['submit']);

const storage = useStorage();
const router = useRouter();

// refs | data
const formRef = ref(null);
const isSubmitting = ref(false);
const message = useMessage();
const formValue = ref({
  email: "",
  password: "",
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
  password: {
    required: true,
    message: "A senha é obrigatória",
    trigger: ["blur"]
  }
};

// methods
const submitForm = (e) => {
  e.preventDefault();
  formRef.value?.validate(
      (errors) => {
        if (!errors) {
          isSubmitting.value = true;

          setTimeout(async () => {
            await storage.setStorage({
              key: 'user',
              data: {
                token: 'djiqwjdj892j189d28dj128d2',
                email: formValue.value.email
              },
            });
            isSubmitting.value = false;
            router.push('/')
            message.success("Login efetuado com sucesso");
          }, 3000)
        } else {
          message.error("Erro ao realizar o login");
        }
      }
  );
}
</script>