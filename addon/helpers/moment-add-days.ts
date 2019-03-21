import Helper from '@ember/component/helper';
import moment from 'moment';
import { isBlank } from '@ember/utils';

export default class MomentAddDaysHelper extends Helper {
  compute([value, days, format]){
    if (isBlank(value)) {
      return null;
    }

    if (isBlank(format)) {
      return moment(value).add(days, 'days').format();
    } else {
      return moment(value).add(days, 'days').format(format);
    }
  }
}
