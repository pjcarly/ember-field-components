import Ember from 'ember';
const { isArray } = Array;
const { Helper } = Ember;
const { isBlank } = Ember;

export default Helper.extend({
  compute([array, value]){
    if (isBlank(value) || !isArray(array)) {
      return false;
    }

    return array.indexOf(value) !== -1;
  }
});
