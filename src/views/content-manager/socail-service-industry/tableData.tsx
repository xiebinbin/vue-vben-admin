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
      width: 260,
    },
    {
      title: '标记',
      dataIndex: 'tag',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'status',
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
      width: '200px',
      dataIndex: 'created_at',
    },
  ];
}
