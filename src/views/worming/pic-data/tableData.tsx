import { BasicColumn } from '/@/components/Table/src/types/table';
import dayjs from 'dayjs';
import { h } from 'vue';
import { Image } from 'ant-design-vue';
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
      title: '标记',
      dataIndex: 'tag',
      width: 100,
    },
    {
      title: '图片',
      dataIndex: 'pic_url',
      width: 100,
      customRender: ({ record }) => <Image width="200" src={record?.pic_url}></Image>,
    },
  ];
}
