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
  import { defineComponent, ref, getCurrentInstance, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { uploadApi } from '/@/api/sys/upload';
  import gql from '/@/graphql/index';
  interface InputItem {
    cover: String;
    number: Number;
    unit: String;
    manager: String;
    remark: String;
    product_input_id: Number | null;
    processing_company_id: Number | null;
  }
  const inputData = reactive<InputItem>({
    cover: '',
    number: 0,
    remark: '',
    product_input_id: null,
    processing_company_id: null,
    manager: '',
    unit: '',
  });
  const productInputAllParams = reactive({
    q: '',
  });
  const processingCompanyAllParams = reactive({
    q: '',
  });
  const pageTitle = ref<string>('产品出库');
  const instance = ref<any>(null);
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'product_input_id',
      component: 'ApiSelect',
      label: '入库单',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入名称',
          showSearch: true,
          onSearch: (value) => {
            productInputAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityProductInputAllGQL,
                  variables: {
                    input: {
                      ...productInputAllParams,
                    },
                  },
                })
                .then((rep) => {
                  resolve(rep.data.traceability_product_input_all);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: productInputAllParams.q,
          },
          onChange: (val: any) => {
            inputData.product_input_id = val;
          },
          labelField: 'name',
          valueField: 'id',
          defaultValue: inputData.product_input_id,
          filterOption: false,
        };
      },
    },
    {
      field: 'processing_company_id',
      component: 'ApiSelect',
      label: '加工企业',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入名称',
          showSearch: true,
          onSearch: (value) => {
            processingCompanyAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityProcessingCompanyAllGQL,
                  variables: {
                    input: {
                      ...processingCompanyAllParams,
                    },
                  },
                })
                .then((rep) => {
                  resolve(rep.data.traceability_processing_company_all);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: processingCompanyAllParams.q,
          },
          onChange: (val: any) => {
            inputData.processing_company_id = val;
          },
          labelField: 'name',
          valueField: 'id',
          defaultValue: inputData.processing_company_id,
          filterOption: false,
        };
      },
    },
    {
      field: 'cover',
      component: 'Upload',
      label: '照片',
      colProps: {
        span: 12,
      },
      componentProps: ({}) => {
        return {
          multiple: false,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              inputData.cover = fileList[0];
            } else {
              inputData.cover = '';
            }
          },
          defaultValue: [inputData.cover],
        };
      },
    },
    {
      field: 'number',
      component: 'InputNumber',
      label: '数量',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.number = val;
          },
          defaultValue: inputData.number,
        };
      },
    },
    {
      field: 'unit',
      component: 'Select',
      label: '单位',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.unit = val;
          },
          options: [
            {
              label: '克(g)',
              value: 'g',
            },
            {
              label: '千克(kg)',
              value: 'kg',
            },
            {
              label: '吨(t)',
              value: 't',
            },
          ],
          defaultValue: inputData.unit,
        };
      },
    },
    {
      field: 'manager',
      component: 'Input',
      label: '经办人',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.manager = e.target.value;
          },
          defaultValue: inputData.manager,
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
      instance.value = getCurrentInstance();
      const [register, methods] = useForm();
      const handleReset = () => {
        inputData.cover = '';
        inputData.number = 0;
        inputData.remark = '';
        inputData.manager = '';
        inputData.unit = '';
        inputData.product_input_id = null;
        inputData.processing_company_id = null;
        methods.setFieldsValue({
          cover: '',
          number: 0,
          manager: '',
          unit: '',
          product_input_id: null,
          processing_company_id: null,
          remark: '',
        });
        productInputAllParams.q = '';
        processingCompanyAllParams.q = '';
        methods.clearValidate();
      };
      pageTitle.value = '新增产品出库';
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          // 新增
          instance?.value?.proxy?.$apollo
            ?.mutate({
              mutation: gql.traceabilityProductOutputAddGQL,
              variables: {
                input: inputData,
              },
            })
            .then(() => {
              createMessage.success('出库成功');
              handleReset();
            })
            .catch((error) => {
              console.log(error);
            });
        },
        register,
        pageTitle,
      };
    },
  });
</script>
