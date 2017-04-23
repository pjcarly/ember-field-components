import Ember from 'ember';

const { Helper, isBlank } = Ember;
const { SafeString } = Ember.Handlebars;

export default Helper.extend({
  compute([value]) {
    if (isBlank(value)) {
      return null;
    }
    return new SafeString(value.replace(/\n/g, '<br>'));
  }
});
