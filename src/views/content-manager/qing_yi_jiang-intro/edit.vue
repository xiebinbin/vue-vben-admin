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
  import { defineComponent, ref, h, getCurrentInstance, onMounted, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  import { Tinymce } from '/@/components/Tinymce/index';
  const pageTitle = ref<string>('清漪江康养带简介');
  const formData = reactive({
    intro: '',
  });

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'intro',
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
            formData.intro = value;
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
        formData.intro = '';
        methods.setFieldsValue({
          intro: '',
        });
        methods.clearValidate();
      };
      onMounted(async () => {
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.commonSettingQueryMultiple,
          variables: {
            keys: ['qing_yi_jiang-intro'],
          },
        });
        const infos = data?.data?.common_setting_query_multiple;
        const keyVals = {};
        for (let i = 0; i < infos.length; i++) {
          keyVals[infos[i].key] = infos[i].val;
        }
        methods.setFieldsValue({
          intro: keyVals['qing_yi_jiang-intro'] ?? '',
        });
        formData.intro = keyVals['qing_yi_jiang-intro'] ?? '';
      });
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          instance?.proxy?.$apollo
            ?.mutate({
              mutation: gql.commonSettingUpdateMultiple,
              variables: {
                items: [
                  {
                    key: 'qing_yi_jiang-intro',
                    val: formData.intro,
                  },
                ],
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
