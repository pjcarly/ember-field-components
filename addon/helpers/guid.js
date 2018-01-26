/* global moment */
import Ember from 'ember';
const { guidFor } = Ember;
const { Helper } = Ember;
const { isBlank } = Ember;

export default Helper.extend({
  compute([value]){
    if (isBlank(value)) {
      return null;
    }

    return guidFor(value);
  }
});
