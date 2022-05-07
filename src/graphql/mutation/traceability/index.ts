import farmerGQL from './farmer';
import plotLandGQL from './plot-land';
import processingCompanyGQL from './processing-company';
import materialCategoryGQL from './material-category';
import materialInputGQL from './material-input';
import materialOutputGQL from './material-output';
import productGQL from './product';
import productInputGQL from './product-input';
import productOutputGQL from './product-output';
export default {
  ...farmerGQL,
  ...plotLandGQL,
  ...processingCompanyGQL,
  ...materialCategoryGQL,
  ...materialInputGQL,
  ...materialOutputGQL,
  ...productGQL,
  ...productInputGQL,
  ...productOutputGQL,
};
