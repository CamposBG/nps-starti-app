<template>
  <div class="hover:cursor-default">
    <NCard :title="widgetData.description" class="hover:cursor-pointer" hoverable
           @click="handleEditWidget(widgetData.guid)">
      <template #header-extra>
        <NSpace align="center">
          <NTooltip placement="top" trigger="hover">
            <template #trigger>
              <div :style="{backgroundColor: `${widgetData.color}`}" class="w-5 border-2 h-5 rounded-full"/>
            </template>
            <span>Cor configurada: {{ widgetData.color }}</span>
          </NTooltip>
          <NTooltip placement="top" trigger="hover">
            <template #trigger>
              <NSwitch :loading="loading" :value="widgetData.is_active" size="small"
                       @update:value="handleIsWidgetActive"/>
            </template>
            <span>{{ widgetData.is_active ? 'Ativado' : 'Desativado' }}</span>
          </NTooltip>
        </NSpace>
      </template>
      <div class="flex py-3">
        <NGrid :cols="2">
          <NGi>
            <div class="flex flex-col items-center font-bold">
              Probabilidade
              <NStatistic>
                <NNumberAnimation
                    ref="numberAnimationInstRef"
                    :active="true"
                    :from="0"
                    :to="widgetData.probability_to_show"
                    show-separator
                />
                %
              </NStatistic>
            </div>
          </NGi>
          <NGi>
            <div class="flex items-center flex-col gap-y-2 pl-2">
                <span class="font-bold">
                  Frequência
                </span>
              <span class="text-xs">
                  {{ timesToShow.label }}
                </span>
            </div>
          </NGi>
        </NGrid>
      </div>
    </NCard>
  </div>
</template>

<script setup>
import {NCard, NGi, NGrid, NNumberAnimation, NSpace, NStatistic, NSwitch, NTooltip, useNotification} from 'naive-ui';

const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
const notification = useNotification();


const props = defineProps({
  description: {type: String, default: '', required: true},
  widgetData: {type: Object, default: null, required: true},
});


const loading = ref(false);
const timesToShow = ref(null);
const timesToShowMap = ref([
  {
    label: 'Uma única vez',
    value: 1
  },
  {
    label: 'Uma vez por semana',
    value: 7
  },
  {
    label: 'Uma vez a cada 15 dias',
    value: 15
  },
  {
    label: 'Uma vez por mês',
    value: 30
  }
]);

const handleIsWidgetActive = async (value) => {
  loading.value = true;
  const response = await nuxtApp.$repo.widgets.updateWidgetStatus(props.widgetData.guid, {isActive: value});
  if (response && !response.error) {
    props.widgetData.is_active = value;
  } else if (response && response.error) {
    notification.error({
      content: "Erro",
      meta: response.error,
      duration: 2500,
      keepAliveOnHover: true
    });
  }
  loading.value = false;
};

const handleEditWidget = (guid) => {
  router.push(`/projects/${route.params.guid}/widgets/${guid}/edit`)
};

props.widgetData.is_active = props.widgetData.is_active === 1;
timesToShow.value = timesToShowMap.value.find((widget) => (widget.value === props.widgetData.times_to_show));
</script>