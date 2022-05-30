import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const iframe: AppRouteModule = {
  path: '/iot-system',
  name: 'iot-system',
  component: LAYOUT,
  redirect: '/iot-system/industry-overview/edit',
  meta: {
    orderNo: 1,
    icon: 'ion:tv-outline',
    title: '物联网',
  },

  children: [
    {
      path: 'industry-overview/edit',
      name: 'IndustryOverviewEdit',
      component: () => import('/@/views/content-manager/industry-overview/edit.vue'),
      meta: {
        orderNo: 15,
        title: '基本信息',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'soil-moisture',
      name: 'IotSoilMoisture',
      component: () => import('/@/views/iot-system/soil-moisture/index.vue'),
      meta: {
        title: '土壤墒情',
      },
    },
    {
      path: 'water-level',
      name: 'IotWaterLevel',
      component: () => import('/@/views/iot-system/water-level/index.vue'),
      meta: {
        title: '水位监测',
      },
    },
    {
      path: 'shuifei',
      name: 'IotShuiFei',
      component: LAYOUT,
      redirect: 'worming-system/pic-data',
      meta: {
        orderNo: 1000,
        title: '水肥一体',
      },
      children: [
        {
          path: 'intro',
          name: 'IotShuiFeiIntro',
          component: () => import('/@/views/iot-system/shuifei-intro/edit.vue'),
          meta: {
            orderNo: 15,
            title: '简介',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'index',
          name: 'IotShuiFeiIndex',
          component: () => import('/@/views/iot-system/shuifei/index.vue'),
          meta: {
            orderNo: 15,
            title: '控制台',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
      ],
    },
    {
      path: 'worming-system',
      name: 'worming-system',
      component: LAYOUT,
      redirect: 'worming-system/pic-data',
      meta: {
        orderNo: 1000,
        title: '虫情',
      },
      children: [
        {
          path: 'intro',
          name: 'IotWormingIntro',
          component: () => import('/@/views/worming/intro/edit.vue'),
          meta: {
            orderNo: 15,
            title: '简介',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'pic-data',
          name: 'IotWormingPicData',
          component: () => import('/@/views/worming/pic-data/index.vue'),
          meta: {
            orderNo: 15,
            title: '性诱测报仪',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
      ],
    },
  ],
};

export default iframe;
