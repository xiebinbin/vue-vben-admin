import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '80px',
    },
    {
      title: '分類名',
      dataIndex: 'name',
      width: '280px',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
  ];
}
