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
              label: record?.online_status == 0 ? '上线' : '下线',
              icon:
                record?.online_status == 0
                  ? 'ant-design:cloud-upload-outlined'
                  : 'ant-design:cloud-download-outlined',
              color: record?.online_status == 0 ? 'success' : 'error',
              popConfirm: {
                title: '是否' + (record?.online_status == 0 ? '上线' : '下线') + '？',
                confirm: () => {
                  if (record?.online_status == 0) {
                    handleUp(record);
                  } else {
                    handleDown(record);
                  }
                },
              },
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
      <template #form-custom> xxx </template>
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">添加知识</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction, FormSchema } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import gql from '/@/graphql/index';
  let items = ref([]);
  let loading = ref(false);
  interface queryParams {
    q: string;
    limit: number;
    expert_system_staff_id: number | null;
    expert_system_article_category_id: number | null;
    page: number;
    online_status: string;
  }
  const query = ref<queryParams>({
    q: '',
    limit: 10,
    expert_system_staff_id: null,
    expert_system_article_category_id: null,
    page: 1,
    online_status: '',
  });
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const instance = getCurrentInstance();
      const { createMessage } = useMessage();
      const [registerTable, { setPagination, setShowPagination, reload, setProps }] = useTable({
        title: '专家列表',
        columns: getBasicColumns(),
        showIndexColumn: false,
        bordered: true,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        onChange: (pagination) => {
          query.value = {
            ...query.value,
            limit: pagination.pageSize,
          };
          instance?.proxy?.$nextTick(() => {
            loadData(pagination.current);
          });
        },
      });
      const loadData = async (page: number) => {
        loading.value = true;

        instance?.proxy?.$nextTick(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.ExpertSystemArticleListGQL,
            variables: {
              input: {
                ...query.value,
                page,
              },
            },
          });
          items.value = data?.data.expert_system_article_list.items;
          setPagination({
            total: data?.data.expert_system_article_list.total,
            current: data?.data.expert_system_article_list.current_page,
            pageSize: data?.data.expert_system_article_list.limit,
          });
          reload({
            page: data?.data.expert_system_article_list.current_page,
          });
          query.value = {
            ...query.value,
            page: data?.data.expert_system_article_list.current_page,
            limit: data?.data.expert_system_article_list.limit,
          };
          loading.value = false;
        });
      };
      onMounted(async () => {
        setShowPagination(true);
        loadData(1);
        // 加载文章分类列表
        const articleCategoriesData = await instance?.proxy?.$apollo?.query({
          query: gql.articleCategoriesGQL,
        });
        const articleCategories = articleCategoriesData?.data.expert_system_article_categories;
        let articleCategoryOptions: any = [];
        for (let index = 0; index < articleCategories.length; index++) {
          const item = articleCategories[index];
          articleCategoryOptions.push({
            label: item.name,
            value: item.id,
            key: item.id,
          });
        }
        // 加载专家列表
        const staffsData = await instance?.proxy?.$apollo?.query({
          query: gql.staffsGQL,
        });
        const staffs = staffsData?.data.expert_system_staffs;
        let staffOptions: any = [];
        for (let index = 0; index < staffs.length; index++) {
          const item = staffs[index];
          staffOptions.push({
            label: item.name,
            value: item.id,
            key: item.id,
          });
        }
        const schemas: FormSchema[] = [
          {
            field: 'article_category_id',
            component: 'Select',
            label: '文章分类',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请选择',
              onChange: (val: any) => {
                query.value = {
                  ...query.value,
                  expert_system_article_category_id: parseInt(val),
                };
              },
              options: articleCategoryOptions,
              defaultValue: query.value.expert_system_article_category_id,
            },
          },
          {
            field: 'staff_id',
            component: 'Select',
            label: '专家',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请选择',
              onChange: (val: any) => {
                query.value = {
                  ...query.value,
                  expert_system_staff_id: parseInt(val),
                };
              },
              options: staffOptions,
              defaultValue: query.value.expert_system_staff_id,
            },
          },
          {
            field: 'online_status',
            component: 'Select',
            label: '状态',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请选择',
              onChange: (val: any) => {
                query.value = {
                  ...query.value,
                  online_status: val,
                };
              },
              options: [
                {
                  label: '上架',
                  value: 'up',
                  key: 'up',
                },
                {
                  label: '下架',
                  value: 'down',
                  key: 'down',
                },
              ],
              defaultValue: query.value.online_status,
            },
          },
          {
            field: 'q',
            component: 'Input',
            label: '关键词',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请输入标题或简介',
              onChange: (e: any) => {
                query.value = {
                  ...query.value,
                  q: e.target.value,
                };
              },
              defaultValue: query.value.q,
            },
          },
        ];
        setProps({
          useSearchForm: true,
          formConfig: {
            schemas,
            showAdvancedButton: false,
            submitFunc: async () => {
              loadData(1);
            },
            resetFunc: async () => {
              query.value = {
                ...query.value,
                expert_system_staff_id: null,
                q: '',
                expert_system_article_category_id: null,
                online_status: '',
              };
            },
          },
        });
      });
      const handleDelete = (record: Recordable) => {
        loading.value = true;
        instance?.proxy?.$apollo
          ?.mutate({
            mutation: gql.removeExpertSystemArticleGQL,
            variables: {
              id: record.id,
            },
          })
          .then(() => {
            loading.value = false;
            createMessage.success('刪除成功!');
            loadData(query.value.page);
          })
          .catch(() => {
            loading.value = true;
          });
      };
      const handleEdit = (record: Recordable) => {
        instance?.proxy?.$router.push({
          path: '/expert-system/article/edit',
          query: { id: record.id },
        });
      };
      const handleAdd = () => {
        instance?.proxy?.$router.push({
          path: '/expert-system/article/edit',
        });
      };
      const handleUp = (record: Recordable) => {
        loading.value = true;
        instance?.proxy?.$apollo
          ?.mutate({
            mutation: gql.upExpertSystemArticleGQL,
            variables: {
              id: record.id,
            },
          })
          .then(() => {
            loading.value = false;
            createMessage.success('上架成功!');
            loadData(query.value.page);
          })
          .catch(() => {
            loading.value = true;
          });
      };
      const handleDown = (record: Recordable) => {
        loading.value = true;
        instance?.proxy?.$apollo
          ?.mutate({
            mutation: gql.downExpertSystemArticleGQL,
            variables: {
              id: record.id,
            },
          })
          .then(() => {
            loading.value = false;
            createMessage.success('下架成功!');
            loadData(query.value.page);
          })
          .catch(() => {
            loading.value = true;
          });
      };
      return {
        registerTable,
        handleDelete,
        handleEdit,
        handleAdd,
        handleUp,
        handleDown,
        loading,
        items,
      };
    },
  });
</script>
