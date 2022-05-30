import { BasicColumn } from '/@/components/Table/src/types/table';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 350,
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'created_at',
    },
  ];
}
