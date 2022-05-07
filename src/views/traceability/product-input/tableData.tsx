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
      title: '批次',
      dataIndex: 'batch',
      width: '200px',
      customRender: ({ record }) => `${record?.batch}`,
    },
    {
      title: '数量',
      dataIndex: 'number+unit',
      width: '200px',
      customRender: ({ record }) => `${record?.number} ${record?.unit}`,
    },
    {
      title: '产品',
      dataIndex: 'product.name',
      width: '200px',
      customRender: ({ record }) => `${record?.product.name}`,
    },
    {
      title: '地块',
      dataIndex: 'plot_land',
      width: '200px',
      customRender: ({ record }) => `${record?.plot_land.name}(${record?.plot_land.code})`,
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
