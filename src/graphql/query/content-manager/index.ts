import industryArticle from './industry-article';
import commonSettingQueryMultiple from './query-setting.gql';
import product from './product';
import socialServiceIndustry from './social-service-industry';
import policyCover from './policy-cover';
import policyInfo from './policy-info';
import mapArticle from './map-article';
export default {
  ...industryArticle,
  commonSettingQueryMultiple,
  ...product,
  ...socialServiceIndustry,
  ...policyCover,
  ...policyInfo,
  ...mapArticle,
};
