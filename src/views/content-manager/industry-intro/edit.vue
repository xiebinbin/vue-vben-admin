<template>
  <PageWrapper :title="pageTitle" contentFullHeight>
    <CollapseContainer title="">
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
  import { Tinymce } from '/@/components/Tinymce/index';
  import gql from '/@/graphql/index';
  const pageTitle = ref<string>('产业发展简介');
  const formData = reactive({
    key: 'industry-intro',
    val: '',
  });

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'val',
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
            formData.val = value;
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
        formData.val = '';
        methods.setFieldsValue({
          val: '',
        });
        methods.clearValidate();
      };
      onMounted(async () => {
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.commonSettingQueryMultiple,
          variables: {
            keys: ['industry-intro'],
          },
        });
        const infos = data?.data?.common_setting_query_multiple;
        const keyVals = {};
        for (let i = 0; i < infos.length; i++) {
          keyVals[infos[i].key] = infos[i].val;
        }
        methods.setFieldsValue({
          val: Object.prototype.hasOwnProperty.call(keyVals, 'industry-intro')
            ? keyVals['industry-intro']
            : '',
        });
        formData.val = Object.prototype.hasOwnProperty.call(keyVals, 'industry-intro')
          ? keyVals['industry-intro']
          : '';
      });
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          instance?.proxy?.$apollo
            ?.mutate({
              mutation: gql.commonSettingUpdateMultiple,
              variables: {
                items: [formData],
              },
            })
            .then(() => {
              createMessage.success('更新成功');
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
