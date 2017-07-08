/* global moment */
import Ember from 'ember';

const { Helper, isBlank } = Ember;

export default Helper.extend({
  compute([value, days, format]){
    console.log(days);
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
