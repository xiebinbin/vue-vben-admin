<template>
  <PageWrapper :title="pageTitle" contentFullHeight>
    <CollapseContainer title="基础信息">
      <BasicForm
        @register="register"
        autoFocusFirstItem
        :labelWidth="200"
        ref="form"
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
  import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { uploadApi } from '/@/api/sys/upload';
  import gql from '/@/graphql/index';
  const nickname = ref<string>('');
  const avatar = ref<string>('');
  const jobTitle = ref<string>('');
  const workUnit = ref<string>('');
  const expertise = ref<string>('');
  const categoryId = ref<any>(null);
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('知识分类');
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
    },
    {
      field: 'name',
      component: 'Input',
      label: '姓名',
      required: true,
      colProps: {
        span: 12,
      },
      componentProps: {
        placeholder: '请输入姓名',
        onChange: (e: any) => {
          nickname.value = e.target.value;
        },
      },
    },
    {
      field: 'staff_category_id',
      component: 'Select',
      label: '专家分类',
      colProps: {
        span: 12,
      },
      componentProps: {},
    },
    {
      field: 'avatar',
      component: 'Upload',
      label: '头像',
      colProps: {
        span: 12,
      },
      componentProps: ({}) => {
        return {
          multiple: false,
          api: uploadApi,
          onChange: (fileList: any) => {
            if (fileList.length > 0) {
              avatar.value = fileList[0];
            } else {
              avatar.value = '';
            }
          },
          defaultValue: [avatar.value],
        };
      },
    },
    {
      field: 'job_title',
      component: 'Input',
      label: '职称',
      colProps: {
        span: 12,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (e: any) => {
            jobTitle.value = e.target.value;
          },
          defaultValue: jobTitle.value,
        };
      },
    },
    {
      field: 'work_unit',
      component: 'Input',
      label: '工作单位',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (e: any) => {
            workUnit.value = e.target.value;
          },
          defaultValue: workUnit.value,
        };
      },
    },
    {
      field: 'expertise',
      component: 'InputTextArea',
      label: '专长',
      colProps: {
        span: 18,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请输入内容',
          onChange: (e: any) => {
            expertise.value = e.target.value;
          },
          defaultValue: expertise.value,
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
      onMounted(async () => {
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.staffCategoriesGQL,
        });

        const items = data?.data.expert_system_staff_categories;
        let options: any = [];
        for (let index = 0; index < items.length; index++) {
          const item = items[index];
          options.push({
            label: item.name,
            value: item.id,
            key: item.id,
          });
        }
        methods.updateSchema({
          field: 'staff_category_id',
          component: 'Select',
          label: '专家分类',
          colProps: {
            span: 12,
          },
          componentProps: {
            placeholder: '请选择',
            onChange: (val: any) => {
              console.log(val);
              categoryId.value = val;
            },
            options,
            defaultValue: '',
          },
        });
      });
      const handleReset = () => {
        methods.setFieldsValue({
          name: '',
          avatar: [],
          job_title: '',
          work_unit: '',
          expertise: '',
          staff_category_id: null,
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (query?.id) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.staffGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.expert_system_staff;
          methods.setFieldsValue({
            name: info.name,
            avatar: info.avatar ? [info.avatar] : [],
            job_title: info.job_title,
            work_unit: info.work_unit,
            expertise: info.expertise,
            staff_category_id: info?.expert_system_staff_category?.id,
          });
        });
        pageTitle.value = '编辑专家';
      } else {
        pageTitle.value = '新增专家';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: (values) => {
          let avatarUrl: string =
            !!values.avatar && values.avatar.length > 0 ? values.avatar[0] : '';
          const inputValue = {
            name: values?.name,
            avatar: avatarUrl,
            job_title: values?.job_title,
            work_unit: values?.work_unit,
            expertise: values?.expertise,
            expert_system_staff_category_id: values?.staff_category_id,
          };
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.updateStaffGQL,
                variables: {
                  id: itemId.value,
                  input: inputValue,
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
                mutation: gql.addStaffGQL,
                variables: {
                  input: inputValue,
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
