<template>
  <PageWrapper :title="pageTitle" contentFullHeight>
    <CollapseContainer title="基础信息">
      <BasicForm
        @register="register"
        autoFocusFirstItem
        :labelWidth="200"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
        @reset="handleReset"
        :submitButtonOptions="{ text: '保存' }"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, getCurrentInstance, onMounted, h, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  import { uploadApi } from '/@/api/sys/upload';
  import { Tinymce } from '/@/components/Tinymce/index';
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('食宿单位管理');
  const formData = reactive({
    name: '',
    contact: '',
    telephone: '',
    address: '',
    sort: 0,
    rer_capital_consumption: 0.0,
    images: [],
    status: 'DOWN',
    content: '',
    is_dining: 'YES',
    is_accommodation: 'YES',
  });

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
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (e: any) => {
            formData.name = e.target.value;
          },
          defaultValue: formData.name,
        };
      },
    },
    {
      field: 'contact',
      component: 'Input',
      label: '联系人',
      required: false,
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (e: any) => {
            formData.contact = e.target.value;
          },
          defaultValue: formData.contact,
        };
      },
    },
    {
      field: 'telephone',
      component: 'Input',
      label: '联系电话',
      required: false,
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (e: any) => {
            formData.telephone = e.target.value;
          },
          defaultValue: formData.telephone,
        };
      },
    },
    {
      field: 'address',
      component: 'Input',
      label: '地址',
      required: false,
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (e: any) => {
            formData.address = e.target.value;
          },
          defaultValue: formData.address,
        };
      },
    },
    {
      field: 'status',
      component: 'Switch',
      label: '状态',
      colProps: {
        span: 18,
      },
      componentProps: {
        checkedValue: 1,
        unCheckedValue: 0,
        checkedChildren: '上线',
        unCheckedChildren: '下架',
        onChange: (val: any) => {
          formData.status = val == 1 ? 'UP' : 'DOWN';
        },
        defaultValue: formData.status == 'UP' ? 1 : 0,
      },
    },
    {
      field: 'is_dining',
      component: 'Switch',
      label: '就餐',
      colProps: {
        span: 8,
      },
      componentProps: {
        checkedValue: 'YES',
        unCheckedValue: 'NO',
        checkedChildren: '是',
        unCheckedChildren: '否',
        onChange: (val: any) => {
          formData.is_dining = val;
        },
        defaultValue: formData.is_dining,
      },
    },
    {
      field: 'is_accommodation',
      component: 'Switch',
      label: '住宿',
      colProps: {
        span: 8,
      },
      componentProps: {
        checkedValue: 'YES',
        unCheckedValue: 'NO',
        checkedChildren: '是',
        unCheckedChildren: '否',
        onChange: (val: any) => {
          formData.is_accommodation = val;
        },
        defaultValue: formData.is_accommodation,
      },
    },
    {
      field: 'rer_capital_consumption',
      component: 'InputNumber',
      label: '人均消费',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (val: any) => {
          formData.rer_capital_consumption = val;
        },
        defaultValue: formData.rer_capital_consumption,
      },
    },
    {
      field: 'sort',
      component: 'InputNumber',
      label: '排序',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (val: any) => {
          formData.sort = val;
        },
        defaultValue: formData.sort,
      },
    },
    {
      field: 'images',
      component: 'Upload',
      label: '图片列表-限4张(300*300)',
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          multiple: true,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              formData.images = fileList;
            } else {
              formData.images = [];
            }
          },
          defaultValue: formData.images ?? [],
        };
      },
    },
    {
      field: 'content',
      component: 'Input',
      label: '内容',
      colProps: {
        span: 18,
      },
      rules: [{ required: false }],
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
            formData.content = value;
          },
          showImageUpload: false,
          options: {
            menubar: 'edit insert view format table',
          },
        });
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
        formData.name = '';
        formData.sort = 10;
        formData.contact = '';
        formData.telephone = '';
        formData.content = '';
        formData.images = [];
        formData.address = '';
        formData.rer_capital_consumption = 0.0;
        formData.status = 'DOWN';
        formData.is_dining = 'YES';
        formData.is_accommodation = 'YES';
        methods.setFieldsValue({
          name: '',
          contact: '',
          address: '',
          telephone: '',
          images: [],
          content: '',
          sort: 10,
          status: 0,
          rer_capital_consumption: 0.0,
          is_dining: 'YES',
          is_accommodation: 'YES',
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.contentManagerRestaurantGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.common_restaurant;
          methods.setFieldsValue({
            name: info.name,
            contact: info.contact,
            telephone: info.telephone,
            sort: info.sort,
            images: info.images,
            address: info.address,
            is_accommodation: info.is_accommodation,
            is_dining: info.is_dining,
            content: info.content,
            status: info.status == 'UP' ? 1 : 0,
            rer_capital_consumption: info.rer_capital_consumption,
          });
          formData.name = info.name;
          formData.contact = info.contact;
          formData.sort = info.sort;
          formData.rer_capital_consumption = info.rer_capital_consumption;
          formData.content = info.content;
          formData.status = info.status;
          formData.images = info.images;
          formData.address = info.address;
          formData.telephone = info.telephone;
          formData.is_accommodation = info.is_accommodation;
          formData.is_dining = info.is_dining;
        });
        pageTitle.value = '编辑食宿单位';
      } else {
        pageTitle.value = '新增食宿单位';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerRestaurantUpdateGQL,
                variables: {
                  id: itemId.value,
                  input: formData,
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
                mutation: gql.contentManagerRestaurantAddGQL,
                variables: {
                  input: formData,
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
