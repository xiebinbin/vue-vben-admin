import farmerGQL from './farmer';
import plotLandGQL from './plot-land';
import processingCompanyGQL from './processing-company';
import materialGQL from './material';
import saleProductGQL from './sale-product';
export default {
  ...farmerGQL,
  ...plotLandGQL,
  ...processingCompanyGQL,
  ...materialGQL,
  ...saleProductGQL,
};
