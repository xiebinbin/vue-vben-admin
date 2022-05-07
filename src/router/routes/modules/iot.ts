import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const iframe: AppRouteModule = {
  path: '/iot-system',
  name: 'iot-system',
  component: LAYOUT,
  redirect: '/iot-system/soil-moisture',
  meta: {
    orderNo: 1000,
    icon: 'ion:tv-outline',
    title: '物联网',
  },

  children: [
    {
      path: 'soil-moisture',
      name: 'IotSoilMoisture',
      component: () => import('/@/views/iot-system/soil-moisture/index.vue'),
      meta: {
        icon: 'ion:tv-outline',
        title: '土壤墒情',
      },
    },
    {
      path: 'water-level',
      name: 'IotWaterLevel',
      component: () => import('/@/views/iot-system/water-level/index.vue'),
      meta: {
        icon: 'ion:tv-outline',
        title: '水位监测',
      },
    },
    {
      path: 'shuifei',
      name: 'IotShuiFei',
      component: () => import('/@/views/iot-system/shuifei/index.vue'),
      meta: {
        icon: 'ion:tv-outline',
        title: '水肥一体',
      },
    },
  ],
};

export default iframe;
