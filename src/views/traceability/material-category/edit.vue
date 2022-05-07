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
  interface InputItem {
    name: String;
    unit: String;
    remark: String;
  }
  const inputData = reactive<InputItem>({
    name: '',
    unit: '',
    remark: '',
  });
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('物资品类');
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
        inputData.unit = '';
        inputData.remark = '';
        methods.setFieldsValue({
          name: '',
          unit: '',
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
            query: gql.traceabilityMaterialCategoryGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_material_category;
          methods.setFieldsValue({
            name: info.name,
            unit: info.unit,
            remark: info.remark,
          });
        });
        pageTitle.value = '编辑物资品类';
      } else {
        pageTitle.value = '新增物资品类';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityMaterialCategoryUpdateGQL,
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
                mutation: gql.traceabilityMaterialCategoryAddGQL,
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
