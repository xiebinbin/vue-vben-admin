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
  import { defineComponent, ref, getCurrentInstance, onMounted, h } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { Tinymce } from '/@/components/Tinymce/index';
  import gql from '/@/graphql/index';
  const title = ref<string>('');
  const introduction = ref<string>('');
  const content = ref<string>('');
  const categoryId = ref<any>(null);
  const onlineStatus = ref(0);
  const staffId = ref<any>(null);
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('知识管理');
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
            title.value = e.target.value;
          },
          defaultValue: title.value,
        };
      },
    },
    {
      field: 'article_category_id',
      component: 'Select',
      label: '知识分类',
      colProps: {
        span: 16,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请选择',
          onChange: (val: any) => {
            categoryId.value = val;
          },
          options: [],
        };
      },
    },
    {
      field: 'staff_id',
      component: 'Select',
      label: '专家',
      colProps: {
        span: 16,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请选择',
          onChange: (val: any) => {
            staffId.value = val;
          },
          options: [],
        };
      },
    },
    {
      field: 'online_status',
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
          onlineStatus.value = val;
        },
        defaultValue: onlineStatus.value,
      },
    },
    {
      field: 'introduction',
      component: 'InputTextArea',
      label: '简介',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          onChange: (e) => {
            introduction.value = e?.target?.value;
          },
          defaultValue: introduction.value,
          autosize: { minRows: 6, maxRows: 12 },
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
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
            content.value = value;
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
      onMounted(async () => {
        // 加载知识分类
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.articleCategoriesGQL,
        });
        const items = data?.data.expert_system_article_categories;
        let options: any = [];

        for (let index = 0; index < items.length; index++) {
          const item = items[index];
          options.push({
            label: item.name,
            value: item.id,
            key: item.id,
          });
        }
        // 加载专家
        let staffOptions: any = [];
        const staffData = await instance?.proxy?.$apollo?.query({
          query: gql.staffsGQL,
        });
        const staffItems = staffData?.data.expert_system_staffs;
        for (let index = 0; index < staffItems.length; index++) {
          const item = staffItems[index];
          staffOptions.push({
            label: item.name,
            value: item.id,
            key: item.id,
          });
        }
        methods.updateSchema([
          {
            field: 'article_category_id',
            component: 'Select',
            label: '知识分类',
            colProps: {
              span: 16,
            },
            componentProps: ({}) => {
              return {
                placeholder: '请选择',
                onChange: (val: any) => {
                  categoryId.value = val;
                },
                options,
                defaultValue: categoryId.value,
              };
            },
          },
          {
            field: 'staff_id',
            component: 'Select',
            label: '专家',
            colProps: {
              span: 16,
            },
            componentProps: ({}) => {
              return {
                placeholder: '请选择',
                onChange: (val: any) => {
                  staffId.value = val;
                },
                options: staffOptions,
                defaultValue: staffId.value,
              };
            },
          },
        ]);
      });
      const handleReset = () => {
        title.value = '';
        introduction.value = '';
        content.value = '';
        onlineStatus.value = 0;
        staffId.value = null;
        categoryId.value = null;
        methods.setFieldsValue({
          title: '',
          introduction: '',
          content: '',
          online_status: 0,
          staff_id: null,
          article_category_id: null,
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.ExpertSystemArticleGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.expert_system_article;
          methods.setFieldsValue({
            title: info.title,
            introduction: info.introduction,
            content: info.content,
            article_category_id: info.expert_system_article_category?.id,
            staff_id: info.expert_system_staff?.id,
            online_status: info.online_status,
          });
          title.value = info.title;
          introduction.value = info.introduction;
          content.value = info.content;
          categoryId.value = info.expert_system_article_category?.id;
          staffId.value = info.expert_system_staff?.id;
          onlineStatus.value = info.online_status;
        });
        pageTitle.value = '编辑知识';
      } else {
        pageTitle.value = '新增知识';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.updateExpertSystemArticleGQL,
                variables: {
                  id: itemId.value,
                  input: {
                    title: title.value,
                    introduction: introduction.value,
                    content: content.value,
                    expert_system_article_category_id: categoryId.value,
                    expert_system_staff_id: staffId.value,
                    online_status: onlineStatus.value,
                  },
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
                mutation: gql.addExpertSystemArticleGQL,
                variables: {
                  input: {
                    title: title.value,
                    introduction: introduction.value,
                    content: content.value,
                    expert_system_article_category_id: categoryId.value,
                    expert_system_staff_id: staffId.value,
                    online_status: onlineStatus.value,
                  },
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
