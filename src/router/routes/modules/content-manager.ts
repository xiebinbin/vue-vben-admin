import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
const contentManager: AppRouteModule = {
  path: '/shop-product',
  name: 'shop-product',
  component: LAYOUT,
  redirect: '/shop-product/index',
  meta: {
    orderNo: 6,
    icon: 'ant-design:inbox-outlined',
    title: '电商平台',
    roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
  },
  children: [
    {
      path: 'index',
      name: 'ShopProductIndex',
      component: () => import('/@/views/content-manager/shop-product/index.vue'),
      meta: {
        title: '商品列表',
      },
    },
    {
      path: 'edit',
      name: 'ShopProductEdit',
      component: () => import('/@/views/content-manager/shop-product/edit.vue'),
      meta: {
        title: '商品-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
  ],
};

export default contentManager;
