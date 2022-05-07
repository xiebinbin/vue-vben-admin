import auth from './auth/index';
import expertSystem from './expert-system/index';
import iotSystem from './iot-system/index';
import wormingSystem from './worming-system/index';
import traceability from './traceability/index';

export default {
  ...auth,
  ...expertSystem,
  ...iotSystem,
  ...wormingSystem,
  ...traceability,
};
