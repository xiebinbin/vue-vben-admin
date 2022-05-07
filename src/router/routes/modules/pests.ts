import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
const iot: AppRouteModule = {
  path: '/pests',
  name: 'pests',
  component: LAYOUT,
  redirect: 'pests',
  meta: {
    orderNo: 15,
    icon: 'ion:key-outline',
    title: '虫情监控',
    roles: [RoleEnum.SUPER, RoleEnum.ADMINISTRATOR],
  },
  children: [],
};

export default iot;
