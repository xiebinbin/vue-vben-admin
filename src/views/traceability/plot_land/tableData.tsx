import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '80px',
    },
    {
      title: '名称',
      dataIndex: 'title',
      width: '200px',
    },
    {
      title: '创建时间',
      width: '150px',
      dataIndex: 'created_at',
    },
  ];
}
