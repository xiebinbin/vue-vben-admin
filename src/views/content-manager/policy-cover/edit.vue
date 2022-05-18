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
  import { defineComponent, ref, getCurrentInstance, reactive, onMounted } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { uploadApi } from '/@/api/sys/upload';
  import gql from '/@/graphql/index';
  import { useRoute } from 'vue-router';

  const itemId = ref<any>(null);
  const inputData = reactive({
    link: '',
    image_url: '',
    sort: 10,
    status: 'DOWN',
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
      field: 'link',
      component: 'Input',
      label: '跳转地址',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.link = e.target.value;
          },
          defaultValue: inputData.link,
        };
      },
    },
    {
      field: 'image_url',
      component: 'Upload',
      label: '图片',
      colProps: {
        span: 12,
      },
      componentProps: ({}) => {
        return {
          multiple: false,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              inputData.image_url = fileList[0];
            } else {
              inputData.image_url = '';
            }
          },
          defaultValue: inputData.image_url ? [inputData.image_url] : [],
        };
      },
    },
    {
      field: 'sort',
      component: 'InputNumber',
      label: '排序',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.sort = val;
          },
          defaultValue: inputData.sort,
        };
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.status = val;
          },
          options: [
            {
              label: '下线',
              value: 'DOWN',
            },
            {
              label: '上线',
              value: 'UP',
            },
          ],
          defaultValue: inputData.status,
        };
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const [register, methods] = useForm();

      instance.value = getCurrentInstance();
      const handleReset = () => {
        inputData.link = '';
        inputData.image_url = '';
        inputData.sort = 10;
        inputData.status = 'DOWN';
        methods.setFieldsValue({
          link: '',
          image_url: '',
          sort: 10,
          status: 'DOWN',
        });
        methods.clearValidate();
      };
      const $route = useRoute();
      itemId.value = $route.query?.id;
      if (!!itemId.value) {
        onMounted(async () => {
          const data = await getCurrentInstance()?.proxy?.$apollo?.query({
            query: gql.contentManagerPolicyCoverGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.big_data_policy_cover;
          console.log(data);
          methods.setFieldsValue({
            link: info.link,
            image_url: !!info.image_url ? [info.image_url] : [],
            sort: info.sort,
            status: info.status,
          });
          inputData.link = info.name;
          inputData.image_url = info.cover;
          inputData.sort = info.sort;
          inputData.status = info.status;
        });
      }
      pageTitle.value = !!itemId.value ? '编辑政策资讯轮播' : '新增政策资讯轮播';
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerPolicyCoverUpdateGQL,
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
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerPolicyCoverAddGQL,
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
