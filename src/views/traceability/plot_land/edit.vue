<template>
  <PageWrapper :title="pageTitle" contentFullHeight>
    <CollapseContainer title="基础信息">
      <div class="w-2/3">
        <BasicForm
          @register="register"
          autoFocusFirstItem
          :labelWidth="200"
          ref="form"
          :schemas="schemas"
          :actionColOptions="{ span: 10 }"
          @submit="handleSubmit"
          @reset="handleReset"
          :submitButtonOptions="{ text: '保存' }"
        />
      </div>
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
  interface InputItem {
    title: String;
    code: String;
    farmer_id: Number | null;
    area: Number;
    remark: String;
  }
  const inputData = reactive<InputItem>({
    title: '',
    code: '',
    farmer_id: null,
    area: 0.0,
    remark: '',
  });
  const itemId = ref<any>(null);
  const instance = ref<any>(null);
  const pageTitle = ref<string>('地块');
  const farmerAllParams = reactive<any>({
    q: '',
  });

  const [register, methods] = useForm();
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'title',
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
            inputData.title = e.target.value;
          },
          defaultValue: inputData.title,
        };
      },
    },
    {
      field: 'code',
      component: 'Input',
      label: '编号',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.code = e.target.value;
          },
          defaultValue: inputData.code,
        };
      },
    },
    {
      field: 'farmer_id',
      component: 'ApiSelect',
      label: '所属农户',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入姓名或身份证',
          showSearch: true,
          onSearch: (value) => {
            farmerAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityFarmerAllGQL,
                  variables: {
                    input: {
                      ...farmerAllParams,
                    },
                  },
                })
                .then((rep) => {
                  resolve(rep.data.traceability_farmer_all);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: farmerAllParams.q,
          },
          onChange: (val: any) => {
            inputData.farmer_id = val;
          },
          labelField: 'name',
          valueField: 'id',
          defaultValue: inputData.farmer_id,
          filterOption: false,
        };
      },
    },
    {
      field: 'area',
      component: 'InputNumber',
      label: '面积',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.area = val;
          },
          defaultValue: inputData.area,
          addonAfter: '亩',
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
      const handleReset = () => {
        inputData.title = '';
        inputData.code = '';
        inputData.remark = '';
        inputData.farmer_id = null;
        inputData.area = 0.0;
        methods.setFieldsValue({
          title: '',
          code: '',
          remark: '',
          farmer_id: null,
          area: 0.0,
        });
        methods.clearValidate();
      };
      const query = instance.value?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance.value?.proxy?.$apollo?.query({
            query: gql.traceabilityPlotLandGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_plot_land;
          farmerAllParams.q = info?.farmer.id_card;
          methods.setFieldsValue({
            title: info.title,
            code: info.code,
            remark: info.remark,
            area: info.area,
            farmer_id: info?.farmer.id,
          });
        });
        pageTitle.value = '编辑地块';
      } else {
        pageTitle.value = '新增地块';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityPlotLandUpdateGQL,
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
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityPlotLandAddGQL,
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
