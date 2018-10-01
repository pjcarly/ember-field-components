import Ember from 'ember';
import FieldOutputComponent from '../../mixins/component-field-output-super';

import Component from '@ember/component';
import { computed } from '@ember/object';

import { inject as service } from '@ember/service';

export default Component.extend(FieldOutputComponent, {
  fieldSettings: service(),
  selectOptions: computed('fieldSettings.availableCurrencies', 'value', function() {
    let selectOptions = [];

    const availableCurrencies = this.get('fieldSettings.availableCurrencies');
    availableCurrencies.forEach((currency) => {
      const selectOption = {
        'value': currency,
        'label': currency
      };

      selectOptions.push(selectOption);
    });

    return selectOptions;
  }),
  none: computed(function(){
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.none;
  })
});
