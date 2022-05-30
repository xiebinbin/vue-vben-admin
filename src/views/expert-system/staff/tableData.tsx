import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '80px',
    },
    {
      title: '上传头像',
      dataIndex: 'avatar',
      width: '80px',
      customRender: ({ record }) => {
        const avatar: string = record?.avatar ? record?.avatar : '';
        return h(
          'span',
          {
            class: avatar == '' ? 'text-pink-600' : 'text-green-600',
          },
          avatar == '' ? '否' : '是',
        );
      },
    },
    {
      title: '专家分类',
      dataIndex: 'expert_system_staff_category.name',
      width: '180px',
      customRender: ({ record }) => h('span', {}, record?.expert_system_staff_category?.name),
    },
    {
      title: '专家名',
      dataIndex: 'name',
      width: '120px',
    },
    {
      title: '职称',
      dataIndex: 'job_title',
      width: '180px',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
  ];
}
