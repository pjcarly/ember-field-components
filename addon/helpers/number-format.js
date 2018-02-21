import Ember from 'ember';

const { Helper } = Ember;
const { isBlank } = Ember;

export default Helper.extend({
  compute([value, locale, options]){
    if (isBlank(value)) {
      return null;
    }

    if(isBlank(locale)) {
      return new Intl.NumberFormat(options).format(value);
    }

    return new Intl.NumberFormat(locale, options).format(value)
  }
});
