import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
const iot: AppRouteModule = {
  path: '/traceability',
  name: 'traceability',
  component: LAYOUT,
  redirect: 'traceability',
  meta: {
    orderNo: 15,
    icon: 'ion:key-outline',
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
        icon: 'ion:key-outline',
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
        icon: 'ion:key-outline',
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
        icon: 'ion:key-outline',
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
      path: 'material',
      name: 'traceabilityProcessingCompany',
      redirect: 'category/index',
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '物资管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
      children: [
        {
          path: 'category/index',
          name: 'traceabilityMaterialCategoryIndex',
          component: () => import('/@/views/traceability/material-category/index.vue'),
          meta: {
            title: '物资品类',
            hideMenu: false,
            hideBreadcrumb: false,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'category/edit',
          name: 'traceabilityMaterialCategoryEdit',
          component: () => import('/@/views/traceability/material-category/edit.vue'),
          meta: {
            title: '物资品类-编辑',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'input/index',
          name: 'traceabilityMaterialInputIndex',
          component: () => import('/@/views/traceability/material-input/index.vue'),
          meta: {
            title: '物资入库',
            hideMenu: false,
            hideBreadcrumb: false,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'input/edit',
          name: 'traceabilityMaterialInputEdit',
          component: () => import('/@/views/traceability/material-input/edit.vue'),
          meta: {
            title: '物资入库-操作',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'output/index',
          name: 'traceabilityMaterialOutputIndex',
          component: () => import('/@/views/traceability/material-output/index.vue'),
          meta: {
            title: '物资出库',
            hideMenu: false,
            hideBreadcrumb: false,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'output/add',
          name: 'traceabilityMaterialOutputAdd',
          component: () => import('/@/views/traceability/material-output/edit.vue'),
          meta: {
            title: '物资出库-操作',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
      ],
    },
    {
      path: 'product',
      name: 'traceabilityProduct',
      redirect: 'main/index',
      meta: {
        orderNo: 15,
        icon: 'ion:key-outline',
        title: '收购管理',
        roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
      },
      children: [
        {
          path: 'main/index',
          name: 'traceabilityProductMainIndex',
          component: () => import('/@/views/traceability/product/index.vue'),
          meta: {
            title: '产品品类',
            hideMenu: false,
            hideBreadcrumb: false,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'main/edit',
          name: 'traceabilityProductMainEdit',
          component: () => import('/@/views/traceability/product/edit.vue'),
          meta: {
            title: '产品品类-编辑',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'input/index',
          name: 'traceabilityProductInputIndex',
          component: () => import('/@/views/traceability/product-input/index.vue'),
          meta: {
            title: '产品入库',
            hideMenu: false,
            hideBreadcrumb: false,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'input/edit',
          name: 'traceabilityProductInputEdit',
          component: () => import('/@/views/traceability/product-input/edit.vue'),
          meta: {
            title: '产品入库-操作',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'output/index',
          name: 'traceabilityProductOutputIndex',
          component: () => import('/@/views/traceability/product-output/index.vue'),
          meta: {
            title: '产品出库',
            hideMenu: false,
            hideBreadcrumb: false,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'output/add',
          name: 'traceabilityProductOutputAdd',
          component: () => import('/@/views/traceability/product-output/edit.vue'),
          meta: {
            title: '产品出库-操作',
            hideMenu: true,
            hideBreadcrumb: true,
            hideTab: false,
            roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
          },
        },
      ],
    },
  ],
};

export default iot;
