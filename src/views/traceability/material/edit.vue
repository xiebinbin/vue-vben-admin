<template>
  <PageWrapper :title="pageTitle" contentFullHeight>
    <CollapseContainer title="基础信息">
      <BasicForm
        @register="register"
        autoFocusFirstItem
        :labelWidth="200"
        ref="form"
        :schemas="schemas"
        :actionColOptions="{ span: 18 }"
        @submit="handleSubmit"
        @reset="handleReset"
        :submitButtonOptions="{ text: '保存' }"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, getCurrentInstance, onMounted, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  import { uploadApi } from '/@/api/sys/upload';
  const inputData = reactive({
    name: '',
    category: '出库',
    number: 0.0,
    unit: '',
    images: [],
    operator: '',
    phone: '',
    warehouse: '',
    remark: '',
  });
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('物资出入库');
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'name',
      component: 'Input',
      label: '名称',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.name = e.target.value;
          },
          defaultValue: inputData.name,
        };
      },
    },
    {
      field: 'category',
      component: 'Select',
      label: '类型',
      required: true,
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (val: any) => {
            inputData.category = val;
          },
          options: [
            {
              label: '出库',
              value: '出库',
            },
            {
              label: '入库',
              value: '入库',
            },
          ],
          defaultValue: inputData.category,
        };
      },
    },
    {
      field: 'number',
      component: 'InputNumber',
      label: '数量',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (val: any) => {
          inputData.number = val;
        },
        defaultValue: inputData.number,
      },
    },
    {
      field: 'unit',
      component: 'Input',
      label: '单位',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.unit = e.target.value;
          },
          defaultValue: inputData.unit,
        };
      },
    },
    {
      field: 'images',
      component: 'Upload',
      label: '图片列表',
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          multiple: true,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              inputData.images = fileList;
            } else {
              inputData.images = [];
            }
          },
          defaultValue: inputData.images ?? [],
        };
      },
    },
    {
      field: 'operator',
      component: 'Input',
      label: '操作人',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.operator = e.target.value;
          },
          defaultValue: inputData.operator,
        };
      },
    },
    {
      field: 'phone',
      component: 'Input',
      label: '联系电话',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.phone = e.target.value;
          },
          defaultValue: inputData.phone,
        };
      },
    },
    {
      field: 'warehouse',
      component: 'Input',
      label: '仓库',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.warehouse = e.target.value;
          },
          defaultValue: inputData.warehouse,
        };
      },
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '备注',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.remark = e.target.value;
          },
          defaultValue: inputData.remark,
        };
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const instance = getCurrentInstance();
      const [register, methods] = useForm();
      const handleReset = () => {
        inputData.name = '';
        inputData.category = '';
        inputData.number = 0.0;
        inputData.unit = '';
        inputData.images = [];
        inputData.operator = '';
        inputData.phone = '';
        inputData.warehouse = '';
        inputData.remark = '';
        methods.setFieldsValue({
          name: '',
          category: '',
          number: 0.0,
          unit: '',
          images: [],
          operator: '',
          phone: '',
          warehouse: '',
          remark: '',
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.traceabilityMaterialGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_material;
          methods.setFieldsValue({
            name: info?.name,
            category: info?.category,
            number: info?.number,
            unit: info?.unit,
            images: info?.images,
            operator: info?.operator,
            phone: info?.phone,
            warehouse: info?.warehouse,
            remark: info?.remark,
          });
        });
        pageTitle.value = '更新记录';
      } else {
        pageTitle.value = '新增记录';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityMaterialUpdateGQL,
                variables: {
                  id: itemId.value,
                  input: inputData,
                },
              })
              .then(() => {
                createMessage.success('更新成功');
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // 新增
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityMaterialAddGQL,
                variables: {
                  input: inputData,
                },
              })
              .then(() => {
                createMessage.success('創建成功');
                handleReset();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        },
        register,
        pageTitle,
      };
    },
  });
</script>
