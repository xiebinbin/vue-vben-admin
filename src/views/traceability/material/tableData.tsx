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
      title: '类型',
      dataIndex: 'category',
      width: '200px',
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: '200px',
    },
    {
      title: '更新时间',
      width: '150px',
      dataIndex: 'updated_at',
    },
  ];
}
