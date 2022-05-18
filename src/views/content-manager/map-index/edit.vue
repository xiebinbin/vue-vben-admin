<template>
  <PageWrapper :title="pageTitle" contentFullHeight>
    <CollapseContainer title="">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="锁江">
          <sj-form />
        </a-tab-pane>
        <a-tab-pane key="2" tab="豆叩">
          <dk-form />
        </a-tab-pane>
      </a-tabs>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, TabPane } from 'ant-design-vue';
  import SJForm from './sj-form.vue';
  import DKForm from './dk-form.vue';

  const pageTitle = ref<string>('地理位置首页信息');
  const activeKey = ref('1');

  export default defineComponent({
    components: {
      CollapseContainer,
      PageWrapper,
      'a-tabs': Tabs,
      'a-tab-pane': TabPane,
      'sj-form': SJForm,
      'dk-form': DKForm,
    },
    setup() {
      return {
        activeKey,
        pageTitle,
      };
    },
  });
</script>
