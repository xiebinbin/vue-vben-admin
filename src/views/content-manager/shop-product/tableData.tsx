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
      title: '名称',
      dataIndex: 'name',
      width: '200px',
      customRender: ({ record }) => `${record?.name}`,
    },
    {
      title: '生产企业',
      dataIndex: 'company',
      width: '200px',
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
