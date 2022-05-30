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
  import { uploadApi } from '/@/api/sys/upload';
  import { Tinymce } from '/@/components/Tinymce/index';
  const pageTitle = ref<string>('溯源小程序');
  const formData = reactive({
    intro: '',
    qrcode: '',
    images: [],
  });

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'qrcode',
      component: 'Upload',
      label: '小程序二维码(1040*850)',
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          multiple: false,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              formData.qrcode = fileList[0];
            } else {
              formData.qrcode = '';
            }
            console.log(formData.qrcode, fileList);
          },
          defaultValue: formData.qrcode == '' ? [] : [formData.qrcode],
        };
      },
    },
    {
      field: 'images',
      component: 'Upload',
      label: '图片列表-限4张(1080*1920)',
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
        formData.qrcode = '';
        formData.images = [];
        methods.setFieldsValue({
          intro: '',
          qrcode: [],
          images: [],
        });
        methods.clearValidate();
      };
      onMounted(async () => {
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.commonSettingQueryMultiple,
          variables: {
            keys: [
              'traceability-minapp-intro',
              'traceability-minapp-qrcode',
              'traceability-minapp-intro-images',
            ],
          },
        });
        const infos = data?.data?.common_setting_query_multiple;
        const keyVals = {};
        for (let i = 0; i < infos.length; i++) {
          keyVals[infos[i].key] = infos[i].val;
        }
        let images = [];
        if (keyVals['traceability-minapp-intro-images'] != '') {
          images = JSON.parse(keyVals['traceability-minapp-intro-images']);
        }
        methods.setFieldsValue({
          intro: keyVals['traceability-minapp-intro'] ?? '',
          qrcode:
            keyVals['traceability-minapp-qrcode'] == ''
              ? []
              : [keyVals['traceability-minapp-qrcode']],
          images: images,
        });
        formData.intro = keyVals['traceability-minapp-intro-images'] ?? '';
        formData.images = images;
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
                    key: 'traceability-minapp-intro',
                    val: formData.intro,
                  },
                  {
                    key: 'traceability-minapp-qrcode',
                    val: formData.qrcode,
                  },
                  {
                    key: 'traceability-minapp-intro-images',
                    val: JSON.stringify(formData.images),
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
