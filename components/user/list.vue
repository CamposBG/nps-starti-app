<template>
  <div>
    <div v-if="pending">
      Loading...
    </div>
    <div v-else>

      <p class="text-lg">Usuários cadastrados</p>
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
                @click="deleteUser(user.guid)" />
            </td>
          </tr>
        </tbody>
      </n-table>
      <div class="w-fit mx-auto mt-5">
        <n-pagination v-model:page="currentPage" :page-count="pageMeta.last_page" />
      </div>
    </div>
    <pre>
    </pre>
  </div>
</template>
<script setup>
import { CheckCircle, TimesCircle, Edit, Trash } from '@vicons/fa';
import { NTable, useMessage, useDialog, NDataTable, NButton, NPagination } from 'naive-ui'

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
// const users = reactive({
//   "meta": {
//     "total": 5,
//     "per_page": 10,
//     "current_page": 1,
//     "last_page": 1,
//     "first_page": 1,
//     "first_page_url": "/?page=1",
//     "last_page_url": "/?page=1",
//     "next_page_url": null,
//     "previous_page_url": null
//   },
//   "data": [
//     {
//       "name": "Admin1",
//       "email": "admin@starti.com.br",
//       "guid": "2a759430-7ff2-4a8f-b02b-f72e348a542e",
//       "is_admin": 1
//     },
//     {
//       "name": "Admin2",
//       "email": "admin@email.com",
//       "guid": "474e1622-aa8f-49aa-9e9a-fc399f2f172c",
//       "is_admin": 1
//     },
//     {
//       "name": "Admin3",
//       "email": "admin@email.com",
//       "guid": "474e1622-aa8f-49aa-9e9a-fc399f2f172d",
//       "is_admin": 1
//     },
//     {
//       "name": "NoAdmin1",
//       "email": "admin@email.com",
//       "guid": "474e1622-aa8f-49aa-9e9a-fc399f2f172e",
//       "is_admin": 0
//     }
//     , {
//       "name": "NoAdmin",
//       "email": "admin@email.com",
//       "guid": "474e1622-aa8f-49aa-9e9a-fc399f2f172f",
//       "is_admin": 0
//     }
//   ]
// })

//methods
const editUser = (guid) => {
  console.log(guid)
  router.push(`/users/edit/${guid}`)
}
const deleteUser = (guid) => {
  dialog.warning({
    title: 'Confirmar',
    content: 'Tem certeza que deseja deletear o usuário',
    positiveText: 'Sim',
    negativeText: 'Não',
    onPositiveClick: () => {
      console.log("deletar")
      /* TODO -> implementar rota de delete */
    },
    onNegativeClick: () => {
      return
    }
  })

}

watch(users, () => {
  if (users) {
    console.log(users.value)
    pageMeta.value = users.value.meta
    newUsers.value = users.value.data
  }
})
// onBeforeMount(()=>{
//   refresh()
// })
watch(currentPage, ()=>{
  console.log("aqui")
  refresh()
})
</script>