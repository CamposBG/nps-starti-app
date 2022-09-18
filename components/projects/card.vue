<template>
  <NCard  :title="title" size="small" hoverable>

    <LazyWidgetSettingCard :project-data="projectData"/>
    <template #action>
      <NSpace>
        <NButton type="primary"  size="small" color="teal" @click="handleEditProject(projectData.name, projectData.guid)">
          Editar
        </NButton>
        <NButton  size="small"  @click="handleOpenDeleteDialog">
          Excluir
        </NButton>
      </NSpace>
    </template>
  </NCard>
</template>

<script setup>
import {NButton, NCard, NSpace, useDialog, useNotification} from 'naive-ui';

const nuxtApp = useNuxtApp();
const dialog = useDialog();
const notification = useNotification();

const emit = defineEmits(['refresh-projects'])
const props = defineProps({
  title: { type: String, default: '', required: true },
  projectData: { type: Object, default: null, required: true },
});

const handleEditProject = (name, guid) => {
  nuxtApp.$bus.emit('drawer:open', {
    component: 'ConfigProjectsForm',
    title: 'Editar o projeto ' + name,
    onClose: () => {
    },
    props: { guid }
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
    onNegativeClick: () => {},
    positiveButtonProps: {
      color: 'teal'
    },
    showIcon: false
  })
};



</script>

<style scoped>

</style>