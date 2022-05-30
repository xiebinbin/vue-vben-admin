<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <div style="width: 70%">
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
          <a-button type="primary" @click="handleAdd">添加加工企业</a-button>
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
  interface queryParams {
    q: string;
    limit: number;
    page: number;
  }
  const query = reactive<queryParams>({
    q: '',
    limit: 10,
    page: 1,
  });
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const instance = getCurrentInstance();
      const { createMessage } = useMessage();
      const [registerTable, { setPagination, setShowPagination, reload, setProps }] = useTable({
        title: '加工企业列表',
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
            query: gql.traceabilityProcessingCompanyListGQL,
            variables: {
              input: {
                ...query,
                page,
              },
            },
          });
          items.value = data?.data.traceability_processing_company_list.items;
          setPagination({
            total: data?.data.traceability_processing_company_list.total,
            current: data?.data.traceability_processing_company_list.current_page,
            pageSize: data?.data.traceability_processing_company_list.limit,
          });
          reload({
            page: data?.data.traceability_processing_company_list.current_page,
          });
          query.page = data?.data.traceability_processing_company_list.current_page;
          query.limit = data?.data.traceability_processing_company_list.limit;
          loading.value = false;
        });
      };
      onMounted(async () => {
        setShowPagination(true);
        loadData(1);
        const schemas: FormSchema[] = [
          {
            field: 'keyword',
            component: 'Input',
            label: '关键词',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请输入名称或组织机构代码证',
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
              query.page = 1;
            },
          },
        });
      });
      const handleDelete = (record: Recordable) => {
        loading.value = true;
        instance?.proxy?.$apollo
          ?.mutate({
            mutation: gql.traceabilityProcessingCompanyRemoveGQL,
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
          path: '/traceability/processing-company/edit',
          query: { id: record.id },
        });
      };
      const handleAdd = () => {
        instance?.proxy?.$router.push({
          path: '/traceability/processing-company/edit',
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
