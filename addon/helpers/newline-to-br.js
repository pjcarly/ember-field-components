import Ember from 'ember';

const { Helper } = Ember;
const { isBlank } = Ember;
const { String } = Ember;
const { htmlSafe } = String;

export default Helper.extend({
  compute([value]) {
    if (isBlank(value)) {
      return null;
    }
    return htmlSafe(value.replace(/\n/g, '<br>'));
  }
});
