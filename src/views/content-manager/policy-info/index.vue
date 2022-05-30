<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <div style="width: 80%">
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
        <template #form-custom> xxx </template>
        <template #toolbar>
          <a-button type="primary" @click="handleAdd">添加政策资讯</a-button>
        </template>
      </BasicTable>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted, ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction, FormSchema } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import gql from '/@/graphql/index';
  let items = ref([]);
  let loading = ref(false);
  const query = reactive({
    q: '',
    limit: 10,
    page: 1,
    status: '',
  });
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const instance = getCurrentInstance();
      const { createMessage } = useMessage();
      const [registerTable, { setPagination, setShowPagination, reload, setProps }] = useTable({
        title: '政策资讯列表',
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
          query.limit = pagination.pageSize;
          instance?.proxy?.$nextTick(() => {
            loadData(pagination.current);
          });
        },
      });
      const loadData = async (page: number) => {
        loading.value = true;

        instance?.proxy?.$nextTick(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.contentManagerPolicyInfoListGQL,
            variables: {
              input: {
                ...query,
                page,
              },
            },
          });
          const listData = data?.data.big_data_policy_article_list;
          items.value = listData.items;
          setPagination({
            total: listData?.total,
            current: listData?.current_page,
            pageSize: listData?.limit,
          });
          reload({
            page: listData?.current_page,
          });
          query.page = listData?.current_page;
          query.limit = listData?.limit;
          loading.value = false;
        });
      };
      onMounted(async () => {
        setShowPagination(true);
        loadData(1);
        const schemas: FormSchema[] = [
          {
            field: 'status',
            component: 'Select',
            label: '状态',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请选择',
              onChange: (val: any) => {
                query.status = val;
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
              defaultValue: query.status,
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
                query.q = e.target.value;
              },
              defaultValue: query.q,
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
              query.q = '';
              query.status = '';
            },
          },
        });
      });
      const handleDelete = (record: Recordable) => {
        loading.value = true;
        instance?.proxy?.$apollo
          ?.mutate({
            mutation: gql.contentManagerPolicyInfoRemoveGQL,
            variables: {
              id: record.id,
            },
          })
          .then(() => {
            loading.value = false;
            createMessage.success('刪除成功!');
            loadData(query.page);
          })
          .catch(() => {
            loading.value = true;
          });
      };
      const handleEdit = (record: Recordable) => {
        instance?.proxy?.$router.push({
          name: 'PolicyInfoEdit',
          query: { id: record.id },
        });
      };
      const handleAdd = () => {
        instance?.proxy?.$router.push({
          name: 'PolicyInfoEdit',
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
