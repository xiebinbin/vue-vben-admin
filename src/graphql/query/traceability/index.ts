import farmer from './farmer';
import plotLand from './plot-land';
import processingCompany from './processing-company';
import materialGQL from './material';
import saleProductGQL from './sale-product';
export default {
  ...farmer,
  ...plotLand,
  ...processingCompany,
  ...materialGQL,
  ...saleProductGQL,
};
