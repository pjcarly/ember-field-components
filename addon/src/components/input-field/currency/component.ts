import InputFieldSelectComponent from "../select/component";
import SelectOption from "../../../interfaces/SelectOption";

export default class InputFieldCurrencyComponent extends InputFieldSelectComponent {
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
