import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
const expertSystem: AppRouteModule = {
  path: '/expert-system',
  name: 'expert-system',
  component: LAYOUT,
  redirect: 'expert-system',
  meta: {
    orderNo: 15,
    icon: 'ion:key-outline',
    title: '专家系统',
    roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
  },
  children: [
    {
      path: 'staff-category/index',
      name: 'StaffCategoryIndex',
      component: () => import('/@/views/expert-system/staff-category/index.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '专家分类',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'staff-category/edit',
      name: 'StaffCategoryEdit',
      component: () => import('/@/views/expert-system/staff-category/edit.vue'),
      meta: {
        title: '专家分类-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'staff/index',
      name: 'staff',
      component: () => import('/@/views/expert-system/staff/index.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '专家管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'staff/edit',
      name: 'StaffEdit',
      component: () => import('/@/views/expert-system/staff/edit.vue'),
      meta: {
        title: '专家-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'article-category/index',
      name: 'ArticleCategoryIndex',
      component: () => import('/@/views/expert-system/article-category/index.vue'),
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '知识分类',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
      children: [],
    },
    {
      path: 'article-category/edit',
      name: 'ArticleCategoryEdit',
      component: () => import('/@/views/expert-system/article-category/edit.vue'),
      meta: {
        title: '知识分类-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'article/index',
      name: 'articleIndex',
      component: () => import('/@/views/expert-system/article/index.vue'),
      meta: {
        icon: 'ion:key-outline',
        title: '知识管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'article/edit',
      name: 'articleEdit',
      component: () => import('/@/views/expert-system/article/edit.vue'),
      meta: {
        title: '知识-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'question/index',
      name: 'questionIndex',
      component: () => import('/@/views/expert-system/question/index.vue'),
      meta: {
        icon: 'ion:key-outline',
        title: '留言管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'question/edit',
      name: 'questionEdit',
      component: () => import('/@/views/expert-system/question/edit.vue'),
      meta: {
        title: '留言-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
  ],
};

export default expertSystem;
