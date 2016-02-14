import Ember from 'ember';

export default Ember.Helper.helper(function([value, value2]) {
  return value === value2;
});
