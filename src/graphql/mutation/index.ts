import auth from './auth/index';
import expertSystem from './expert-system/index';
import iotSystem from './iot-system/index';
import traceability from './traceability/index';
import contentManager from './content-manager/index';

export default {
  ...auth,
  ...expertSystem,
  ...iotSystem,
  ...traceability,
  ...contentManager,
};
