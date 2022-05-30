import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  if (/(expert-system|iot-system|traceability|shop-product|industry|meilin)/.test(mod.name)) {
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  }
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

export const ExpertSystemRoute: AppRouteRecordRaw = {
  path: '/expert-system/home',
  name: 'expertSystemHome',
  component: () => import('/@/views/web/expert-system/index.vue'),
  meta: {
    title: '果梅专家',
  },
};

export const MapNavigationRoute: AppRouteRecordRaw = {
  path: '/map-navigation/home',
  name: 'MapNavigationHome',
  component: () => import('/@/views/web/map-navigation/index.vue'),
  meta: {
    title: '产业园区一览',
  },
};

export const TraceabilityRoute: AppRouteRecordRaw = {
  path: '/traceability/home',
  name: 'traceabilityHome',
  component: () => import('/@/views/web/traceability/index.vue'),
  meta: {
    title: '溯源',
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  ExpertSystemRoute,
  MapNavigationRoute,
  TraceabilityRoute,
];
