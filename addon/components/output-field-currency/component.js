import Component from '@ember/component';
import FieldOutputComponent from '../../mixins/component-field-output-super';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend(FieldOutputComponent, {
  fieldInformation: service(),
  selectOptions: computed('fieldInformation.availableCurrencies', 'value', function() {
    let selectOptions = [];

    const availableCurrencies = this.get('fieldInformation.availableCurrencies');
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
