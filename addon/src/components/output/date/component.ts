import BaseOutput, { Arguments } from "../../BaseOutput";
import FieldInformationService from "../../../services/field-information";
import { inject as service } from "@ember/service";

export interface DateArguments extends Arguments {
  options?: OutputOptionsArgument;
}

export interface OutputOptionsArgument {
  format?: string;
}

export default class OutputDateComponent extends BaseOutput<DateArguments> {
  @service fieldInformation!: FieldInformationService;

  type = "date";

  get momentFormat(): string {
    if (this.args.options && this.args.options.format) {
      return this.args.options.format;
    } else {
      return this.fieldInformation.dateFormat;
    }
  }
}
