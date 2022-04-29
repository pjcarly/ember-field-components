import OutputFieldComponent, {
  OutputFieldArguments,
} from "../output-field/component";
import { FieldOptionsInterface } from "../../services/field-information";

export interface FieldOptionsMaskInterface extends FieldOptionsInterface {
  mask: string;
  regex: RegExp;
}

export default class OutputFieldTextComponent extends OutputFieldComponent<
  OutputFieldArguments
> {
  get mask(): string | undefined {
    const fieldOptions = <FieldOptionsMaskInterface>this.fieldOptions;

    return this.widgetName === "mask" &&
      fieldOptions &&
      fieldOptions.hasOwnProperty("mask")
      ? fieldOptions.mask
      : undefined;
  }

  get regex(): RegExp | undefined {
    const fieldOptions = <FieldOptionsMaskInterface>this.fieldOptions;

    return this.widgetName === "mask" &&
      fieldOptions &&
      fieldOptions.hasOwnProperty("regex")
      ? fieldOptions.regex
      : undefined;
  }
}
