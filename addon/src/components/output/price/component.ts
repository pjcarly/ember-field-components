import BaseOutput, { Arguments } from "../../BaseOutput";
import { inject as service } from "@ember/service";
import FieldInformationService from "../../../services/field-information";

export interface PriceArguments extends Arguments {
  currency: string;
  precision: number;
}

export default class OutputPriceComponent extends BaseOutput<PriceArguments> {
  @service fieldInformation!: FieldInformationService;

  type = "price";

  get currencyComputed(): string {
    if (this.args.currency) {
      return this.args.currency;
    } else {
      return this.fieldInformation.defaultCurrency;
    }
  }
}
