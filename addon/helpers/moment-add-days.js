/* global moment */
import Ember from 'ember';

const { Helper } = Ember;
const { isBlank } = Ember;

export default Helper.extend({
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
});
