import Ember from 'ember';
import {
  appendWithZeroes
}
from '../classes/utils';

export default Ember.Mixin.create({
  value: null,
  prefix: null,
  suffix: null,
  decimals: 0,

  hasPrefix: Ember.computed('prefix', 'value', function() {
    let prefix = this.get('prefix');

    return !Ember.isBlank(prefix) && !Ember.isBlank(this.get('value'));
  }),

  hasSuffix: Ember.computed('suffix', 'value', function() {
    let suffix = this.get('suffix');

    return !Ember.isBlank(suffix) && !Ember.isBlank(this.get('value'));
  }),

  numberFormat: Ember.computed('decimals', 'field', function() {
    let numberFormat = this.get('settings.numberFormat');
    let decimals = this.get('decimals');

    if (decimals > 0) {
      numberFormat += '.';
      numberFormat = appendWithZeroes(numberFormat, decimals);
    }

    return numberFormat;
  })
});