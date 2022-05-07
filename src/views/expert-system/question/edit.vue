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
  import { defineComponent, ref, getCurrentInstance, onMounted, h } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { Tinymce } from '/@/components/Tinymce/index';
  import gql from '/@/graphql/index';
  const title = ref<string>('');
  const answer = ref<string>('');
  const contactName = ref<string>('');
  const contact = ref<string>('');
  const content = ref<string>('');
  const onlineStatus = ref(0);
  const staffId = ref<any>(null);
  const itemId = ref<any>(null);
  const pageTitle = ref<string>('留言管理');
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
      componentProps: {
        placeholder: '请输入内容',
        onChange: (e: any) => {
          title.value = e.target.value;
        },
        defaultValue: title.value,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '联系人',
      required: true,
      colProps: {
        span: 18,
      },
      componentProps: {
        placeholder: '请输入内容',
        onChange: (e: any) => {
          contactName.value = e.target.value;
        },
        defaultValue: contactName.value,
      },
    },
    {
      field: 'contact',
      component: 'Input',
      label: '联系方式',
      required: true,
      colProps: {
        span: 18,
      },
      componentProps: {
        placeholder: '请输入内容',
        onChange: (e: any) => {
          contact.value = e.target.value;
        },
        defaultValue: contact.value,
      },
    },
    {
      field: 'staff_id',
      component: 'Select',
      label: '专家',
      rules: [{ required: true }],
      colProps: {
        span: 16,
      },
      componentProps: ({}) => {
        return {
          placeholder: '请选择',
          onChange: (val: any) => {
            staffId.value = val;
          },
          options: [],
        };
      },
    },
    {
      field: 'online_status',
      component: 'Switch',
      label: '状态',
      colProps: {
        span: 18,
      },
      componentProps: {
        checkedValue: 1,
        unCheckedValue: 0,
        checkedChildren: '上线',
        unCheckedChildren: '下线',
        onChange: (val: any) => {
          onlineStatus.value = val;
        },
        defaultValue: onlineStatus.value,
      },
    },
    {
      field: 'content',
      component: 'Input',
      label: '内容',
      colProps: {
        span: 18,
      },
      required: true,
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
            content.value = value;
          },
        });
      },
    },
    {
      field: 'answer',
      component: 'Input',
      label: '答案',
      colProps: {
        span: 18,
      },
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
            answer.value = value;
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
        // 加载专家
        let staffOptions: any = [];
        const staffData = await instance?.proxy?.$apollo?.query({
          query: gql.staffsGQL,
        });
        const staffItems = staffData?.data.expert_system_staffs;
        for (let index = 0; index < staffItems.length; index++) {
          const item = staffItems[index];
          staffOptions.push({
            label: item.name,
            value: item.id,
            key: item.id,
          });
        }
        methods.updateSchema([
          {
            field: 'staff_id',
            component: 'Select',
            label: '专家',
            colProps: {
              span: 16,
            },
            componentProps: ({}) => {
              return {
                placeholder: '请选择',
                onChange: (val: any) => {
                  staffId.value = val;
                },
                options: staffOptions,
                defaultValue: staffId.value,
              };
            },
          },
        ]);
      });
      const handleReset = () => {
        title.value = '';
        content.value = '';
        answer.value = '';
        contact.value = '';
        contactName.value = '';
        onlineStatus.value = 0;
        staffId.value = null;
        methods.setFieldsValue({
          title: '',
          name: '',
          contact: '',
          content: '',
          answer: '',
          staff_id: 0,
          online_status: 0,
        });
        methods.clearValidate();
      };
      const query = instance?.proxy?.$route?.query;
      itemId.value = query?.id || null;
      if (!!itemId.value) {
        // 加載老的數據
        onMounted(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.ExpertSystemQuestionGQL,
            variables: {
              id: itemId.value,
            },
          });
          const info = data?.data?.expert_system_question;
          methods.setFieldsValue({
            title: info.title,
            content: info.content,
            answer: info.answer,
            name: info.name,
            contact: info.contact,
            staff_id: info.expert_system_staff.id,
            online_status: info.online_status,
          });
          title.value = info.title;
          content.value = info.content;
          answer.value = info.answer;
          contactName.value = info.name;
          contact.value = info.contact;
          staffId.value = info.expert_system_staff?.id;
          onlineStatus.value = info.online_status;
        });
        pageTitle.value = '编辑留言';
      } else {
        pageTitle.value = '新增留言';
      }
      return {
        schemas,
        handleReset,
        handleSubmit: () => {
          if (!!itemId.value) {
            // 更新
            instance?.proxy?.$apollo
              ?.mutate({
                mutation: gql.updateExpertSystemQuestionGQL,
                variables: {
                  id: itemId.value,
                  input: {
                    title: title.value,
                    content: content.value,
                    answer: answer.value,
                    name: contactName.value,
                    contact: contact.value,
                    expert_system_staff_id: staffId.value,
                    online_status: onlineStatus.value,
                  },
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
                mutation: gql.addExpertSystemQuestionGQL,
                variables: {
                  input: {
                    title: title.value,
                    content: content.value,
                    answer: answer.value,
                    name: contactName.value,
                    contact: contact.value,
                    expert_system_staff_id: staffId.value,
                    online_status: onlineStatus.value,
                  },
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
