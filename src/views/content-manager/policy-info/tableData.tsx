import { BasicColumn } from '/@/components/Table/src/types/table';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: '80px',
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: '320px',
    },
    {
      title: '状态',
      dataIndex: 'online_status',
      width: '80px',
      customRender: ({ record }) => {
        return h(
          Tag,
          {
            color: record?.status == 'DOWN' ? 'red' : 'green',
          },
          record?.status == 'DOWN' ? '下线' : '上线',
        );
      },
    },
    {
      title: '创建时间',
      width: '150px',
      dataIndex: 'created_at',
    },
  ];
}
