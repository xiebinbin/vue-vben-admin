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
  import { defineComponent, ref, getCurrentInstance, onMounted, reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  const pageTitle = ref<string>('产业发展简介');
  const formData = reactive({
    jkdw: '',
    cgqs: '',
    ygcl: '',
    ygcz: '',
    zzsl: '',
    ggsl: '',
    jdmj: '',
    zzmj: '',
  });

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'jkdw',
      component: 'Input',
      label: '监控点位',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (e: any) => {
          formData.jkdw = e.target.value;
        },
        defaultValue: formData.jkdw,
      },
    },
    {
      field: 'cgqs',
      component: 'Input',
      label: '传感器数',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (e?: any) => {
          formData.cgqs = e.target.value;
        },
        defaultValue: formData.cgqs,
      },
    },
    {
      field: 'ygcl',
      component: 'Input',
      label: '预估产量',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (e: any) => {
          formData.ygcl = e.target.value;
        },
        defaultValue: formData.ygcl,
      },
    },
    {
      field: 'ygcz',
      component: 'Input',
      label: '预估产值',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (e: any) => {
          formData.ygcz = e.target.value;
        },
        defaultValue: formData.ygcz,
      },
    },
    {
      field: 'zzsl',
      component: 'Input',
      label: '种植数量',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (e: any) => {
          formData.zzsl = e.target.value;
        },
        defaultValue: formData.zzsl,
      },
    },
    {
      field: 'ggsl',
      component: 'Input',
      label: '挂果数量',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (e: any) => {
          formData.ggsl = e.target.value;
        },
        defaultValue: formData.ggsl,
      },
    },
    {
      field: 'jdmj',
      component: 'Input',
      label: '基地面积',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (e: any) => {
          formData.jdmj = e.target.value;
        },
        defaultValue: formData.jdmj,
      },
    },
    {
      field: 'zzmj',
      component: 'Input',
      label: '种植面积',
      colProps: {
        span: 18,
      },
      componentProps: {
        onChange: (e: any) => {
          formData.zzmj = e.target.value;
        },
        defaultValue: formData.zzmj,
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
        formData.jkdw = '';
        formData.cgqs = '';
        formData.ygcl = '';
        formData.ygcz = '';
        formData.zzsl = '';
        formData.ggsl = '';
        formData.jdmj = '';
        formData.zzmj = '';
        methods.setFieldsValue({
          jkdw: '',
          cgqs: '',
          ygcl: '',
          ygcz: '',
          zzsl: '',
          ggsl: '',
          jdmj: '',
          zzmj: '',
        });
        methods.clearValidate();
      };
      onMounted(async () => {
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.commonSettingQueryMultiple,
          variables: {
            keys: [
              'industry-overview-jkdw',
              'industry-overview-cgqs',
              'industry-overview-ygcl',
              'industry-overview-ygcz',
              'industry-overview-zzsl',
              'industry-overview-ggsl',
              'industry-overview-jdmj',
              'industry-overview-zzmj',
            ],
          },
        });
        const infos = data?.data?.common_setting_query_multiple;
        const keyVals = {};
        for (let i = 0; i < infos.length; i++) {
          keyVals[infos[i].key] = infos[i].val;
        }

        formData.jkdw = keyVals['industry-overview-jkdw'];
        formData.cgqs = keyVals['industry-overview-cgqs'];
        formData.ygcl = keyVals['industry-overview-ygcl'];
        formData.ygcz = keyVals['industry-overview-ygcz'];
        formData.zzsl = keyVals['industry-overview-zzsl'];
        formData.ggsl = keyVals['industry-overview-ggsl'];
        formData.jdmj = keyVals['industry-overview-jdmj'];
        formData.zzmj = keyVals['industry-overview-zzmj'];
        methods.setFieldsValue({
          jkdw: keyVals['industry-overview-jkdw'],
          cgqs: keyVals['industry-overview-cgqs'],
          ygcl: keyVals['industry-overview-ygcl'],
          ygcz: keyVals['industry-overview-ygcz'],
          zzsl: keyVals['industry-overview-zzsl'],
          ggsl: keyVals['industry-overview-ggsl'],
          jdmj: keyVals['industry-overview-jdmj'],
          zzmj: keyVals['industry-overview-zzmj'],
        });
      });
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          console.log(formData);
          instance?.proxy?.$apollo
            ?.mutate({
              mutation: gql.commonSettingUpdateMultiple,
              variables: {
                items: [
                  {
                    key: 'industry-overview-jkdw',
                    val: formData.jkdw,
                  },
                  {
                    key: 'industry-overview-cgqs',
                    val: formData.cgqs,
                  },
                  {
                    key: 'industry-overview-ygcl',
                    val: formData.ygcl,
                  },
                  {
                    key: 'industry-overview-ygcz',
                    val: formData.ygcz,
                  },
                  {
                    key: 'industry-overview-zzsl',
                    val: formData.zzsl,
                  },
                  {
                    key: 'industry-overview-ggsl',
                    val: formData.ggsl,
                  },
                  {
                    key: 'industry-overview-jdmj',
                    val: formData.jdmj,
                  },
                  {
                    key: 'industry-overview-zzmj',
                    val: formData.zzmj,
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
