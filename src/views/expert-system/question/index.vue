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
          <a-button type="primary" @click="handleAdd">添加留言</a-button>
        </template>
      </BasicTable>
    </div>
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
    page: number;
    online_status: string;
  }
  const query = ref<queryParams>({
    q: '',
    limit: 10,
    expert_system_staff_id: null,
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
            query: gql.ExpertSystemQuestionListGQL,
            variables: {
              input: {
                ...query.value,
                page,
              },
            },
          });
          items.value = data?.data.expert_system_question_list.items;
          setPagination({
            total: data?.data.expert_system_question_list.total,
            current: data?.data.expert_system_question_list.current_page,
            pageSize: data?.data.expert_system_question_list.limit,
          });
          reload({
            page: data?.data.expert_system_question_list.current_page,
          });
          query.value = {
            ...query.value,
            page: data?.data.expert_system_question_list.current_page,
            limit: data?.data.expert_system_question_list.limit,
          };
          loading.value = false;
        });
      };
      onMounted(async () => {
        setShowPagination(true);
        loadData(1);
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
                  label: '上线',
                  value: 'up',
                  key: 'up',
                },
                {
                  label: '下线',
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
              placeholder: '请输入标题',
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
            mutation: gql.removeExpertSystemQuestionGQL,
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
          path: '/expert-system/question/edit',
          query: { id: record.id },
        });
      };
      const handleAdd = () => {
        instance?.proxy?.$router.push({
          path: '/expert-system/question/edit',
        });
      };
      const handleUp = (record: Recordable) => {
        loading.value = true;
        instance?.proxy?.$apollo
          ?.mutate({
            mutation: gql.upExpertSystemQuestionGQL,
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
            mutation: gql.downExpertSystemQuestionGQL,
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
