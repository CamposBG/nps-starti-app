<template>
  <div>
    <LazyConfigEmail v-if="isLoading"/>
    <div v-else class="flex justify-center items-center">
      <NSpin size="large"/>
    </div>
  </div>


</template>

<script setup>
import {NSpin, useMessage, useNotification} from 'naive-ui'
import {useStorage} from "vue3-storage";

const nuxtApp = useNuxtApp();
const storage = useStorage();
const router = useRouter();

const props = defineProps({
  props: {type: Object, default: null},
  guid: {type: String, default: null},
});

// refs | data
const formRef = ref(null);
const isSubmitting = ref(false);
const isLoading = ref(true);
const message = useMessage();
const notification = useNotification();
const formValue = ref({
  name: '',
  type: null,
  viewers: null,
  owners: null,
  guid: null
});
const rules = ref(null);
const projectTypesMapped = ref(null);
const usersMapped = ref(null);

rules.value = {
  name: {
    required: true,
    message: "É obrigatório dar um nome ao projeto",
    trigger: ["blur"]
  },
  type: {
    required: true,
    message: "O tipo de pesquisa do projeto deve ser escolhido",
  },
  viewers: {
    required: false,
  },
  owners: {
    required: false,
  },
};

// methods
const submitForm = (e) => {
  isSubmitting.value = true;

  e.preventDefault();

  formRef.value?.validate(
      async (errors) => {
        if (!errors) {
          if (!formValue.value.guid) {
            const response = await nuxtApp.$repo.projects.createProject(formValue.value);
            if (response && response.success) {
              notification.success({
                content: "Sucesso",
                meta: "O projeto foi criado",
                duration: 2000,
                keepAliveOnHover: false
              });
              nuxtApp.$bus.emit('drawer:close')
              isSubmitting.value = false;
            } else {
              notification.error({
                content: "Erro",
                meta: response.error,
                duration: 2500,
                keepAliveOnHover: true
              });
              isSubmitting.value = false;
            }
          } else {
            const response = await nuxtApp.$repo.projects.updateProject(formValue.value.guid, formValue.value);
            if (response && response.success) {
              notification.success({
                content: "Sucesso",
                meta: "O projeto foi atualizado",
                duration: 2000,
                keepAliveOnHover: false
              });
              nuxtApp.$bus.emit('drawer:close');
              isSubmitting.value = false;

            } else {
              notification.error({
                content: "Erro",
                meta: response.error,
                duration: 2500,
                keepAliveOnHover: true
              });
              isSubmitting.value = false;
            }
          }
        }
      }
  );
  isSubmitting.value = false;
}

const getProjectData = async () => {
  const response = await nuxtApp.$repo.projects.findOneProject(props.props.guid);
  if (response) {
    formValue.value.guid = response.guid;
    formValue.value.name = response.name;
    formValue.value.type = response.type;
    if (response.viewers?.length > 0) {
      formValue.value.viewers = response.viewers;
    }
    if (response.owners?.length > 0) {
      formValue.value.owners = response.owners;
    }
  }
};

const getProjectTypes = async () => {
  const types = await nuxtApp.$repo.projects.listProjectsTypes();
  if (types) {
    projectTypesMapped.value = types.map((type) => ({
      label: type.name,
      value: type.id,
      disabled: false,
    }));
  }
};

const getUsers = async () => {
  const users = await nuxtApp.$repo.user.usersDropDown();
  if (users) {
    usersMapped.value = users.map((user) => ({
      label: user.name,
      value: user.id,
      disabled: false,
    }));
  }
};


onMounted(async () => {
  if (props.props?.guid) {
    await getProjectData();
  }

  await getProjectTypes();
  await getUsers();
  isLoading.value = false;
});
</script>