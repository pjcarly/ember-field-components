/* global moment */
import Helper from '@ember/component/helper';
import { isBlank } from '@ember/utils';

export default Helper.extend({
  compute([value, days, format]){
    if (isBlank(value)) {
      return null;
    }

    if (isBlank(format)) {
      return moment(value).subtract(days, 'days').format();
    } else {
      return moment(value).subtract(days, 'days').format(format);
    }
  }
});
