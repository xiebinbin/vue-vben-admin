import industryArticle from './industry-article';
import product from './product';
import commonSettingUpdateMultiple from './update-setting.gql';
import socialServiceIndustry from './social-service-industry';
import policyCover from './policy-cover';
import policyInfo from './policy-info';
import mapArticle from './map-article';
export default {
  ...industryArticle,
  commonSettingUpdateMultiple,
  ...product,
  ...socialServiceIndustry,
  ...policyCover,
  ...policyInfo,
  ...mapArticle,
};
