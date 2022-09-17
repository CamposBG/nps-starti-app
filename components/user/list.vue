<template>
  <div>
    <div v-if="pending">
      Loading...
    </div>
    <div v-else>
      <n-table :single-line="false">
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { CheckCircle, TimesCircle, Edit, Trash } from '@vicons/fa';
import { NTable, useMessage, useDialog, NPagination } from 'naive-ui'

const props = defineProps({
  update: {type:Number}
})

const message = useMessage()
const dialog = useDialog()
const router = useRouter()
const nuxtApp = useNuxtApp()
const currentPage = ref(1)
const pageMeta = ref({})
const newUsers = ref({})

// const resp = await nuxtApp.$repo.user.listUsers(1)
const { data: users, pending, refresh, error } = useLazyAsyncData(
  `user-${Math.random()}`,
  () => nuxtApp.$repo.user.listUsers(currentPage.value)
)

// data|refs

//methods
const editUser = (guid) => {
  nuxtApp.$bus.emit('drawer:open', {
    component: 'UserCreateForm',
    title: 'Editar usuário',
    onClose: async () => {
      await refresh();
    },
    maskClosable: false,
    props: { guid }
  });
}

const deleteUser = (user) => {
  dialog.warning({
    title: 'Excluir usuário',
    content: `Tem certeza que deseja deletar o usuário ${user.name}?`,
    positiveText: 'Excluir',
    negativeText: 'Cancelar',
    positiveButtonProps: {
      color: 'teal'
    },
    onPositiveClick: () => {
      console.log("deletar")
      /* TODO -> implementar rota de delete */
    },
    onNegativeClick: () => {},
    showIcon: false
  })

}

watch(users, () => {
  if (users) {
    console.log(users.value)
    pageMeta.value = users.value.meta
    newUsers.value = users.value.data
  }
})

watch(currentPage, ()=>{
  refresh()
})

watch(()=> props.update, ()=>{
  refresh()
})
</script>