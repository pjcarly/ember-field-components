import Helper from '@ember/component/helper';
import moment from 'moment';
import { isBlank } from '@ember/utils';

export default class MomentFormatHelper extends Helper {
  compute([value, format]){
    if (isBlank(value)) {
      return null;
    }

    if (isBlank(format)) {
      return moment(value).format();
    } else {
      return moment(value).format(format);
    }
  }
}
