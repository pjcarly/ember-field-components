import Helper from '@ember/component/helper';
import { isBlank } from '@ember/utils';

export default Helper.extend({
  compute([value, locale, options]){
    if (isBlank(value)) {
      return null;
    }

    if(isBlank(locale)) {
      return new Intl.NumberFormat(options).format(value);
    }

    return new Intl.NumberFormat(locale, options).format(value)
  }
});
