import InputField, { InputFieldArguments } from "../input-field/component";

export default class InputFieldPercentComponent extends InputField<
  InputFieldArguments
> {
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
