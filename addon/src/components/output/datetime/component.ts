import BaseOutput from "../../BaseOutput";
import FieldInformationService from "../../../services/field-information";
import { inject as service } from "@ember/service";
import { DateArguments } from "../date/component";

export default class OutputDateTimeComponent extends BaseOutput<DateArguments> {
  @service fieldInformation!: FieldInformationService;

  type = "datetime";

  get momentFormat(): string {
    if (this.args.options && this.args.options.format) {
      return this.args.options.format;
    } else {
      return this.fieldInformation.dateTimeFormat;
    }
  }
}
