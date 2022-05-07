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
    id_card: String;
    phone: String;
    remark: String;
  }
  const inputData = reactive<InputItem>({
    name: '',
    id_card: '',
    phone: '',
    remark: '',
  });
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('农户');
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'name',
      component: 'Input',
      label: '姓名',
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
      field: 'id_card',
      component: 'Input',
      label: '身份证',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.id_card = e.target.value;
          },
          defaultValue: inputData.id_card,
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
        inputData.id_card = '';
        inputData.remark = '';
        inputData.phone = '';
        methods.setFieldsValue({
          name: '',
          id_card: '',
          remark: '',
          phone: '',
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.traceabilityFarmerGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_farmer;
          methods.setFieldsValue({
            name: info.name,
            id_card: info.id_card,
            remark: info.remark,
            phone: info.phone,
          });
        });
        pageTitle.value = '编辑农户';
      } else {
        pageTitle.value = '新增农户';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityFarmerUpdateGQL,
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
                mutation: gql.traceabilityFarmerAddGQL,
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
