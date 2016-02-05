import Ember from 'ember';

export default Ember.Helper.helper(function(params, hash) {
  if (Ember.isEmpty(hash.subfield)) {
    return Ember.get(hash.model, hash.field);
  } else {
    return Ember.get(Ember.get(hash.model, hash.field), hash.subfield);
  }
});