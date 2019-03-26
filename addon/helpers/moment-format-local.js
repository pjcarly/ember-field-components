import Helper from '@ember/component/helper';
import moment from 'moment';
import { isBlank } from '@ember/utils';

export default Helper.extend({
  compute([value, format]){
    if (isBlank(value)) {
      return null;
    }

    const momentObject = moment.parseZone(value);
    const formattedValues = isBlank(format) ? momentObject.format() : momentObject.format(format);

    return formattedValues;
  }
});
