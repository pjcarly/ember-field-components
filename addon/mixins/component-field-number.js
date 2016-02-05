import Ember from 'ember';
import {
  appendWithZeroes
}
from '../classes/utils';

export default Ember.Mixin.create({
  field: null,
  subfield: null,
  model: null,
  link: null,
  inline: false,
  prefix: null,
  suffix: null,

  hasPrefix: Ember.computed('prefix', 'value', function() {
    var prefix = this.get('prefix');

    return !Ember.isBlank(prefix) && !Ember.isBlank(this.get('value'));
  }),

  hasSuffix: Ember.computed('suffix', 'value', function() {
    var suffix = this.get('suffix');

    return !Ember.isBlank(suffix) && !Ember.isBlank(this.get('value'));
  }),

  numberFormat: Ember.computed('model', 'field', function() {
    var numberFormat = this.get('settings.numberFormat');
    var fieldOptions = this.get('fieldOptions');

    if (fieldOptions.decimals > 0) {
      numberFormat += '.';
      numberFormat = appendWithZeroes(numberFormat, fieldOptions.decimals);
    }

    return numberFormat;
  })
});