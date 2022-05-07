import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 80,
    },
    {
      title: '分類名',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '创建时间',
      width: 100,
      dataIndex: 'created_at',
    },
  ];
}
