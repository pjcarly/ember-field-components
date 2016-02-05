import Ember from 'ember';

export default Ember.Helper.helper(function([value]) {
  return Ember.isBlank(value);
});