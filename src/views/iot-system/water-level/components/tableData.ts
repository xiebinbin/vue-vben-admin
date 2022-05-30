import { BasicColumn } from '/@/components/Table/src/types/table';
import dayjs from 'dayjs';
import { h } from 'vue';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '100px',
    },
    {
      title: 'ph值',
      dataIndex: 'ph_value',
      width: '120px',
    },
    {
      title: '水位',
      dataIndex: 'liquid_level_value',
      width: '120px',
      customRender: ({ record }) => h('span', record?.liquid_level_value + 'm'),
    },
    {
      title: '传感器编号',
      dataIndex: 'device.code',
      width: '300px',
      customRender: ({ record }) => h('span', record?.device?.code),
    },
    {
      title: '采集时间',
      dataIndex: 'collection_at',
      customRender: ({ record }) => h('span', dayjs(record?.collection_at).format('YYYY/MM/DD')),
    },
  ];
}
