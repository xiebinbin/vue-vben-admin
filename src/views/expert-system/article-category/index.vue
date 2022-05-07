<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <BasicTable :loading="loading" :dataSource="items" @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '編輯',
              icon: 'ic:outline-edit',
              onClick: () => handleEdit(record),
            },
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              color: 'error',
              popConfirm: {
                title: '是否刪除？',
                confirm: () => handleDelete(record),
              },
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">添加分类</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import gql from '/@/graphql/index';
  let items = ref([]);
  let loading = ref(false);
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const instance = getCurrentInstance();
      const { createMessage } = useMessage();
      const loadData = async () => {
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.articleCategoriesGQL,
        });
        items.value = data?.data.expert_system_article_categories;
      };
      onMounted(async () => {
        loadData();
      });
      const [registerTable] = useTable({
        title: '知识分类列表',
        columns: getBasicColumns(),
        pagination: false,
        showIndexColumn: false,
        bordered: true,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const handleDelete = (record: Recordable) => {
        console.log(record);
        loading.value = true;
        instance?.proxy?.$apollo
          ?.mutate({
            mutation: gql.removeArticleCategoryGQL,
            variables: {
              id: record.id,
            },
          })
          .then(() => {
            loading.value = false;
            createMessage.success('刪除成功!');
            loadData();
          })
          .catch(() => {
            loading.value = true;
          });
      };
      const handleEdit = (record: Recordable) => {
        instance?.proxy?.$router.push({
          path: '/expert-system/article-category/edit',
          query: { id: record.id },
        });
      };
      const handleAdd = () => {
        instance?.proxy?.$router.push({
          path: '/expert-system/article-category/edit',
        });
      };
      return {
        registerTable,
        handleDelete,
        handleEdit,
        handleAdd,
        loading,
        items,
      };
    },
  });
</script>
