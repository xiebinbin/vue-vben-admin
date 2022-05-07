import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';

const iframe: AppRouteModule = {
  path: '/worming-system',
  name: 'worming-system',
  component: LAYOUT,
  redirect: '/worming-system/pic-data',
  meta: {
    orderNo: 1000,
    icon: 'ion:tv-outline',
    title: '虫情',
  },

  children: [
    {
      path: 'pic-data',
      name: 'IotWormingPicData',
      component: () => import('/@/views/worming/pic-data/index.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '性诱测报仪',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
  ],
};

export default iframe;
