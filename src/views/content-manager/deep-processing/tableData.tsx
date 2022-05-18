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
      dataIndex: 'product_input',
      width: '200px',
      customRender: ({ record }) => `${record?.name}`,
    },
    {
      title: '加工企业',
      dataIndex: 'processing_company',
      width: '200px',
      customRender: ({ record }) => `${record?.processing_company.name}`,
    },
    {
      title: '创建时间',
      width: '200px',
      dataIndex: 'created_at',
    },
  ];
}
