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
    receiver: String;
    manager: String;
    remark: String;
    material_id: Number | null;
  }
  const inputData = reactive<InputItem>({
    cover: '',
    number: 0,
    remark: '',
    material_id: null,
    manager: '',
    receiver: '',
  });
  const materialInputAllParams = reactive({
    q: '',
  });
  const pageTitle = ref<string>('物资出库');
  const instance = ref<any>(null);
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'material_id',
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
            materialInputAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityMaterialInputAllGQL,
                  variables: {
                    input: {
                      ...materialInputAllParams,
                    },
                  },
                })
                .then((rep) => {
                  resolve(rep.data.traceability_material_input_all);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: materialInputAllParams.q,
          },
          onChange: (val: any) => {
            inputData.material_id = val;
          },
          labelField: 'name',
          valueField: 'id',
          defaultValue: inputData.material_id,
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
      field: 'receiver',
      component: 'Input',
      label: '去向说明',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.receiver = e.target.value;
          },
          defaultValue: inputData.receiver,
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
        inputData.receiver = '';
        inputData.material_id = null;
        methods.setFieldsValue({
          name: '',
          cover: '',
          number: 0,
          manager: '',
          receiver: '',
          material_id: null,
          remark: '',
        });
        materialInputAllParams.q = '';
        methods.clearValidate();
      };
      pageTitle.value = '新增物资出库';
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          // 新增
          instance?.value?.proxy?.$apollo
            ?.mutate({
              mutation: gql.traceabilityMaterialOutputAddGQL,
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
