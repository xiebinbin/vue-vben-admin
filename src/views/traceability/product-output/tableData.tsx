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
      title: '产品品类',
      dataIndex: 'product_input',
      width: '200px',
      customRender: ({ record }) => `${record?.product_input.product.name}`,
    },
    {
      title: '地块',
      dataIndex: 'plot_land',
      width: '200px',
      customRender: ({ record }) => `${record?.product_input.plot_land.title}`,
    },
    {
      title: '加工企业',
      dataIndex: 'processing_company',
      width: '200px',
      customRender: ({ record }) => `${record?.processing_company.name}`,
    },
    {
      title: '批次',
      dataIndex: 'product_input.batch',
      width: '200px',
      customRender: ({ record }) => `${record?.product_input.batch}`,
    },
    {
      title: '出库数量',
      dataIndex: 'number',
      width: '200px',
      customRender: ({ record }) => `${record?.number} ${record?.unit}`,
    },
    {
      title: '出库时间',
      width: '200px',
      dataIndex: 'created_at',
    },
  ];
}
