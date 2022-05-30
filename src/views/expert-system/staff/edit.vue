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
  import { defineComponent, ref, reactive, h, getCurrentInstance, onMounted } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { uploadApi } from '/@/api/sys/upload';
  import gql from '/@/graphql/index';
  import { Tinymce } from '/@/components/Tinymce/index';
  const formData = reactive({
    name: '',
    content: '',
    job_title: '',
    work_unit: '',
    avatar: '',
    expertise: '',
    expert_system_staff_category_id: null,
  });
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
          formData.name = e.target.value;
        },
        defaultValue: formData.name,
      },
    },
    {
      field: 'expert_system_staff_category_id',
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
              formData.avatar = fileList[0];
            } else {
              formData.avatar = '';
            }
          },
          defaultValue: formData.avatar == '' ? [formData.avatar] : [],
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
            formData.job_title = e.target.value;
          },
          defaultValue: formData.job_title,
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
            formData.job_title = e.target.value;
          },
          defaultValue: formData.job_title,
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
            formData.expertise = e.target.value;
          },
          defaultValue: formData.expertise,
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
          field: 'expert_system_staff_category_id',
          component: 'Select',
          label: '专家分类',
          colProps: {
            span: 12,
          },
          componentProps: {
            placeholder: '请选择',
            onChange: (val: any) => {
              console.log(val);
              formData.expert_system_staff_category_id = val;
            },
            options,
            defaultValue: formData.expert_system_staff_category_id,
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
        formData.name = '';
        formData.avatar = '';
        formData.job_title = '';
        formData.work_unit = '';
        formData.expertise = '';
        formData.expert_system_staff_category_id = null;
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
            expert_system_staff_category_id: info?.expert_system_staff_category?.id,
          });
          formData.name = info.name;
          formData.avatar = info.avatar;
          formData.job_title = info.job_title;
          formData.work_unit = info.work_unit;
          formData.expertise = info.expertise;
          formData.expert_system_staff_category_id = info?.expert_system_staff_category_id?.id;
        });
        pageTitle.value = '编辑专家';
      } else {
        pageTitle.value = '新增专家';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.updateStaffGQL,
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
                mutation: gql.addStaffGQL,
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
