import Ember from 'ember';

export default Ember.Helper.extend({
  compute([value]) {
    if (Ember.isBlank(value)) {
      return null;
    }
    return new Ember.Handlebars.SafeString(value.replace(/\n/g, '<br>'));
  }
});
