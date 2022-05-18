import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
const contentManager: AppRouteModule = {
  path: '/content-manager',
  name: 'content-manager',
  component: LAYOUT,
  redirect: '/content-manager/industry-article/index',
  meta: {
    orderNo: 15,
    icon: 'ion:key-outline',
    title: '内容管理',
    roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
  },
  children: [
    {
      path: 'industry-article/index',
      name: 'IndustryArticleIndex',
      component: () => import('/@/views/content-manager/industry-article/index.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '产业发展',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'industry-intro/edit',
      name: 'IndustryIntroEdit',
      component: () => import('/@/views/content-manager/industry-intro/edit.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '产业发展简介',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'industry-overview/edit',
      name: 'IndustryOverviewEdit',
      component: () => import('/@/views/content-manager/industry-overview/edit.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '产业概况',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'industry-article/edit',
      name: 'IndustryArticleEdit',
      component: () => import('/@/views/content-manager/industry-article/edit.vue'),
      meta: {
        title: '产业发展-编辑',
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
        icon: 'ion:key-outline',
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
        icon: 'ion:key-outline',
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
      path: 'policy-cover/index',
      name: 'PolicyCoverIndex',
      component: () => import('/@/views/content-manager/policy-cover/index.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '政策资讯轮播',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'policy-cover/edit',
      name: 'PolicyCoverEdit',
      component: () => import('/@/views/content-manager/policy-cover/edit.vue'),
      meta: {
        title: '政策资讯轮播-编辑',
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
        icon: 'ion:key-outline',
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
    {
      path: 'map-articles/index',
      name: 'MapArticlesIndex',
      component: () => import('/@/views/content-manager/map-articles/index.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '地理位置',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'map-articles/edit',
      name: 'MapArticlesEdit',
      component: () => import('/@/views/content-manager/map-articles/edit.vue'),
      meta: {
        title: '地理位置-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'map-index/edit',
      name: 'MapIndexEdit',
      component: () => import('/@/views/content-manager/map-index/edit.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '地理首页信息',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
  ],
};

export default contentManager;
