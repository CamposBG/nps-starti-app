<template>
  <NCard :title="title" class="hover:cursor-pointer" hoverable size="small">
    <template #header-extra>
      <NTooltip trigger="hover">
        <template #trigger>
          <NTag size="small" type="info">
            {{ typeName }}
          </NTag>
        </template>
        Tipo da pesquisa
      </NTooltip>
    </template>
    <div class="flex py-3" @click="handleGoToProject(projectData.guid)">
      <div class="border-r pr-2">
        <div class="flex flex-col items-center font-bold">
          Widgets configurados
          <div>
            <n-statistic>
              <NNumberAnimation
                  ref="numberAnimationInstRef"
                  :active="true"
                  :from="0"
                  :to="projectData.widgets_configured"
                  show-separator
              />
            </n-statistic>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-2 pl-2">
        <div v-if="owners.length > 0">
          <span class="font-bold">
            Donos:
          </span>
          <template v-for="owner in owners" class="flex flex-wrap gap-2">
            <NTag :bordered="false">
              {{ owner }}
            </NTag>
          </template>
          <NTag v-if="ownersExcess > 0" :bordered="false">
            e mais {{ ownersExcess }}
          </NTag>
        </div>
        <div v-if="viewers.length > 0">
          <span class="font-bold">
            Visualizadores
          </span>
          <template v-for="viewer in viewers" class="flex flex-wrap gap-2">
            <NTag :bordered="false">
              {{ viewer }}
            </NTag>
          </template>
          <NTag v-if="viewersExcess > 0" :bordered="false">
            e mais {{ viewersExcess }}
          </NTag>
        </div>
      </div>
    </div>
    <template #action>
      <NSpace>
        <NButton color="teal" size="small" type="primary"
                 @click="handleEditProject(projectData.name, projectData.guid)">
          Editar
        </NButton>
        <NPopconfirm :positive-button-props="{color: 'teal'}" :show-icon="false" negative-text="Cancelar"
                     positive-text="Excluir projeto"
                     @positive-click="handleDeleteProject">
          <template #activator>
            <NButton size="small">
              Excluir
            </NButton>
          </template>
          Tem certeza que deseja excluir o projeto {{ projectData.name }}?
        </NPopconfirm>
      </NSpace>
    </template>
  </NCard>
</template>

<script setup>
import {
  NButton,
  NCard,
  NNumberAnimation,
  NPopconfirm,
  NSpace,
  NStatistic,
  NTag,
  NTooltip,
  useDialog,
  useNotification
} from 'naive-ui';

const nuxtApp = useNuxtApp();
const router = useRouter();
const dialog = useDialog();
const notification = useNotification();

const emit = defineEmits(['refresh-projects'])
const props = defineProps({
  title: {type: String, default: '', required: true},
  projectData: {type: Object, default: null, required: true},
});

const owners = ref([]);
const viewers = ref([]);
const viewersExcess = ref(0);
const ownersExcess = ref(0);
const typeName = ref(null);

const handleEditProject = (name, guid) => {
  nuxtApp.$bus.emit('drawer:open', {
    component: 'ProjectsForm',
    title: 'Editar o projeto ' + name,
    onClose: () => {
    },
    props: {guid}
  });
};

const handleDeleteProject = async () => {
  const response = await nuxtApp.$repo.projects.deleteProject(props.projectData.guid);

  if (response) {
    notification.success({
      content: "Sucesso",
      meta: 'Projeto excluído',
      duration: 2000,
      keepAliveOnHover: true
    });
    emit('refresh-projects')
  } else if (response.error) {
    notification.error({
      content: "Erro",
      meta: response.error,
      duration: 2500,
      keepAliveOnHover: true
    });
  }
};

const handleOpenDeleteDialog = () => {
  dialog.warning({
    title: 'Excluir projeto',
    content: `Tem certeza que deseja excluir o projeto ${props.projectData.name}?`,
    negativeText: "Cancelar",
    positiveText: "Excluir projeto",
    onPositiveClick: handleDeleteProject,
    onNegativeClick: () => {
    },
    positiveButtonProps: {
      color: 'teal'
    },
    showIcon: false
  })
};

const mountOwnersAndViewers = () => {
  const viewersArray = props.projectData.viewers_name && props.projectData.viewers_name.length > 0 ? props.projectData.viewers_name.split(',') : [];
  const ownersArray = props.projectData.owners_name && props.projectData.owners_name.length > 0 ? props.projectData.owners_name.split(',') : [];
  viewers.value = viewersArray.slice(0, 2);
  owners.value = ownersArray.slice(0, 2);

  viewersExcess.value = viewersArray.length > 3 ? viewersArray.length - 3 : 0;
  ownersExcess.value = ownersArray.length > 3 ? ownersArray.length - 3 : 0;
};

const getProjectTypes = async () => {
  const types = await nuxtApp.$repo.projects.listProjectsTypes();
  if (types) {
    types.forEach((type) => {
      if (type.id === props.projectData.type) {
        typeName.value = type.name;
      }
    });
  }
};

const handleGoToProject = (guid) => {
  router.push('/projects/' + guid + '/widgets')
};


await getProjectTypes();
mountOwnersAndViewers();
</script>

<style scoped>

</style>