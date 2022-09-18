<template>
  <div>
    <div v-if="pending" class="m-auto w-fit mt-60">
      <NSpin size="large" />
    </div>
    <div v-else>
      <!-- <n-table :single-line="false">
        <thead>
          <tr>
            <th>Nome</th>
            <th>e-mail</th>
            <th>Admin</th>
            <th>opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users.data">
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td><span v-if="user.is_admin">
                <CheckCircle class="w-5 h-5 text-green-600" />
              </span> <span v-else>
                <TimesCircle class="w-5 h-5 text-red-600" />
              </span>
            </td>
            <td class=" flex gap-3">
              <Edit class="w-5 h-5 hover:text-purple-800 hover:cursor-pointer"
                @click="editUser(user.guid)" />
              <Trash class="w-5 h-5 hover:text-rose-800 hover:cursor-pointer"
                @click="deleteUser(user)" />
            </td>
          </tr>
        </tbody>
      </n-table>
      <div class="w-fit mx-auto mt-5">
        <n-pagination v-model:page="currentPage" :page-count="pageMeta.last_page" />
      </div> -->
      <NDataTable
        remote
        ref="table"
        :columns="columns"
        :data="newUsers"
        :loading="loading"
        :row-key="rowKey"
      />
    </div>
    <div class="w-fit mx-auto mt-5">
      <n-pagination
        v-model:page="currentPage"
        :page-count="pageMeta.last_page"
      />
    </div>
    {{filterValues}}
  </div>
</template>
<script setup>
import { CheckCircle, TimesCircle, Edit, Trash } from "@vicons/fa";
import {
  NTable,
  useMessage,
  useDialog,
  NPagination,
  NSpin,
  NDataTable,
  NButton,
  NTag,
  NIcon,
} from "naive-ui";

const props = defineProps({
  update: { type: Number },
});

const dialog = useDialog();
const nuxtApp = useNuxtApp();
const currentPage = ref(1);
const pageMeta = ref({});
const newUsers = ref({});
// const resp = await nuxtApp.$repo.user.listUsers(1)
const queryParams = reactive({
  page: currentPage,
  // 'search':'bob'
});
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
    filter: true,
    filterOptionValues: [],
    filterOptions: [
      {
        label: "Admin",
        value: 1,
      },
      {
        label: "Visualizador",
        value: 2,
      },
      {
        label: "Proprietário",
        value: 3,
      },
    ],
    render: (rowData) => {
      if (rowData.user_type == 1) {
        return h(NTag, { type: "success" }, { default: () => "Admin" });
      } else if (rowData.user_type == 2) {
        return h(NTag, { type: "warning" }, { default: () => "Visualizador" });
      } else {
        return h(NTag, { type: "info" }, { default: () => "Proprietário" });
      }
    },
  },
  {
    title: "Action",
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
          {default: () => 'Editar'}
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
          { default: () => "Deletar" }
        ),
      ];
      return actions;
    },
  },
];

// data|refs

//methods

const editUser = (guid) => {
  nuxtApp.$bus.emit("drawer:open", {
    component: "UserCreateForm",
    title: "Editar usuário",
    onClose: async () => {
      await refresh();
    },
    maskClosable: false,
    props: { guid },
  });
};

const deleteUser = (user) => {
  dialog.warning({
    title: "Excluir usuário",
    content: `Tem certeza que deseja deletar o usuário ${user.name}?`,
    positiveText: "Excluir",
    negativeText: "Cancelar",
    positiveButtonProps: {
      color: "teal",
    },
    onPositiveClick: () => {
      console.log("deletar");
      /* TODO -> implementar rota de delete */
    },
    onNegativeClick: () => {},
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
