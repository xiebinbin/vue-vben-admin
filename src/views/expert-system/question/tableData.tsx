import { BasicColumn } from '/@/components/Table/src/types/table';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 100,
    },
    {
      title: '专家',
      dataIndex: 'expert_system_staff.name',
      width: 100,
      customRender: ({ record }) => h('span', record?.expert_system_staff?.name),
    },
    {
      title: '状态',
      dataIndex: 'online_status',
      width: 100,
      customRender: ({ record }) => {
        return h(
          Tag,
          {
            color: record?.online_status == 0 ? 'red' : 'green',
          },
          record?.online_status == 0 ? '下线' : '上线',
        );
      },
    },
    {
      title: '创建时间',
      width: 100,
      dataIndex: 'created_at',
    },
  ];
}
