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
  interface InputItem {
    cover: String;
    product_id: Number | null;
    plot_land_id: Number | null;
    unit: String | null;
    number: Number;
    remark: String;
  }
  const inputData = reactive<InputItem>({
    cover: '',
    number: 0,
    remark: '',
    unit: null,
    product_id: null,
    plot_land_id: null,
  });
  const productAllParams = reactive({
    q: '',
  });
  const plotLandAllParams = reactive({
    q: '',
  });
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('产品入库');
  const instance = ref<any>(null);
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'product_id',
      component: 'ApiSelect',
      label: '产品品类',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入名称',
          showSearch: true,
          onSearch: (value) => {
            productAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityProductAllGQL,
                  variables: {
                    input: {
                      ...productAllParams,
                    },
                  },
                })
                .then((rep) => {
                  resolve(rep.data.traceability_product_all);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: productAllParams.q,
          },
          onChange: (val: any) => {
            inputData.product_id = val;
          },
          labelField: 'name',
          valueField: 'id',
          defaultValue: inputData.product_id,
          filterOption: false,
        };
      },
    },
    {
      field: 'plot_land_id',
      component: 'ApiSelect',
      label: '所属地块',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入名称',
          showSearch: true,
          onSearch: (value) => {
            productAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityPlotLandAllGQL,
                  variables: {
                    input: {
                      ...plotLandAllParams,
                    },
                  },
                })
                .then((rep) => {
                  resolve(rep.data.traceability_plot_land_all);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: plotLandAllParams.q,
          },
          onChange: (val: any) => {
            inputData.plot_land_id = val;
          },
          labelField: 'name',
          valueField: 'id',
          defaultValue: inputData.plot_land_id,
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
        inputData.unit = null;
        inputData.product_id = null;
        inputData.plot_land_id = null;
        methods.setFieldsValue({
          cover: '',
          number: 0,
          remark: '',
          unit: null,
          product_id: null,
          plot_land_id: null,
        });
        productAllParams.q = '';
        plotLandAllParams.q = '';
        methods.clearValidate();
      };
      const query = instance?.value?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.value?.proxy?.$apollo?.query({
            query: gql.traceabilityProductInputGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_product_input;
          console.log(info?.cover ? [info.cover] : []);
          methods.setFieldsValue({
            cover: info?.cover ? [info.cover] : [],
            remark: info.remark,
            product_id: info?.product.id,
            plot_land_id: info?.plot_land.id,
            number: info?.number,
            unit: info?.unit,
          });
          inputData.cover = info.cover;
          inputData.remark = info.remark;
          inputData.product_id = info?.product.id;
          inputData.plot_land_id = info?.plot_land.id;
          inputData.number = info.number;
          inputData.unit = info.unit;
          productAllParams.q = info?.product.name;
          plotLandAllParams.q = info?.plot_land.code;
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
                mutation: gql.traceabilityProductInputUpdateGQL,
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
                mutation: gql.traceabilityProductInputAddGQL,
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
