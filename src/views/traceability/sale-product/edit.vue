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
        :submitButtonOptions="{
          text: '保存',
        }"
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
  import { uploadApi } from '/@/api/sys/upload';
  import gql from '/@/graphql/index';
  const inputData = reactive({
    processing_company_id: null,
    name: '',
    number: 0,
    unit: '',
    unit_price: 0.0,
    total_price: 0.0,
    images: [],
    operator: '',
    phone: '',
    warehouse: '',
    remark: '',
  });
  const companyAllParams = reactive({
    q: '',
  });
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('销售记录');
  const instance = ref<any>(null);
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'processing_company_id',
      component: 'ApiSelect',
      label: '厂家',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入名称',
          showSearch: true,
          onSearch: (value) => {
            companyAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityProcessingCompanyAllGQL,
                  variables: {
                    input: {
                      ...companyAllParams,
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
            q: companyAllParams.q,
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
      component: 'Input',
      label: '单位',
      required: true,
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
      field: 'unit_price',
      component: 'InputNumber',
      label: '单价',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.unit_price = val;
          },
          defaultValue: inputData.unit_price,
        };
      },
    },
    {
      field: 'total_price',
      component: 'InputNumber',
      label: '小计',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.total_price = val;
          },
          defaultValue: inputData.total_price,
        };
      },
    },
    {
      field: 'images',
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
      required: true,
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
      label: '手机',
      required: true,
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
      required: true,
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
      instance.value = getCurrentInstance();
      const [register, methods] = useForm();
      const handleReset = () => {
        inputData.processing_company_id = null;
        inputData.name = '';
        inputData.number = 0;
        inputData.unit = '';
        inputData.unit_price = 0.0;
        inputData.total_price = 0.0;
        inputData.images = [];
        inputData.operator = '';
        inputData.phone = '';
        inputData.warehouse = '';
        inputData.remark = '';
        methods.setFieldsValue({
          number: 0,
          unit: '',
          unit_price: 0.0,
          total_price: 0.0,
          images: [],
          operator: '',
          phone: '',
          warehouse: '',
          remark: '',
        });
        companyAllParams.q = '';
        methods.clearValidate();
      };
      const query = instance?.value?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.value?.proxy?.$apollo?.query({
            query: gql.traceabilitySaleProductGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_sale_product;
          methods.setFieldsValue({
            name: info?.name,
            number: info?.number,
            unit: info?.unit,
            unit_price: info?.unit_price,
            total_price: info?.total_price,
            images: info?.images,
            operator: info?.operator,
            phone: info?.phone,
            warehouse: info?.warehouse,
            remark: info?.remark,
            processing_company_id: info?.processing_company.id,
          });
          inputData.name = info?.name;
          inputData.number = info?.number;
          inputData.unit = info?.unit;
          inputData.unit_price = info?.unit_price;
          inputData.total_price = info?.total_price;
          inputData.images = info?.images;
          inputData.operator = info?.operator;
          inputData.phone = info?.phone;
          inputData.warehouse = info?.warehouse;
          inputData.remark = info?.remark;
          inputData.processing_company_id = info?.processing_company.id;
          companyAllParams.q = info?.plot_land.code;
        });
        pageTitle.value = '编辑产品入库';
      } else {
        pageTitle.value = '新增产品入库';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilitySaleProductUpdateGQL,
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
            instance?.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilitySaleProductAddGQL,
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
