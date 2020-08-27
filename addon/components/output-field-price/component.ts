import OutputFieldComponent from "../output-field/component";
import FieldInformationService from "ember-field-components/services/field-information";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";
import { inject as service } from "@ember/service";

export default class OutputFieldPriceComponent extends OutputFieldComponent {
  @service fieldInformation!: FieldInformationService;

  @computed("model.currency", "fieldInformation.defaultCurrency")
  get currency(): string {
    const modelCurrency = <string>this.model
      // @ts-ignore
      .get("currency");
    const availableCurrencies = this.fieldInformation.availableCurrencies;

    if (
      isBlank(modelCurrency) ||
      !availableCurrencies.includes(modelCurrency)
    ) {
      return this.fieldInformation.defaultCurrency;
    } else {
      return modelCurrency;
    }
  }
}
