/* global moment */
import Ember from 'ember';

const { Helper } = Ember;
const { isBlank } = Ember;

export default Helper.extend({
  compute([value]){
    if (isBlank(value)) {
      return false;
    }

    const today = moment();
    return moment(value).isBefore(today);
  }
});
