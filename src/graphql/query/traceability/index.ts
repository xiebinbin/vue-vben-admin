import farmer from './farmer';
import plotLand from './plot-land';
import processingCompany from './processing-company';
import materialCategoryGQL from './material-category';
import materialInputGQL from './material-input';
import materialOutputGQL from './material-output';
import productGQL from './product';
import productInputGQL from './product-input';
import productOutputGQL from './product-output';
export default {
  ...farmer,
  ...plotLand,
  ...processingCompany,
  ...materialCategoryGQL,
  ...materialInputGQL,
  ...materialOutputGQL,
  ...productGQL,
  ...productInputGQL,
  ...productOutputGQL,
};
