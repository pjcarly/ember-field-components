import InputField from "../input-field/component";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";

export default class InputFieldPercentComponent extends InputField {
  @computed("model.currency", "fieldInformation.defaultCurrency")
  get currency() {
    const modelCurrency = <string>this.model
      // @ts-ignore
      .get("currency");
    const availableCurrencies = this.fieldInformation.get(
      "availableCurrencies"
    );

    if (
      isBlank(modelCurrency) ||
      !availableCurrencies.includes(modelCurrency)
    ) {
      return this.fieldInformation.get("defaultCurrency");
    } else {
      return modelCurrency;
    }
  }
}
