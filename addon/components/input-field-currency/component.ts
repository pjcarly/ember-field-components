import InputFieldSelectComponent from "../input-field-select/component";
import SelectOption from 'ember-field-components/interfaces/SelectOption';
import { computed } from "@ember-decorators/object";

export default class InputFieldCurrencyComponent extends InputFieldSelectComponent {
  @computed('fieldInformation.availableCurrencies')
  get selectOptions() : SelectOption[] {
    const selectOptions : SelectOption[] = [];

    for(const availableCurrency of this.fieldInformation.availableCurrencies) {
      const selectOption : SelectOption = {
        value: availableCurrency,
        label: availableCurrency
      }

      selectOptions.push(selectOption);
    }

    return selectOptions;
  }
}
