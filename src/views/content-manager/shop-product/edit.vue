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
    name: '',
    images: [],
    desc: '',
    price: 0.0,
    sort: 10,
    company: '',
    status: 'DOWN',
    buy_url: '',
  });
  const pageTitle = ref<string>('商品-编辑');
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
      field: 'price',
      component: 'InputNumber',
      label: '价格',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.price = val;
          },
          defaultValue: inputData.price,
        };
      },
    },
    {
      field: 'images',
      component: 'Upload',
      label: '图片列表',
      colProps: {
        span: 12,
      },
      componentProps: ({}) => {
        return {
          multiple: true,
          api: uploadApi,
          onChange: (fileList: any) => {
            inputData.images = fileList;
          },
          defaultValue: inputData.images ?? [],
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
    {
      field: 'company',
      component: 'Input',
      label: '生产企业',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.company = e.target.value;
          },
          defaultValue: inputData.company,
        };
      },
    },
    {
      field: 'buy_url',
      component: 'Input',
      label: '购买链接',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.buy_url = e.target.value;
          },
          defaultValue: inputData.buy_url,
        };
      },
    },
    {
      field: 'desc',
      component: 'InputTextArea',
      label: '简介',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          onChange: (e) => {
            inputData.desc = e?.target?.value;
          },
          defaultValue: inputData.desc,
          autosize: { minRows: 6, maxRows: 12 },
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
        inputData.name = '';
        inputData.images = [];
        inputData.desc = '';
        inputData.sort = 10;
        inputData.company = '';
        inputData.buy_url = '';
        inputData.status = 'DOWN';
        methods.setFieldsValue({
          name: '',
          cover: '',
          desc: '',
          buy_url: '',
          sort: 10,
          company: '',
          status: 'DOWN',
        });
        methods.clearValidate();
      };
      const $route = useRoute();
      itemId.value = $route.query?.id;
      if (!!itemId.value) {
        onMounted(async () => {
          const data = await getCurrentInstance()?.proxy?.$apollo?.query({
            query: gql.contentManagerShopProductGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.common_shop_product;
          methods.setFieldsValue({
            name: info.name,
            images: info.images,
            desc: info.desc,
            price: info.price,
            sort: info.sort,
            buy_url: info.buy_url,
            company: info.company,
            status: info.status,
          });
          inputData.name = info.name;
          inputData.price = info.price;
          inputData.images = info.images;
          inputData.desc = info.desc;
          inputData.sort = info.sort;
          inputData.buy_url = info.buy_url;
          inputData.company = info.company;
          inputData.status = info.status;
        });
      }
      pageTitle.value = !!itemId.value ? '编辑商品' : '新增商品';
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerShopProductUpdateGQL,
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
                mutation: gql.contentManagerShopProductAddGQL,
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
