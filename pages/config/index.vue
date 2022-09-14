<template>
  <div>
    <NCard title="Configurações">
      <NTabs
          class="card-tabs"
          default-value="projects"
          size="large"
          animated
          style="margin: 0 -4px"
          :tab-style="{barColor: '#f352FF'}"
          pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <NTabPane name="projects" tab="Projetos" :tab-props="{ 'color': '#38BDF8' }">
          <LazyConfigProjects />
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>
<script setup>
import { NPageHeader, NCard, NTabPane, NTabs } from 'naive-ui';

const router = useRouter();

// methods
const handleBack = () => {
  router.push('/');
}
</script>