import OutputFieldSelectComponent from '../output-field-select/component';
import SelectOption from 'ember-field-components/interfaces/SelectOption';
import { computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

export default class OutputFieldCurrencyComponent extends OutputFieldSelectComponent {
  @service fieldInformation !: any;

  @computed('fieldInformation.availableCurrencies')
  get selectOptions() : SelectOption[] {
    const selectOptions : SelectOption[] = [];
    const availableCurrencies = this.fieldInformation.availableCurrencies;

    for(const availableCurrency of availableCurrencies) {
      const selectOption : SelectOption = {
        value: availableCurrency,
        label: availableCurrency
      }

      selectOptions.push(selectOption);
    }

    return selectOptions;
  }
}
