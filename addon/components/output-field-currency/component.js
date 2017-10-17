import Ember from 'ember';
import FieldOutputComponent from '../../mixins/component-field-output-super';

const { Component, computed, inject } = Ember;
const { service } = inject;

export default Component.extend(FieldOutputComponent, {
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
  none: computed(function(){
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.none;
  })
});
