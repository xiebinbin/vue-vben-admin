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
  import { defineComponent, ref, getCurrentInstance, onMounted, h, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  import { uploadApi } from '/@/api/sys/upload';
  import { Tinymce } from '/@/components/Tinymce/index';
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('物资管理');
  const instance = ref<any>(null);
  const formData = reactive({
    title: '',
    fixed_asset_id: null,
    images: [],
    content: '',
  });
  const fixedAssetListQuery = reactive({
    limit: 10,
    page: 1,
    q: '',
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
      field: 'fixed_asset_id',
      component: 'ApiSelect',
      label: '关联设备',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入名称',
          showSearch: true,
          onSearch: (value) => {
            fixedAssetListQuery.q = value;
          },
          api: () => {
            return new Promise<void>((resolve, reject) => {
              instance.value?.proxy?.$apollo
                ?.query({
                  query: gql.fixedAssetListGQL,
                  variables: {
                    input: {
                      ...fixedAssetListQuery,
                    },
                  },
                })
                .then((rep) => {
                  const listData = rep?.data.fixed_asset_list;
                  resolve(listData.items);
                })
                .catch((err) => {
                  reject(err);
                  console.log(err);
                });
            });
          },
          params: {
            q: fixedAssetListQuery.q,
          },
          onChange: (val: any) => {
            formData.fixed_asset_id = val;
          },
          labelField: 'title',
          valueField: 'id',
          defaultValue: formData.fixed_asset_id,
          filterOption: false,
        };
      },
    },
    {
      field: 'images',
      component: 'Upload',
      label: '图片列表(限制4张300*300)',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          multiple: false,
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
            formData.content = value;
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
      instance.value = getCurrentInstance();
      const [register, methods] = useForm();
      const handleReset = () => {
        formData.title = '';
        formData.fixed_asset_id = null;
        formData.images = [];
        formData.content = '';
        methods.setFieldsValue({
          title: '',
          fixed_asset_id: null,
          images: [],
          content: '',
        });
        methods.clearValidate();
      };
      const query = instance.value?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance.value?.proxy?.$apollo?.query({
            query: gql.maintenanceRecordGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.maintenance_record;
          methods.setFieldsValue({
            title: info.title,
            fixed_asset_id: info.fixed_asset.id,
            images: info.images,
            content: info.content,
          });
          formData.fixed_asset_id = info.fixed_asset.id;
          fixedAssetListQuery.q = info.fixed_asset.title;
          formData.title = info.title;
          formData.images = info.images;
          formData.content = info.content;
        });
        pageTitle.value = '编辑记录';
      } else {
        pageTitle.value = '新增记录';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.maintenanceRecordUpdateGQL,
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
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.maintenanceRecordAddGQL,
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
