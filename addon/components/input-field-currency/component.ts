import InputFieldSelectComponent from "../input-field-select/component";
import SelectOption from "@getflights/ember-field-components/interfaces/SelectOption";
import { computed } from "@ember/object";

export default class InputFieldCurrencyComponent extends InputFieldSelectComponent {
  @computed("fieldInformation.availableCurrencies")
  get selectOptionsComputed(): SelectOption[] {
    const selectOptions: SelectOption[] = [];

    for (const availableCurrency of this.fieldInformation.availableCurrencies) {
      const selectOption: SelectOption = {
        value: availableCurrency,
        label: availableCurrency,
      };

      selectOptions.push(selectOption);
    }

    return selectOptions;
  }
}
