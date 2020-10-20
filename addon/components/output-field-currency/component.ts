import OutputFieldSelectComponent from "../output-field-select/component";
import SelectOption from "@getflights/ember-field-components/interfaces/SelectOption";
import { inject as service } from "@ember/service";

export default class OutputFieldCurrencyComponent extends OutputFieldSelectComponent {
  @service fieldInformation!: any;

  get selectOptions(): SelectOption[] {
    const selectOptions: SelectOption[] = [];
    const availableCurrencies = this.fieldInformation.availableCurrencies;

    for (const availableCurrency of availableCurrencies) {
      const selectOption: SelectOption = {
        value: availableCurrency,
        label: availableCurrency,
      };

      selectOptions.push(selectOption);
    }

    return selectOptions;
  }
}
