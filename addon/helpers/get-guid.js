import Ember from 'ember';

export default Ember.Helper.helper(function([object]) {
  if (Ember.isBlank(object)) {
    return object;
  } else {
    return Ember.guidFor(object);
  }
});