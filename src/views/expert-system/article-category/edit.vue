<template>
  <PageWrapper :title="pageTitle" contentFullHeight>
    <CollapseContainer title="基础信息">
      <BasicForm
        @register="register"
        autoFocusFirstItem
        :labelWidth="200"
        ref="form"
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
  import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  const name = ref<string>('');
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('知识分类');
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'name',
      component: 'Input',
      label: '分类名',
      required: true,
      colProps: {
        span: 12,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入分类名',
          onChange: (e: any) => {
            name.value = e.target.value;
          },
          defaultValue: name.value,
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
        name.value = '';
        methods.setFieldsValue({ name: '' });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.articleCategoryGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.expert_system_article_category;
          methods.setFieldsValue({ name: info.name });
        });
        pageTitle.value = '编辑知识分类';
      } else {
        pageTitle.value = '新增知识分类';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: (values: any) => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.updateArticleCategoryGQL,
                variables: {
                  id: itemId.value,
                  input: {
                    name: values.name,
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
                mutation: gql.addArticleCategoryGQL,
                variables: {
                  input: {
                    name: values.name,
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
