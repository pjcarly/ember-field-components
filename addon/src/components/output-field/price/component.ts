import OutputFieldComponent, {
  OutputFieldArguments,
} from "../../output-field/component";
import FieldInformationService from "../../../services/field-information";
import { inject as service } from "@ember/service";

export default class OutputFieldPriceComponent extends OutputFieldComponent<
  OutputFieldArguments
> {
  @service declare fieldInformation: FieldInformationService;

  get currency(): string {
    const modelCurrency = <string>// @ts-ignore
      this.args.model.currency;
    const availableCurrencies = this.fieldInformation.availableCurrencies;

    if (!modelCurrency || !availableCurrencies.includes(modelCurrency)) {
      return this.fieldInformation.defaultCurrency;
    } else {
      return modelCurrency;
    }
  }
}
