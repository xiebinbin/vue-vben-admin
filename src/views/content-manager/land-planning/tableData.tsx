import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: '80px',
    },
    {
      title: '项目',
      dataIndex: 'project',
      width: '200px',
      customRender: ({ record }) => `${record?.project}`,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: '80px',
    },
    {
      title: '创建时间',
      width: '150px',
      dataIndex: 'created_at',
    },
  ];
}
