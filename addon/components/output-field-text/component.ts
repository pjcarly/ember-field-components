import OutputFieldComponent from "../output-field/component";
import { computed } from "@ember/object";
import { FieldOptionsInterface } from "@getflights/ember-field-components/services/field-information";

export interface FieldOptionsMaskInterface extends FieldOptionsInterface {
  mask: string;
  regex: RegExp;
}

export default class OutputFieldTextComponent extends OutputFieldComponent {
  @computed("fieldOptions")
  get mask(): string | undefined {
    const fieldOptions = <FieldOptionsMaskInterface>this.fieldOptions;

    return this.widgetName === "mask" &&
      fieldOptions &&
      fieldOptions.hasOwnProperty("mask")
      ? fieldOptions.mask
      : undefined;
  }

  @computed("fieldOptions")
  get regex(): RegExp | undefined {
    const fieldOptions = <FieldOptionsMaskInterface>this.fieldOptions;

    return this.widgetName === "mask" &&
      fieldOptions &&
      fieldOptions.hasOwnProperty("regex")
      ? fieldOptions.regex
      : undefined;
  }
}
