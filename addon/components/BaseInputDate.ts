import BaseInput, { Arguments } from "./BaseInput";
import moment from "moment";

export interface DateArguments extends Arguments {
  value?: Date;

  /**
   * The format to which your date should be displayed (this follows the moment.js formatting)
   */
  format?: string;
}

export default abstract class BaseInputDate<
  T extends DateArguments
> extends BaseInput<T> {
  format!: string;

  constructor(owner: any, args: T) {
    super(owner, args);

    if (args.format) {
      this.format = args.format;
    }
  }

  get computedValue(): string | undefined {
    if (this.args.value) {
      return moment(this.args.value).format(this.format);
    } else {
      return;
    }
  }

  valueChanged(newValue?: Date) {
    if (newValue) {
      const momentValue = moment(newValue, this.format, true);

      if (momentValue.isValid()) {
        newValue = momentValue.toDate();
      }
    }

    super.valueChanged(newValue);
  }
}
