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
      title: '品类',
      dataIndex: 'category.name',
      width: '200px',
      customRender: ({ record }) => `${record?.category.name}(${record?.category.unit})`,
    },
    {
      title: '批次',
      dataIndex: 'batch',
      width: '200px',
    },
    {
      title: '入库数量',
      dataIndex: 'number',
      width: '200px',
    },
    {
      title: '入库余量',
      dataIndex: 'residual',
      width: '200px',
    },
    {
      title: '入库时间',
      width: '200px',
      dataIndex: 'created_at',
    },
    {
      title: '更新时间',
      width: '200px',
      dataIndex: 'updated_at',
    },
  ];
}
