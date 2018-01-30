/* global moment */
import Ember from 'ember';

const { Helper } = Ember;
const { isBlank } = Ember;

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
