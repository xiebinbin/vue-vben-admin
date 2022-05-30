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
      title: '盐分',
      dataIndex: 'salinity_value',
      width: 100,
      customRender: ({ record }) => h('span', record?.salinity_value + 'mg/L'),
    },
    {
      title: '温度',
      dataIndex: 'temperature_value',
      width: 100,
      customRender: ({ record }) => h('span', record?.temperature_value + '℃'),
    },
    {
      title: '湿度',
      dataIndex: 'humidity_value',
      width: 100,
      customRender: ({ record }) => h('span', record?.humidity_value + '%'),
    },
  ];
}
