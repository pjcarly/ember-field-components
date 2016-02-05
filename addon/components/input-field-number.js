import Ember from 'ember';
import NumberFieldComponent from '../mixins/component-field-number';
import FieldInputComponent from '../mixins/component-field-input-super';

export default Ember.Component.extend(NumberFieldComponent, FieldInputComponent, {
  prefix: null,
  suffix: null,

  hasPrefix: Ember.computed('prefix', function() {
    var prefix = this.get('prefix');

    return !Ember.isBlank(prefix);
  }),
  hasSuffix: Ember.computed('suffix', function() {
    var suffix = this.get('suffix');

    return !Ember.isBlank(suffix);
  }),

  step: Ember.computed('fieldOptions', function() {
    var fieldOptions = this.get('fieldOptions');
    var step = 1;
    if (fieldOptions.hasOwnProperty('step')) {
      step = fieldOptions.step;
    }
    return step;
  }),
  formatGetter: function(value) {
    if (!Ember.isEmpty(value) && !isNaN(value)) {
      return numeral(value).format(this.get('numberFormat'));
    }
    return null;
  },
  formatSetter: function(value) {
    if (!Ember.isEmpty(value)) {
      var number = numeral().unformat(value);
      if (isNaN(number)) {
        return value;
      } else {
        return number;
      }
    }
    return null;
  },
  actions: {
    increment: function() {
      var field = this.get('field');
      var model = this.get('model');
      var value = model.get(field);
      if (Ember.isBlank(value)) {
        value = 0;
      }
      var step = this.get('step');

      var decimalValue = new Decimal(value);
      model.set(field, decimalValue.plus(step).toNumber());
      this.notifyPropertyChange('model');
    },
    decrement: function() {
      var field = this.get('field');
      var model = this.get('model');
      var value = model.get(field);
      if (Ember.isBlank(value)) {
        value = 0;
      }
      var step = this.get('step');

      var decimalValue = new Decimal(value);
      model.set(field, decimalValue.minus(step).toNumber());
      this.notifyPropertyChange('model');
    }
  }
});