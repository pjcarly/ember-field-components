/* global moment */
import Ember from 'ember';

const { Helper } = Ember;
const { isBlank } = Ember;

export default Helper.extend({
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
});
