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
  import { defineComponent, ref, getCurrentInstance, onMounted, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { uploadApi } from '/@/api/sys/upload';
  import gql from '/@/graphql/index';
  const inputData = reactive({
    name: '',
    organization_code_certificate: '',
    remark: '',
    certificate_images: [],
  });
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('加工企业');
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
      field: 'organization_code_certificate',
      component: 'Input',
      label: '组织机构代码证',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.organization_code_certificate = e.target.value;
          },
          defaultValue: inputData.organization_code_certificate,
        };
      },
    },
    {
      field: 'certificate_images',
      component: 'Upload',
      label: '证书图片',
      colProps: {
        span: 12,
      },
      componentProps: ({}) => {
        return {
          multiple: true,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              inputData.certificate_images = fileList;
            } else {
              inputData.certificate_images = [];
            }
          },
          defaultValue: inputData.certificate_images,
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
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const instance = getCurrentInstance();
      const [register, methods] = useForm();
      const handleReset = () => {
        inputData.name = '';
        inputData.organization_code_certificate = '';
        inputData.remark = '';
        inputData.certificate_images = [];
        methods.setFieldsValue({
          name: '',
          organization_code_certificate: '',
          remark: '',
          certificate_images: [],
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.traceabilityProcessingCompanyGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_processing_company;
          methods.setFieldsValue({
            name: info.name,
            organization_code_certificate: info.organization_code_certificate,
            certificate_images: info.certificate_images,
            remark: info.remark,
          });
          inputData.name = info.name;
          inputData.organization_code_certificate = info.organization_code_certificate;
          inputData.certificate_images = info.certificate_images;
          inputData.remark = info.remark;
        });
        pageTitle.value = '编辑加工企业';
      } else {
        pageTitle.value = '新增加工企业';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityProcessingCompanyUpdateGQL,
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
            // 新增
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityProcessingCompanyAddGQL,
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
