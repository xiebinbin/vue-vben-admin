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
  import { useRoute } from 'vue-router';

  const itemId = ref<any>(null);
  const inputData = reactive({
    project: '',
    location: '',
    size: '',
    land_use_indicators: '',
    land_source: '',
    control_indicators: '',
    land_nature: '',
    sort: 10,
  });
  const pageTitle = ref<string>('用户规划-编辑');
  const instance = ref<any>(null);
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'project',
      component: 'Input',
      label: '建设项目',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.project = e.target.value;
          },
          defaultValue: inputData.project,
        };
      },
    },
    {
      field: 'location',
      component: 'Input',
      label: '项目位置',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.location = e.target.value;
          },
          defaultValue: inputData.location,
        };
      },
    },
    {
      field: 'size',
      component: 'Input',
      label: '占地规模',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.size = e.target.value;
          },
          defaultValue: inputData.size,
        };
      },
    },
    {
      field: 'land_use_indicators',
      component: 'Input',
      label: '配套建设用地指标',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.land_use_indicators = e.target.value;
          },
          defaultValue: inputData.land_use_indicators,
        };
      },
    },
    {
      field: 'land_source',
      component: 'Input',
      label: '用地来源',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.land_source = e.target.value;
          },
          defaultValue: inputData.land_source,
        };
      },
    },
    {
      field: 'control_indicators',
      component: 'Input',
      label: '建设控制指标',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.control_indicators = e.target.value;
          },
          defaultValue: inputData.control_indicators,
        };
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
          inputData.sort = val;
        },
        defaultValue: inputData.sort,
      },
    },
    {
      field: 'land_nature',
      component: 'Input',
      label: '区域用土地性质',
      required: false,
      colProps: {
        span: 24,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入',
          onChange: (e: any) => {
            inputData.land_nature = e.target.value;
          },
          defaultValue: inputData.land_nature,
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
        inputData.project = '';
        inputData.location = '';
        inputData.size = '';
        inputData.land_use_indicators = '';
        inputData.land_source = '';
        inputData.control_indicators = '';
        inputData.land_nature = '';
        inputData.sort = 10;
        methods.setFieldsValue({
          project: '',
          location: '',
          size: '',
          land_use_indicators: '',
          land_source: '',
          control_indicators: '',
          land_nature: '',
          sort: 10,
        });
        methods.clearValidate();
      };
      const $route = useRoute();
      itemId.value = $route.query?.id;
      if (!!itemId.value) {
        onMounted(async () => {
          const data = await getCurrentInstance()?.proxy?.$apollo?.query({
            query: gql.contentManagerLandPlanningGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.common_land_planning;
          methods.setFieldsValue({
            project: info?.project,
            location: info?.location,
            size: info?.size,
            land_use_indicators: info?.land_use_indicators,
            land_source: info?.land_source,
            control_indicators: info?.control_indicators,
            land_nature: info?.land_nature,
            sort: info?.sort,
          });
          inputData.project = info?.project;
          inputData.location = info?.location;
          inputData.size = info?.size;
          inputData.land_use_indicators = info?.land_use_indicators;
          inputData.land_source = info?.land_source;
          inputData.control_indicators = info?.control_indicators;
          inputData.land_nature = info?.land_nature;
          inputData.sort = info?.sort;
        });
      }
      pageTitle.value = !!itemId.value ? '编辑用地规划' : '新增用地规划';
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance.value?.proxy?.$apollo
              ?.mutate({
                mutation: gql.contentManagerLandPlanningUpdateGQL,
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
                mutation: gql.contentManagerLandPlanningAddGQL,
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
