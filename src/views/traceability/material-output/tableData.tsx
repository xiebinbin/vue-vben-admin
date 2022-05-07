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
      dataIndex: 'material_input',
      width: '200px',
      customRender: ({ record }) =>
        `${record?.material_input.category.name}(${record?.material_input.category.unit})`,
    },
    {
      title: '批次',
      dataIndex: 'material_input.batch',
      width: '200px',
      customRender: ({ record }) => `${record?.material_input.batch}`,
    },
    {
      title: '出库数量',
      dataIndex: 'number',
      width: '200px',
    },
    {
      title: '出库时间',
      width: '200px',
      dataIndex: 'created_at',
    },
  ];
}
