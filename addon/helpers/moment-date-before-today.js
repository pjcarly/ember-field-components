import Helper from '@ember/component/helper';
import moment from 'moment';
import { isBlank } from '@ember/utils';

export default Helper.extend({
  compute([value]){
    if (isBlank(value)) {
      return false;
    }

    const today = moment();
    return moment(value).isBefore(today);
  }
});
