import Ember from 'ember';

export default Ember.Helper.helper(function([value]) {
  if (Ember.isBlank(value)) {
    return null;
  }
  return new Ember.Handlebars.SafeString(value.replace(/\n/g, '<br>'));
});