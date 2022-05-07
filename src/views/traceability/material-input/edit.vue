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
  interface InputItem {
    cover: String;
    number: Number;
    remark: String;
    category_id: Number | null;
  }
  const inputData = reactive<InputItem>({
    cover: '',
    number: 0,
    remark: '',
    category_id: null,
  });
  const materialCategoryAllParams = reactive({
    q: '',
  });
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('物资品类');
  const instance = ref<any>(null);
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'category_id',
      component: 'ApiSelect',
      label: '品类',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入名称',
          showSearch: true,
          onSearch: (value) => {
            materialCategoryAllParams.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.traceabilityMaterialCategoryAllGQL,
                  variables: {
                    input: {
                      ...materialCategoryAllParams,
                    },
                  },
                })
                .then((rep) => {
                  resolve(rep.data.traceability_material_category_all);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: materialCategoryAllParams.q,
          },
          onChange: (val: any) => {
            inputData.category_id = val;
          },
          labelField: 'name',
          valueField: 'id',
          defaultValue: inputData.category_id,
          filterOption: false,
        };
      },
    },
    {
      field: 'cover',
      component: 'Upload',
      label: '照片',
      colProps: {
        span: 12,
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
      field: 'number',
      component: 'InputNumber',
      label: '数量',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (val: any) => {
            inputData.number = val;
          },
          defaultValue: inputData.number,
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
      instance.value = getCurrentInstance();
      const [register, methods] = useForm();
      const handleReset = () => {
        inputData.cover = '';
        inputData.number = 0;
        inputData.remark = '';
        inputData.category_id = null;
        methods.setFieldsValue({
          name: '',
          cover: '',
          number: 0,
          category_id: null,
          remark: '',
        });
        materialCategoryAllParams.q = '';
        methods.clearValidate();
      };
      const query = instance?.value?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.value?.proxy?.$apollo?.query({
            query: gql.traceabilityMaterialInputGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.traceability_material_input;
          methods.setFieldsValue({
            cover: info.cover,
            remark: info.remark,
            category_id: info?.category.id,
            number: info.number,
          });
          inputData.cover = info.cover;
          inputData.remark = info.remark;
          inputData.category_id = info?.category.id;
          inputData.number = info.number;
          materialCategoryAllParams.q = info?.category.name;
        });
        pageTitle.value = '编辑物资入库';
      } else {
        pageTitle.value = '新增物资入库';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityMaterialInputUpdateGQL,
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
            instance?.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.traceabilityMaterialInputAddGQL,
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
