import { BasicColumn } from '/@/components/Table/src/types/table';
import dayjs from 'dayjs';
import { h } from 'vue';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 80,
    },
    {
      title: '采集时间',
      dataIndex: 'collection_at',
      width: 100,
      customRender: ({ record }) => h('span', dayjs(record?.collection_at).format('YYYY/MM/DD')),
    },
    {
      title: '传感器编号',
      dataIndex: 'device.code',
      width: 100,
      customRender: ({ record }) => h('span', record?.device?.code),
    },
    {
      title: 'ph值',
      dataIndex: 'ph_value',
      width: 100,
    },
    {
      title: '水位',
      dataIndex: 'liquid_level_value',
      width: 100,
      customRender: ({ record }) => h('span', record?.liquid_level_value + 'm'),
    },
  ];
}
