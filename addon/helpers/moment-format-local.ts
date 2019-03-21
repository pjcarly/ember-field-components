import Helper from '@ember/component/helper';
import moment from 'moment';
import { isBlank } from '@ember/utils';

export default class MomentFormatLocalHelper extends Helper {
  compute([value, format]: [Date, string]) {
    if (isBlank(value)) {
      return null;
    }

    const momentObject = moment.parseZone(value);
    const formattedValues = isBlank(format) ? momentObject.format() : momentObject.format(format);

    return formattedValues;
  }
}
