import OutputFieldSelectComponent from "../select/component";
import SelectOption from "../../../interfaces/SelectOption";
import { inject as service } from "@ember/service";
import FieldInformationService from "../../../services/field-information";

export default class OutputFieldCurrencyComponent extends OutputFieldSelectComponent {
  @service declare fieldInformation: FieldInformationService;

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
