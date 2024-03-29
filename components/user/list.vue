<template>
  <div class="mb-1">
    <NInputGroup>
      <NInput
          v-model:value="searchTerm"
          :style="{ width: '15%' }"
          placeholder="Nome ou e-mail"
      />
      <NButton color="teal" type="primary" @click="search"> Pesquisar</NButton>
      <NButton v-if="searchTerm" ghost type="primary" @click="clearSearch"
      >Limpar
      </NButton>
    </NInputGroup>
  </div>
  <div>
    <div v-if="pending" class="m-auto w-fit my-40">
      <NSpin size="large"/>
    </div>
    <div v-if="!pending" class="fade-in-left">
      <NDataTable
          ref="table"
          :columns="columns"
          :data="newUsers"
          :loading="loading"
          :row-key="rowKey"
          remote
      >
        <template #empty>
          Nenhum usuário encontrado
        </template>
      </NDataTable>
    </div>
    <div class="w-fit mx-auto mt-5">
      <n-pagination
          v-model:page="currentPage"
          :page-count="pageMeta.last_page"
      />
    </div>
  </div>
</template>
<script setup>
import {NButton, NDataTable, NInput, NInputGroup, NPagination, NSpin, NTag, useDialog, useMessage,} from "naive-ui";
import {useStorage} from "vue3-storage";

// props
const props = defineProps({
  update: {type: Number},
});

// providers
const message = useMessage();
const dialog = useDialog();
const nuxtApp = useNuxtApp();
const storage = useStorage();

// data|refs
const currentPage = ref(1);
const pageMeta = ref({});
const newUsers = ref({});
const searchTerm = ref(null);
const queryParams = reactive({
  page: currentPage,
  search: searchTerm,
});
const isUserAdmin = ref(null);

isUserAdmin.value = storage.getStorageSync('user').user_type === 1;

// async data
const {
  data: users,
  pending,
  refresh,
} = useLazyAsyncData(`user-${Math.random()}`, () =>
    nuxtApp.$repo.user.listUsers(queryParams)
);
const columns = [
  {
    title: "Nome",
    key: "name",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Tipo de usuário",
    key: "user_type",
    render: (rowData) => {
      if (rowData.user_type == 1) {
        return h(NTag, {type: "success"}, {default: () => "Admin"});
      } else if (rowData.user_type == 2) {
        return h(NTag, {type: "warning"}, {default: () => "Visualizador"});
      } else {
        return h(NTag, {type: "info"}, {default: () => "Proprietário"});
      }
    },
  },
  {
    title: "Opções",
    width: 200,
    align: "center",
    key: "actions",
    render(rowData) {
      const actions = [
        h(
            NButton,
            {
              size: "small",
              // circle: true,
              tertiary: true,
              style: {
                marginRight: "6px",
              },
              onClick: () => editUser(rowData.guid),
            },
            // { default: () => h(NIcon, { component: Edit }) }
            {default: () => "Editar"},
            // {(NIcon) => ({component:'GameController', color:"#0e7a0d"})}
        ),
        h(
            NButton,

            {
              size: "small",
              tertiary: true,

              style: {
                marginRight: "6px",
              },
              onClick: () => deleteUser(rowData),
            },
            {default: () => "Deletar"}
        ),
      ];

      if (isUserAdmin.value) {
        return actions;
      } else {
        return [];
      }
    },
  },
];

//methods
const clearSearch = () => {
  searchTerm.value = null;
  currentPage.value = 1;

  refresh();
};

const search = () => {
  currentPage.value = 1;

  refresh();
};

const editUser = (guid) => {
  nuxtApp.$bus.emit("drawer:open", {
    component: "UserCreateForm",
    title: "Editar usuário",
    onClose: async () => {
      searchTerm.value = null;
      currentPage.value = 1;
      await refresh();
    },
    maskClosable: false,
    props: {guid},
  });
};

const deleteUser = async (user) => {
  dialog.warning({
    title: "Excluir usuário",
    content: `Tem certeza que deseja deletar o usuário ${user.name}?`,
    positiveText: "Excluir",
    negativeText: "Cancelar",
    positiveButtonProps: {
      color: "teal",
    },
    onPositiveClick: async () => {
      const response = await nuxtApp.$repo.user.deleteOneUser(user.guid);
      if (response.success === true) {
        message.success("Usuário removido com sucesso");
        searchTerm.value = null;
        currentPage.value = 1;
        await refresh();
      } else {
        message.error("Problema ao remover usuário");
      }
    },
    onNegativeClick: () => {
    },
    showIcon: false,
  });
};
watch(users, () => {
  if (users) {
    pageMeta.value = users.value.meta;
    newUsers.value = users.value.data;
  }
});

watch(currentPage, () => {
  refresh();
});

watch(
    () => props.update,
    () => {
      refresh();
    }
);
</script>

<style scoped>
.fade-in-left {
  animation: fade-in-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes fade-in-left {
  0% {
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
