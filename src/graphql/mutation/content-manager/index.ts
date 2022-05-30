import industryArticle from './industry-article';
import product from './product';
import commonSettingUpdateMultiple from './update-setting.gql';
import socialServiceIndustry from './social-service-industry';
import policyCover from './policy-cover';
import policyInfo from './policy-info';
import article from './article';
import shopProduct from './shop-product';
import restaurant from './restaurant';
import video from './video';
import landPlanning from './land-planning';
import economicBenefit from './economic-benefit';
import fixedAsset from './fixed-asset';
import maintenanceRecord from './maintenance-record';
export default {
  ...industryArticle,
  commonSettingUpdateMultiple,
  ...product,
  ...socialServiceIndustry,
  ...policyCover,
  ...policyInfo,
  ...article,
  ...shopProduct,
  ...video,
  ...restaurant,
  ...landPlanning,
  ...economicBenefit,
  ...fixedAsset,
  ...maintenanceRecord,
};
