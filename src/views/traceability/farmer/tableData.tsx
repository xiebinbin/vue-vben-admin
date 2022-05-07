import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: '20px',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '200px',
    },
    {
      title: '创建时间',
      width: '200px',
      dataIndex: 'created_at',
    },
  ];
}
