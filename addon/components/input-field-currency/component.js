import Ember from 'ember';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { hasWidget } from '../../classes/model-utils';

const { Component, computed, isBlank, inject } = Ember;
const { service } = inject;

export default Component.extend(FieldInputComponent, {
  fieldSettings: service(),
  selectOptions: computed('fieldSettings.availableCurrencies', 'value', function() {
    let selectOptions = [];

    const availableCurrencies = this.get('fieldSettings.availableCurrencies');
    for(const currency of availableCurrencies) {
      selectOption = {
        'value': currency,
        'label': currency
      };

      selectOptions.push(selectOption);
    }

    return selectOptions;
  }),
  isRequired: computed('fieldOptions', function(){
    const fieldOptions = this.get('fieldOptions');
    return (fieldOptions.hasOwnProperty('validation') && fieldOptions.validation.hasOwnProperty('required') && fieldOptions.validation.required) || this.get('required');
  }),
  isButtonGroup: computed(function() {
    const fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'button-group');
  }),
  isSelectSearch: computed(function() {
    const fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'select-search');
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
