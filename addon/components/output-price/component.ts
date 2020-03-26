import BaseOutput from "../BaseOutput";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import FieldInformationService from "ember-field-components/services/field-information";

export default class OutputTextComponent extends BaseOutput {
  @service fieldInformation!: FieldInformationService;

  type = "price";
  currency!: string;
  precision!: number;

  @computed("fieldInformation.defaultCurrency", "currency")
  get currencyComputed(): string {
    if (this.currency) {
      return this.currency;
    } else {
      return this.fieldInformation.defaultCurrency;
    }
  }

  @computed("options.minimumDigits")
  get minimumDigits(): number | undefined {
    if (this.options.minimumDigits) {
      return this.options.minimumDigits;
    }

    return;
  }
}
