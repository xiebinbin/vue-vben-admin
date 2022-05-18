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
  import { Tinymce } from '/@/components/Tinymce/index';
  import gql from '/@/graphql/index';
  import { uploadApi } from '/@/api/sys/upload';
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('地址位置管理');
  const formData = reactive({
    title: '',
    desc: '',
    tag: '',
    cover: '',
    sort: 0,
    status: 'DOWN',
    content: '',
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
      field: 'tag',
      component: 'Select',
      label: '标记',
      required: true,
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (val: any) => {
            formData.tag = val;
          },
          options: [
            {
              label: '清漪江示范区',
              value: '清漪江示范区',
            },
            {
              label: '印象梅园',
              value: '印象梅园',
            },
          ],
          defaultValue: formData.tag,
        };
      },
    },
    {
      field: 'status',
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
          formData.status = val == 1 ? 'UP' : 'DOWN';
        },
        defaultValue: formData.status == 'UP' ? 1 : 0,
      },
    },
    {
      field: 'sort',
      component: 'InputNumber',
      label: '排序',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (val: any) => {
          formData.sort = val;
        },
        defaultValue: formData.sort,
      },
    },
    {
      field: 'cover',
      component: 'Upload',
      label: '封面(300*300)',
      colProps: {
        span: 12,
      },
      componentProps: ({}) => {
        return {
          multiple: false,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              formData.cover = fileList[0];
            } else {
              formData.cover = '';
            }
          },
          defaultValue: !!formData.cover ? [formData.cover] : [],
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
            formData.desc = e?.target?.value;
          },
          defaultValue: formData.desc,
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
            formData.content = value;
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
        formData.title = '';
        formData.sort = 10;
        formData.desc = '';
        formData.tag = '';
        formData.content = '';
        formData.cover = '';
        formData.status = 'DOWN';
        methods.setFieldsValue({
          title: '',
          desc: '',
          tag: '',
          content: '',
          sort: 10,
          cover: '',
          status: 0,
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.contentManagerMapArticleGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.big_data_map_article;
          methods.setFieldsValue({
            title: info.title,
            desc: info.desc,
            sort: info.sort,
            tag: info.tag,
            content: info.content,
            cover: !!info.cover ? [info.cover] : [],
            status: info.status == 'UP' ? 1 : 0,
          });
          formData.title = info.title;
          formData.desc = info.desc;
          formData.sort = info.sort;
          formData.content = info.content;
          formData.cover = info.cover;
          formData.status = info.status;
          formData.tag = info.tag;
        });
        pageTitle.value = '编辑地理位置';
      } else {
        pageTitle.value = '新增地理位置';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerMapArticleUpdateGQL,
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
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerMapArticleAddGQL,
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
