<template>
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
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted, h, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tinymce } from '/@/components/Tinymce/index';
  import gql from '/@/graphql/index';

  const formData = reactive({
    dk: '',
  });

  const schemas: FormSchema[] = [
    {
      field: 'dk',
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
            formData.dk = value;
          },
        });
      },
    },
  ];
  export default defineComponent({
    name: 'Sj',
    components: {
      BasicForm,
    },
    setup() {
      const { createMessage } = useMessage();
      const instance = getCurrentInstance();
      const [register, methods] = useForm();
      const handleReset = () => {
        formData.dk = '';
        methods.setFieldsValue({
          dk: '',
        });
        methods.clearValidate();
      };
      onMounted(async () => {
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.commonSettingQueryMultiple,
          variables: {
            keys: ['map-index-dk'],
          },
        });
        const infos = data?.data?.common_setting_query_multiple;
        const keyVals = {};
        for (let i = 0; i < infos.length; i++) {
          keyVals[infos[i].key] = infos[i].val;
        }

        formData.dk = keyVals['map-index-dk'];
        methods.setFieldsValue({
          dk: keyVals['map-index-dk'],
        });
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
                    key: 'map-index-dk',
                    val: formData.dk,
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
      };
    },
  });
</script>
