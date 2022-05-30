import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
const item: AppRouteModule = {
  path: '/meilin',
  name: 'meilin',
  component: LAYOUT,
  redirect: '/meilin/suo-jiang-intro/edit',
  meta: {
    orderNo: 5,
    icon: 'ant-design:code-sandbox-outlined',
    title: '农旅融合',
    roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
  },
  children: [
    {
      path: 'qing-yi-jiang/index',
      name: 'QingYiJiangIndex',
      redirect: '/meilin/qing-yi-jiang-intro/edit',
      meta: {
        orderNo: 15,
        title: '清漪江康养带',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
      children: [
        {
          path: 'qing-yi-jiang-intro/edit',
          name: 'QingYiJiangIntroEdit',
          component: () => import('/@/views/content-manager/qing_yi_jiang-intro/edit.vue'),
          meta: {
            orderNo: 15,
            title: '清漪江简介',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'suo-jiang-intro/edit',
          name: 'SuoJiangIntroEdit',
          component: () => import('/@/views/content-manager/suo_jiang-intro/edit.vue'),
          meta: {
            orderNo: 15,
            title: '锁江介绍',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'dou-kou-intro/edit',
          name: 'DouKouIntroEdit',
          component: () => import('/@/views/content-manager/dou_kou-intro/edit.vue'),
          meta: {
            orderNo: 15,
            title: '豆叩介绍',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
      ],
    },
    {
      path: 'ping-tong-area/edit',
      name: 'PingTongAreaIntroEdit',
      component: () => import('/@/views/content-manager/ping_tong_area-intro/edit.vue'),
      meta: {
        orderNo: 15,
        title: '平通区域简介',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'mei-lin-area/edit',
      name: 'MeiLinIntroEdit',
      component: () => import('/@/views/content-manager/mei_lin-intro/edit.vue'),
      meta: {
        orderNo: 15,
        title: '梅林简介',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'video/index',
      name: 'VideoIndex',
      component: () => import('/@/views/content-manager/video/index.vue'),
      meta: {
        orderNo: 15,
        title: '视频导览',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'video/edit',
      name: 'VideoEdit',
      component: () => import('/@/views/content-manager/video/edit.vue'),
      meta: {
        title: '视频导览-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'article',
      name: 'article',
      component: LAYOUT,
      redirect: 'index',
      meta: {
        orderNo: 15,
        title: '内容管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
      children: [
        {
          path: 'index',
          name: 'ArticleIndex',
          component: () => import('/@/views/content-manager/article/index.vue'),
          meta: {
            orderNo: 15,
            hideMenu: true,
            title: '文章列表',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'administrative-area/index',
          name: 'ArticleAdministrativeAreaIndex',
          component: LAYOUT,
          redirect: {
            name: 'ArticleIndex',
            query: {
              channel: '行政区域',
            },
          },
          meta: {
            orderNo: 15,
            title: '行政区域',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'administrative-area/edit',
          name: 'ArticleAdministrativeAreaEdit',
          component: () => import('/@/views/content-manager/article/edit/administrative-area.vue'),
          meta: {
            title: '行政区域-编辑',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'tourist-attraction/index',
          name: 'ArticleTouristAttractionIndex',
          component: LAYOUT,
          redirect: {
            name: 'ArticleIndex',
            query: {
              channel: '旅游景点',
            },
          },
          meta: {
            carryParam: true,
            orderNo: 15,
            title: '旅游景点',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'tourist-attraction/edit',
          name: 'ArticleTouristAttractionEdit',
          component: () => import('/@/views/content-manager/article/edit/tourist-attraction.vue'),
          meta: {
            title: '旅游景点-编辑',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'dining-accommodation/index',
          name: 'ArticleDiningAccommodationIndex',
          component: LAYOUT,
          redirect: {
            name: 'ArticleIndex',
            query: {
              channel: '餐饮住宿',
            },
          },
          meta: {
            orderNo: 15,
            title: '餐饮住宿',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'dining-accommodation/edit',
          name: 'ArticleDiningAccommodationEdit',
          component: () => import('/@/views/content-manager/article/edit/dining-accommodation.vue'),
          meta: {
            title: '餐饮住宿-编辑',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
      ],
    },
    {
      path: 'fixed-asset',
      name: 'FixedAsset',
      component: LAYOUT,
      meta: {
        orderNo: 15,
        title: '固定资产',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
      children: [
        {
          path: 'index',
          name: 'FixedAssetIndex',
          component: () => import('/@/views/content-manager/fixed-asset/index.vue'),
          meta: {
            orderNo: 15,
            title: '固定资产',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'edit',
          name: 'FixedAssetEdit',
          component: () => import('/@/views/content-manager/fixed-asset/edit.vue'),
          meta: {
            title: '固定资产-编辑',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'maintenance-record/index',
          name: 'MaintenanceRecordIndex',
          component: () => import('/@/views/content-manager/maintenance-record/index.vue'),
          meta: {
            orderNo: 15,
            title: '维保记录',
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'maintenance-record/edit',
          name: 'MaintenanceRecordEdit',
          component: () => import('/@/views/content-manager/maintenance-record/edit.vue'),
          meta: {
            title: '维保记录-编辑',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
      ],
    },
    {
      path: 'land-planning/index',
      name: 'LandPlanninIndex',
      component: () => import('/@/views/content-manager/land-planning/index.vue'),
      meta: {
        orderNo: 15,
        title: '用地规划',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'land-planning/edit',
      name: 'LandPlanningEdit',
      component: () => import('/@/views/content-manager/land-planning/edit.vue'),
      meta: {
        title: '用地规划-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'economic-benefit/edit',
      name: 'EconomicBenefitEdit',
      component: () => import('/@/views/content-manager/economic-benefit/edit.vue'),
      meta: {
        title: '经济效益',
        hideMenu: false,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
  ],
};

export default item;
