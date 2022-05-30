import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
const contentManager: AppRouteModule = {
  path: '/industry',
  name: 'industry',
  component: LAYOUT,
  redirect: '/industry/industry-article/index',
  meta: {
    orderNo: 2,
    icon: 'ant-design:read-outlined',
    title: '产业讯息',
    roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
  },
  children: [
    {
      path: 'pingwu-intro/edit',
      name: 'PingWuIntroEdit',
      component: () => import('/@/views/content-manager/ping_wu-intro/edit.vue'),
      meta: {
        orderNo: 15,
        title: '平武产业简介',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'ping-tong-intro/edit',
      name: 'PingTongIntroEdit',
      component: () => import('/@/views/content-manager/ping_tong-intro/edit.vue'),
      meta: {
        orderNo: 15,
        title: '平通产业介绍',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'industry-article/index',
      name: 'IndustryArticleIndex',
      component: () => import('/@/views/content-manager/industry-article/index.vue'),
      meta: {
        orderNo: 15,
        title: '特色农产品',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'industry-article/edit',
      name: 'IndustryArticleEdit',
      component: () => import('/@/views/content-manager/industry-article/edit.vue'),
      meta: {
        title: '特色农产品-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'deep-processing/index',
      name: 'DeepProcessingIndex',
      component: () => import('/@/views/content-manager/deep-processing/index.vue'),
      meta: {
        orderNo: 15,
        title: '深加工产品',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'deep-processing/edit',
      name: 'DeepProcessingEdit',
      component: () => import('/@/views/content-manager/deep-processing/edit.vue'),
      meta: {
        title: '深加工产品-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'social-service-industry/index',
      name: 'SocialServiceIndustryIndex',
      component: () => import('/@/views/content-manager/socail-service-industry/index.vue'),
      meta: {
        orderNo: 15,
        title: '社会化服务',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'socail-service-industry/edit',
      name: 'SocialServiceIndustryEdit',
      component: () => import('/@/views/content-manager/socail-service-industry/edit.vue'),
      meta: {
        title: '社会化服务-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'policy-info/index',
      name: 'PolicyInfoIndex',
      component: () => import('/@/views/content-manager/policy-info/index.vue'),
      meta: {
        orderNo: 15,
        title: '政策资讯',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'policy-info/edit',
      name: 'PolicyInfoEdit',
      component: () => import('/@/views/content-manager/policy-info/edit.vue'),
      meta: {
        title: '政策资讯-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
  ],
};

export default contentManager;
