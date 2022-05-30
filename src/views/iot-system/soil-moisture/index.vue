<template>
  <PageWrapper contentBackground contentClass="flex p-8" dense contentFullHeight>
    <div>
      <a-tabs v-model:activeKey="activeKey" class="w-full">
        <a-tab-pane key="ph值" tab="ph值" class="w-full" />
        <a-tab-pane key="盐分(mg/L)" tab="盐分" force-render />
        <a-tab-pane key="温度(℃)" tab="温度" force-render />
        <a-tab-pane key="湿度(%)" tab="湿度" force-render />
      </a-tabs>
      <v-chart :category="activeKey" />
      <v-list />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, TabPane } from 'ant-design-vue';
  import List from './components/list.vue';
  import Chart from './components/chart.vue';
  export default defineComponent({
    components: {
      PageWrapper,
      'a-tabs': Tabs,
      'a-tab-pane': TabPane,
      'v-list': List,
      'v-chart': Chart,
    },
    setup() {
      const activeKey = ref('ph值');
      return {
        activeKey,
      };
    },
  });
</script>
