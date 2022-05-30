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
  const pageTitle = ref<string>('地址位置管理');
  const formData = reactive({
    title: '',
    desc: '',
    tag: '',
    cover: '',
    sort: 0,
    images: [],
    status: 'DOWN',
    content: '',
    is_marker: 'YES',
    is_recommend: 'YES',
    left: 0,
    top: 0,
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
              label: '清漪江康养示范区',
              value: '清漪江康养示范区',
            },
            {
              label: '平通区域',
              value: '平通区域',
            },
            {
              label: '印象梅林',
              value: '印象梅林',
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
        span: 8,
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
      field: 'is_recommend',
      component: 'Switch',
      label: '推荐',
      colProps: {
        span: 8,
      },
      componentProps: {
        checkedValue: 'YES',
        unCheckedValue: 'NO',
        checkedChildren: '是',
        unCheckedChildren: '否',
        onChange: (val: any) => {
          formData.is_recommend = val;
        },
        defaultValue: formData.is_recommend,
      },
    },
    {
      field: 'is_marker',
      component: 'Switch',
      label: '锚点',
      colProps: {
        span: 8,
      },
      componentProps: {
        checkedValue: 'YES',
        unCheckedValue: 'NO',
        checkedChildren: '是',
        unCheckedChildren: '否',
        onChange: (val: any) => {
          formData.is_marker = val;
        },
        defaultValue: formData.is_marker,
      },
    },
    {
      field: 'top',
      component: 'InputNumber',
      label: '锚点 top距离',
      colProps: {
        span: 9,
      },
      componentProps: {
        onChange: (val: any) => {
          formData.top = val;
        },
        defaultValue: formData.top,
      },
    },
    {
      field: 'left',
      component: 'InputNumber',
      label: '锚点 left距离',
      colProps: {
        span: 9,
      },
      componentProps: {
        onChange: (val: any) => {
          formData.left = val;
        },
        defaultValue: formData.left,
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
      label: '封面(350*233)',
      colProps: {
        span: 24,
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
      field: 'images',
      component: 'Upload',
      label: '图片列表-限6张(400*267)',
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
      const instance = getCurrentInstance();
      const [register, methods] = useForm();
      const handleReset = () => {
        formData.title = '';
        formData.sort = 10;
        formData.desc = '';
        formData.tag = '';
        formData.content = '';
        formData.images = [];
        formData.cover = '';
        formData.status = 'DOWN';
        formData.top = 0;
        formData.left = 0;
        formData.is_marker = 'YES';
        formData.is_recommend = 'YES';
        methods.setFieldsValue({
          title: '',
          desc: '',
          tag: '',
          images: [],
          content: '',
          sort: 10,
          cover: '',
          status: 0,
          left: 0,
          top: 0,
          is_marker: 'YES',
          is_recommend: 'YES',
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      onMounted(() => {
        handleReset();
      });
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
            images: info.images,
            left: info.left,
            top: info.top,
            is_marker: info.is_marker,
            is_recommend: info.is_recommend,
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
          formData.images = info.images;
          formData.tag = info.tag;
          formData.top = info.top;
          formData.left = info.left;
          formData.is_marker = info.is_marker;
          formData.is_recommend = info.is_recommend;
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
