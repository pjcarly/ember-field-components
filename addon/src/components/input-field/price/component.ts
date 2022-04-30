import InputField, { InputFieldArguments } from "../component";

export default class InputFieldPriceComponent extends InputField<
  InputFieldArguments<number>,
  number
> {
  get currency(): string {
    const modelCurrency = <
      string // @ts-ignore
      >this.args.model.currency;
    const availableCurrencies = this.fieldInformation.availableCurrencies;

    if (!modelCurrency || !availableCurrencies.includes(modelCurrency)) {
      return this.fieldInformation.defaultCurrency;
    } else {
      return modelCurrency;
    }
  }
}
