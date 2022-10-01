<template>
  <NForm ref="formRef" :inline="false" :model="formValue" :rules="rules">
    <NFormItem label="E-mail" path="email">
      <NInput v-model:value="formValue.email" placeholder="Digite o seu e-mail">
        <template #prefix>
          <Envelope class="w-3"/>
        </template>
      </NInput>
    </NFormItem>
    <NFormItem label="Sua senha" path="password">
      <NInput
          v-model:value="formValue.password"
          placeholder="Digite a sua senha"
          type="password"
      >
        <template #prefix>
          <Lock class="w-3"/>
        </template>
      </NInput>
    </NFormItem>
    <NButton :loading="isSubmitting" block color="#1C52FF" @click="submitForm">
      <template #icon>
        <NIcon>
          <SignInAlt/>
        </NIcon>
      </template>
      Entrar no sistema
    </NButton>
  </NForm>
</template>

<script setup>
import {Envelope, Lock, SignInAlt} from "@vicons/fa";
import {NButton, NForm, NFormItem, NIcon, NInput, useMessage, useNotification,} from "naive-ui";
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
    trigger: ["blur"],
  },
  password: {
    required: true,
    message: "A senha é obrigatória",
    trigger: ["blur"],
  },
};

// methods
const submitForm = () => {
  isSubmitting.value = true;
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const response = await nuxtApp.$repo.auth.login(formValue.value);

      if (response && response.token && response.user) {
        const {user, token} = response;
        const {id, name, email, user_type, guid} = user;
        storage.setStorageSync("user", {
          id,
          name,
          email,
          guid,
          user_type,
          token,
        });

        router.push("/");
        notification.success({
          content: "Sucesso",
          meta: "Login no sistema realizado",
          duration: 2000,
          keepAliveOnHover: false,
        });
      } else if (response.error) {
        notification.error({
          content: "Erro",
          meta: response.error,
          duration: 2500,
          keepAliveOnHover: true,
        });
      }
    }
  });
  isSubmitting.value = false;
};
</script>
