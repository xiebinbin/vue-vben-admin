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
  import { uploadApi } from '/@/api/sys/upload';
  import gql from '/@/graphql/index';
  interface InputItem {
    name: String;
    cover: String;
    remark: String;
  }
  const inputData = reactive<InputItem>({
    name: '',
    cover: '',
    remark: '',
  });
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('产品品类');
  const instance = ref<any>(null);
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
      required: false,
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
        inputData.name = '';
        inputData.cover = '';
        inputData.remark = '';
        methods.setFieldsValue({
          name: '',
          cover: '',
          remark: '',
        });
        methods.clearValidate();
      };
      const query = instance?.value?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.value?.proxy?.$apollo?.query({
            query: gql.traceabilityProductGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_product;
          methods.setFieldsValue({
            name: info.name,
            cover: info.cover ? [info.cover] : [],
            remark: info.remark,
          });
          inputData.name = info.name;
          inputData.cover = info.cover;
          inputData.remark = info.remark;
        });
        pageTitle.value = '编辑产品品类';
      } else {
        pageTitle.value = '新增产品品类';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityProductUpdateGQL,
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
                mutation: gql.traceabilityProductAddGQL,
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
