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
  import { defineComponent, ref, getCurrentInstance, onMounted, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  import dayjs from 'dayjs';
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('社会化服务管理');
  const formData = reactive({
    title: '',
    category: '采收',
    pricing: 0.0,
    pricing_unit: '总金额',
    start_date: '',
    end_date: '',
    contact: '',
    phone: '',
    status: 'DOWN',
    address: '',
    content: '',
  });

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'title',
      component: 'Input',
      label: '标题',
      required: true,
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (e: any) => {
            formData.title = e.target.value;
          },
          defaultValue: formData.title,
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
      field: 'phone',
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
            formData.phone = e.target.value;
          },
          defaultValue: formData.phone,
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
      field: 'pricing',
      component: 'InputNumber',
      label: '费用',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (val: any) => {
          formData.pricing = val;
        },
        defaultValue: formData.pricing,
      },
    },
    {
      field: 'pricing_unit',
      component: 'Select',
      label: '费用单位',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            formData.pricing_unit = val;
          },
          options: [
            {
              label: '总金额',
              value: '总金额',
            },
            {
              label: '人/天',
              value: '人/天',
            },
          ],
          defaultValue: formData.pricing_unit,
        };
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            formData.status = val;
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
          defaultValue: formData.status,
        };
      },
    },
    {
      field: 'category',
      component: 'Select',
      label: '类型',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            formData.category = val;
          },
          options: [
            {
              label: '采收',
              value: '采收',
            },
            {
              label: '施肥',
              value: '施肥',
            },
            {
              label: '浇水',
              value: '浇水',
            },
            {
              label: '除草',
              value: '除草',
            },
            {
              label: '喷药',
              value: '喷药',
            },
          ],
          defaultValue: formData.category,
        };
      },
    },
    {
      field: 'date',
      component: 'RangePicker',
      label: '日期',
      required: true,
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          onChange: (dates) => {
            formData.start_date = dates[0].format('YYYY-MM-DD');
            formData.end_date = dates[1].format('YYYY-MM-DD');
          },
          defaultPickerValue: !!formData.start_date
            ? [dayjs(formData.start_date), dayjs(formData.end_date)]
            : [],
        };
      },
    },
    {
      field: 'content',
      component: 'InputTextArea',
      label: '内容',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          onChange: (e) => {
            formData.content = e?.target?.value;
          },
          defaultValue: formData.content,
          autosize: { minRows: 6, maxRows: 12 },
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
        formData.title = '';
        formData.category = '采收';
        formData.pricing = 0.0;
        formData.pricing_unit = '总金额';
        formData.start_date = '';
        formData.end_date = '';
        formData.contact = '';
        formData.phone = '';
        formData.content = '';
        formData.address = '';
        methods.setFieldsValue({
          title: '',
          category: '采收',
          pricing: 0.0,
          pricing_unit: '总金额',
          date: [null, null],
          contact: '',
          phone: '',
          status: 'DOWN',
          address: '',
          content: '',
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.contentManagerSocialServiceIndustryGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.big_data_social_service_industry;
          methods.setFieldsValue({
            title: info.title,
            category: info.category,
            pricing: info.pricing,
            pricing_unit: info.pricing_unit,
            date: !!info.start_date ? [dayjs(info.start_date), dayjs(info.end_date)] : [],
            phone: info.phone,
            status: info.status,
            contact: info.contact,
            address: info.address,
            content: info.content,
          });
          formData.title = info.title;
          formData.category = info.category;
          formData.pricing = info.pricing;
          formData.pricing_unit = info.pricing_unit;
          formData.start_date = info.start_date;
          formData.end_date = info.end_date;
          formData.contact = info.contact;
          formData.phone = info.phone;
          formData.status = info.status;
          formData.address = info.address;
          formData.content = info.content;
        });
        pageTitle.value = '编辑社会化服务';
      } else {
        pageTitle.value = '新增社会化服务';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerSocialServiceIndustryUpdateGQL,
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
                mutation: gql.contentManagerSocialServiceIndustryAddGQL,
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
