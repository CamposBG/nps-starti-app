<template>
  <div v-if="projectData.is_configured === 1">
    <NCard size="small" title="Widget x">
      Conteudo da configuração do widget x
    </NCard>
  </div>
  <div v-else>
    <NEmpty description="Widget não configurado">
      <template #extra>
        <NButton size="small" type="default" @click="handleSettingNewWidget">
          Configurar widget
        </NButton>
      </template>
    </NEmpty>
  </div>
</template>

<script setup>
import {NButton, NCard, NEmpty} from 'naive-ui';

const nuxtApp = useNuxtApp();
const props = defineProps({
  title: {type: String, default: '', required: true},
  projectData: {type: Object, default: null, required: true},
});


const setting = ref(null);

const handleSettingNewWidget = () => {
  nuxtApp.$bus.emit('drawer:open', {
    component: 'WidgetForm',
    title: 'Configurar widget',
    onClose: async () => {
    },
  });
};

const handleGetSetting = () => {

  setting.value = {};
};

handleGetSetting();

</script>

<!--<style lang="scss" scoped>-->
<!--.n-card {-->
<!--  width: 600px;-->
<!--}-->
<!--</style>-->