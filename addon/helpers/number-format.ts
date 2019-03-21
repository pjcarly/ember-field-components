import Helper from '@ember/component/helper';
import { isBlank } from '@ember/utils';

export default class NumberFormatHelper extends Helper {
  compute([value, locale, options]: [number, string, any]){
    if (isBlank(value)) {
      return null;
    }

    if(isBlank(locale)) {
      return new Intl.NumberFormat(options).format(value);
    }

    return new Intl.NumberFormat(locale, options).format(value)
  }
}
