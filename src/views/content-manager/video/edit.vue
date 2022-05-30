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
  import { defineComponent, ref, getCurrentInstance, reactive, onMounted } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  import { uploadApi } from '/@/api/sys/upload';
  import { useRoute } from 'vue-router';

  const itemId = ref<any>(null);
  const inputData = reactive({
    name: '',
    play_url: '',
    sort: 10,
    status: 'DOWN',
    cover: '',
  });

  const pageTitle = ref<string>('视频');
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
      field: 'cover',
      component: 'Upload',
      label: '封面(350*230)',
      colProps: {
        span: 24,
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
          defaultValue: !!inputData.cover ? [inputData.cover] : [],
        };
      },
    },
    {
      field: 'play_url',
      component: 'Input',
      label: '播放地址',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.play_url = e.target.value;
          },
          defaultValue: inputData.play_url,
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
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const [register, methods] = useForm();

      instance.value = getCurrentInstance();
      const handleReset = () => {
        inputData.name = '';
        inputData.play_url = '';
        inputData.cover = '';
        inputData.sort = 10;
        inputData.status = 'DOWN';
        methods.setFieldsValue({
          name: '',
          play_url: '',
          sort: 10,
          status: 'DOWN',
          cover: '',
        });
        methods.clearValidate();
      };
      const $route = useRoute();
      itemId.value = $route.query?.id;
      if (!!itemId.value) {
        onMounted(async () => {
          const data = await getCurrentInstance()?.proxy?.$apollo?.query({
            query: gql.contentManagerVideoGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.common_video;
          methods.setFieldsValue({
            name: info.name,
            play_url: info.play_url,
            sort: info.sort,
            status: info.status,
            cover: !!info.cover ? [info.cover] : [],
          });
          inputData.name = info.name;
          inputData.play_url = info.play_url;
          inputData.sort = info.sort;
          inputData.status = info.status;
          inputData.cover = info.cover;
        });
      }
      pageTitle.value = !!itemId.value ? '编辑视频' : '新增视频';
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerVideoUpdateGQL,
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
                mutation: gql.contentManagerVideoAddGQL,
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
