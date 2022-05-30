import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
const iot: AppRouteModule = {
  path: '/traceability',
  name: 'traceability',
  component: LAYOUT,
  redirect: 'traceability',
  meta: {
    orderNo: 4,
    icon: 'ant-design:safety-certificate-outlined',
    title: '溯源系统',
    roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
  },
  children: [
    {
      path: 'farmer/index',
      name: 'traceabilityFarmerIndex',
      component: () => import('/@/views/traceability/farmer/index.vue'),
      meta: {
        orderNo: 15,
        title: '农户管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'farmer/edit',
      name: 'traceabilityFarmerEdit',
      component: () => import('/@/views/traceability/farmer/edit.vue'),
      meta: {
        title: '农户管理-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'plot-land/index',
      name: 'traceabilityPlotLandIndex',
      component: () => import('/@/views/traceability/plot_land/index.vue'),
      meta: {
        orderNo: 15,
        title: '地块管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'plot-land/edit',
      name: 'traceabilitPlotLandEdit',
      component: () => import('/@/views/traceability/plot_land/edit.vue'),
      meta: {
        title: '地块管理-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'processing-company/index',
      name: 'traceabilityProcessingCompanyIndex',
      component: () => import('/@/views/traceability/processing-company/index.vue'),
      meta: {
        orderNo: 15,
        title: '加工企业',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'processing-company/edit',
      name: 'traceabilitProcessingCompanyEdit',
      component: () => import('/@/views/traceability/processing-company/edit.vue'),
      meta: {
        title: '加工企业-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'material/index',
      name: 'traceabilityMaterialIndex',
      component: () => import('/@/views/traceability/material/index.vue'),
      meta: {
        orderNo: 15,
        title: '物资管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'material/edit',
      name: 'traceabilityMaterialEdit',
      component: () => import('/@/views/traceability/material/edit.vue'),
      meta: {
        title: '物资管理-编辑',
        hideMenu: true,
        hideBreadcrumb: true,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'sale-product/index',
      name: 'traceabilitySaleProductIndex',
      component: () => import('/@/views/traceability/sale-product/index.vue'),
      meta: {
        orderNo: 15,
        title: '销售管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'sale-product/edit',
      name: 'traceabilitySaleProductEdit',
      component: () => import('/@/views/traceability/sale-product/edit.vue'),
      meta: {
        title: '销售记录-编辑',
        hideMenu: true,
        hideBreadcrumb: false,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'minapp/edit',
      name: 'traceabilityMinappEdit',
      component: () => import('/@/views/traceability/minapp/edit.vue'),
      meta: {
        title: '小程序',
        hideMenu: false,
        hideBreadcrumb: false,
        hideTab: false,
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
    },
  ],
};

export default iot;
