import Ember from 'ember';
import FieldInputComponent from '../../mixins/component-field-input-super';

const { Component, computed, isBlank } = Ember;

export default Component.extend(FieldInputComponent, {
  selectOptions: computed('fieldOptions', 'value', function() {
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.selectOptions;
  }),
  isRequired: computed('fieldOptions', function(){
    const fieldOptions = this.get('fieldOptions');
    return (fieldOptions.hasOwnProperty('validation') && fieldOptions.validation.hasOwnProperty('required') && fieldOptions.validation.required) || this.get('required');
  }),
  none: computed(function(){
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.none;
  }),
  actions: {
    valueChanged(value) {
      if (!isBlank(value)) {
        this.set('value', value);
        this.sendAction('valueChanged', value);
      } else {
        this.set('value', null);
        this.sendAction('valueChanged', null);
      }
    }
  }
});
