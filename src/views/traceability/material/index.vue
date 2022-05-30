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
          <a-button type="primary" @click="handleAdd">添加记录</a-button>
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
    category: '',
    limit: 10,
    page: 1,
  });
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const instance = getCurrentInstance();
      const { createMessage } = useMessage();
      const [registerTable, { setPagination, setShowPagination, reload, setProps }] = useTable({
        title: '物资出入库列表',
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
            query: gql.traceabilityMaterialListGQL,
            variables: {
              input: {
                ...query,
                page,
              },
            },
          });
          const listData = data?.data.traceability_material_list;
          items.value = listData?.items;
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
            field: '类型',
            component: 'Select',
            label: '类型',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请选择',
              onChange: (val: any) => {
                query.category = val;
              },
              options: [
                {
                  label: '入库',
                  value: '入库',
                  key: '入库',
                },
                {
                  label: '出库',
                  value: '出库',
                  key: '出库',
                },
              ],
              defaultValue: query.category,
            },
          },
          {
            field: 'keyword',
            component: 'Input',
            label: '关键词',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请输入名称',
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
            mutation: gql.traceabilityMaterialRemoveGQL,
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
          path: '/traceability/material/edit',
          query: { id: record.id },
        });
      };
      const handleAdd = () => {
        instance?.proxy?.$router.push({
          path: '/traceability/material/edit',
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
