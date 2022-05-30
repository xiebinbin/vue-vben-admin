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
  import { defineComponent, ref, getCurrentInstance, reactive, h, onMounted } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { uploadApi } from '/@/api/sys/upload';
  import gql from '/@/graphql/index';
  import { useRoute } from 'vue-router';
  import { Tinymce } from '/@/components/Tinymce/index';

  const itemId = ref<any>(null);
  const inputData = reactive({
    name: '',
    cover: '',
    desc: '',
    content: '',
    sort: 10,
    processing_company_id: null,
    remark: '',
    status: 'DOWN',
    images: [],
  });
  const processingCompanyAllParams = reactive({
    q: '',
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
      field: 'processing_company_id',
      component: 'ApiSelect',
      label: '加工企业',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入名称',
          showSearch: true,
          onSearch: (value) => {
            processingCompanyAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityProcessingCompanyAllGQL,
                  variables: {
                    input: {
                      ...processingCompanyAllParams,
                    },
                  },
                })
                .then((rep) => {
                  resolve(rep.data.traceability_processing_company_all);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: processingCompanyAllParams.q,
          },
          onChange: (val: any) => {
            inputData.processing_company_id = val;
          },
          labelField: 'name',
          valueField: 'id',
          defaultValue: inputData.processing_company_id,
          filterOption: false,
        };
      },
    },
    {
      field: 'cover',
      component: 'Upload',
      label: '封面',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          multiple: false,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              inputData.cover = fileList[0];
            } else {
              inputData.cover = '';
            }
          },
          defaultValue: [inputData.cover],
        };
      },
    },
    {
      field: 'images',
      component: 'Upload',
      label: '图片列表(限4张 300*300)',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          multiple: true,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              inputData.images = fileList;
            } else {
              inputData.images = [];
            }
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
      field: 'remark',
      component: 'InputTextArea',
      label: '备注',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.remark = e.target.value;
          },
          defaultValue: inputData.remark,
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
            inputData.content = value;
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
      const [register, methods] = useForm();

      instance.value = getCurrentInstance();
      const handleReset = () => {
        inputData.name = '';
        inputData.cover = '';
        inputData.desc = '';
        inputData.sort = 10;
        inputData.remark = '';
        inputData.content = '';
        inputData.images = [];
        inputData.status = 'DOWN';
        inputData.processing_company_id = null;
        methods.setFieldsValue({
          name: '',
          cover: '',
          desc: '',
          images: [],
          content: '',
          sort: 10,
          processing_company_id: null,
          remark: '',
          status: 'DOWN',
        });
        processingCompanyAllParams.q = '';
        methods.clearValidate();
      };
      const $route = useRoute();
      itemId.value = $route.query?.id;
      if (!!itemId.value) {
        onMounted(async () => {
          const data = await getCurrentInstance()?.proxy?.$apollo?.query({
            query: gql.contentManagerProductGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.common_product;
          console.log(data);
          methods.setFieldsValue({
            name: info.name,
            cover: !!info.cover ? [info.cover] : [],
            desc: info.desc,
            images: info.images,
            sort: info.sort,
            content: info.content,
            processing_company_id: info?.processing_company?.id,
            remark: info.remark,
            status: info.status,
          });
          inputData.name = info.name;
          inputData.cover = info.cover;
          inputData.content = info.content;
          inputData.desc = info.desc;
          inputData.sort = info.sort;
          inputData.remark = info.remark;
          inputData.images = info.images;
          inputData.status = info.status;
          inputData.processing_company_id = info?.processing_company?.id;
          processingCompanyAllParams.q = info?.processing_company.name;
        });
      }
      pageTitle.value = !!itemId.value ? '编辑深加工产品' : '新增深加工产品';
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerProductUpdateGQL,
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
                mutation: gql.contentManagerProductAddGQL,
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
