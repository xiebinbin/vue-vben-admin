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
      title: '跳转链接',
      dataIndex: 'link',
      width: '200px',
    },
    {
      title: '创建时间',
      width: '200px',
      dataIndex: 'created_at',
    },
  ];
}
