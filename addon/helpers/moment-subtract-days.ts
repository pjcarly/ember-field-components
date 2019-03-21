import Helper from '@ember/component/helper';
import moment from 'moment';
import { isBlank } from '@ember/utils';

export default class MomentSubtractDaysHelper extends Helper {
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
}
