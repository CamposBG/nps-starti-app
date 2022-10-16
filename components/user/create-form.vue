<template>
  <div class="w-full">
    <!-- form -->
    <NForm ref="formRef" :model="formValue" :rules="rules">
      <!-- name -->
      <NFormItem :show-require-mark="true" label="Nome do usuário" path="name">
        <NInput
          v-model:value="formValue.name"
          placeholder="Digite o nome do usuário"
        >
          <template #prefix>
            <User class="w-3" />
          </template>
        </NInput>
      </NFormItem>

      <!-- email -->
      <NFormItem :show-require-mark="true" label="E-mail" path="email">
        <NInput
          v-model:value="formValue.email"
          placeholder="Digite o seu e-mail"
        >
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
        <NFormItem :show-require-mark="true" label=" Senha" path="password">
          <NInput
            v-model:value="formValue.password"
            placeholder="Digite a sua senha"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          >
            <template #prefix>
              <Lock class="w-3" />
            </template>
          </NInput>
        </NFormItem>

        <!-- confirmPassword -->
        <NFormItem
          ref="confirmPasswordRef"
          :show-require-mark="true"
          label="Confirme a senha"
          path="confirmPassword"
        >
          <NInput
            v-model:value="formValue.confirmPassword"
            placeholder="Digite a sua senha"
            type="password"
            @keydown.enter.prevent
          >
            <template #prefix>
              <Lock class="w-3" />
            </template>
          </NInput>
        </NFormItem>
      </div>

      <div v-if="isAdmin">
        <!-- user type radio -->
        <NFormItem label="Tipo do usuário" path="userType">
          <NRadioGroup
            v-model:value="formValue.userType"
            name="userTypeGroup"
            style="margin-bottom: 12px"
          >
            <NRadioButton :value="1"> Administrador</NRadioButton>
            <NRadioButton :value="2"> Visualizador</NRadioButton>
            <NRadioButton :value="3"> Proprietário</NRadioButton>
          </NRadioGroup>
        </NFormItem>

        <!-- project -->
        <NFormItem
          v-if="formValue.userType !== 1 && formValue.userType !== null"
          :show-require-mark="true"
          label="Escolha os projetos"
          path="projects"
        >
          <NSelect
            v-model:value="formValue.projects"
            :options="projectsMapped"
            multiple
            placeholder="Escolha os projetos"
          />
        </NFormItem>
      </div>

      <!-- submit btn -->
      <div>
        <NButton
          :loading="isSubmitting"
          color="teal"
          icon-placement="right"
          @click="submitForm"
        >
          Salvar
          <template v-if="!isSubmitting" #icon>
            <NIcon>
              <Save />
            </NIcon>
          </template>
        </NButton>
      </div>
    </NForm>
  </div>
</template>

<script setup>
import { Envelope, Lock, Save, User } from "@vicons/fa";
import {
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NSwitch,
  useMessage,
} from "naive-ui";
import { useStorage } from "vue3-storage";

const emit = defineEmits(["submit"]);

const nuxtApp = useNuxtApp();
const router = useRouter();
const storage = useStorage();
let projectsMapped;

const props = defineProps({
  props: { type: Object, default: null, required: false },
});

const { data: projects } = await nuxtApp.$repo.projects.listProjects();
if (projects) {
  projectsMapped = projects.map((element) => ({
    label: element.name,
    value: element.id,
    disabled: false,
  }));
}

// refs | data
const formRef = ref(null);
const confirmPasswordRef = ref(null);
const isSubmitting = ref(false);
const message = useMessage();
const formValue = ref({
  guid: null,
  email: null,
  name: null,
  password: null,
  confirmPassword: null,
  projects: [],
  userType: null,
});
const isAdmin = ref(false);
isAdmin.value = storage.getStorageSync("user").user_type === 1;
// const projectsMapped = projects.map((element) => ({ label: element.name, value: element.id, disabled: false }))

const rules = ref(null);
rules.value = {
  name: {
    required: true,
    message: "Nome é obrigatório",
  },
  email: {
    required: true,
    message: "Email é obrigatório",
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
  password: [
    {
      required: true,
      // message: "A senha é obrigatória",
      trigger: ["blur"],
      validator(rule, value) {
        if (!value) {
          return new Error("A senha é obrigatória");
        } else if (value.length < 6) {
          return new Error("A senha deve conter pelo menos 6 caracteres");
        }
      },
    },
    {
      validator: validatePasswordSame,
      required: true,
      message: "As senhas devem ser identicas",
      // trigger: ["blur", 'input',"password-input"]
    },
  ],
  projects: {
    required: true,
    message: "Selecione ao menos 1 projeto",
    validator(rule, value) {
      if (value.length < 1 && formValue.value.userType === 3) {
        return new Error("Selecione ao menos 1 projeto");
      }
    },
    trigger: ["blur"],
  },
  userType: {
    required: true,
    message: "O tipo do usuário é obrigatório",
  },
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
  isSubmitting.value = true;
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (!formValue.value.guid) {
        const response = await nuxtApp.$repo.user.storeUser(formValue.value);
        if (response?.success === true) {
          message.success("Usuário adicionado com sucesso");
          nuxtApp.$bus.emit("drawer:close");
        } else {
          message.error("Não foi possível adicionar o usuário");
        }
      } else {
        const response = await nuxtApp.$repo.user.editUser(
          formValue.value.guid,
          formValue.value
        );
        if (response?.success === true) {
          message.success("Usuário atualizado com sucesso");
          nuxtApp.$bus.emit("drawer:close");
          router.push("/users");
          isSubmitting.value = false;
        } else {
          message.error("Não foi possível atualizar o usuário");
        }
      }
    } else {
      return false;
    }
  });
  isSubmitting.value = false;
};

const getUserData = async () => {
  const data = await nuxtApp.$repo.user.getOneUser(props.props.guid);

  if (data) {
    formValue.value.email = data.email;
    formValue.value.guid = data.guid;
    formValue.value.name = data.name;
    formValue.value.userType = data.user_type;
    formValue.value.projects = data.projects.map((element) => element.id);
  }
};

onMounted(async () => {
  if (props.props?.guid) {
    await getUserData();
  }

  if (formValue.value.userType == 1) {
    isAdmin.value = true;
  }
});
</script>
