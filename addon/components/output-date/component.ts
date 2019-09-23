import BaseOutput from "../BaseOutput";
import FieldInformationService from "ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";

export default class OutputTimeComponent extends BaseOutput {
  @service fieldInformation!: FieldInformationService;

  type = "date";

  @computed("options.format", "fieldInformation.dateFormat")
  get momentFormat(): string {
    if (isBlank(this.options) || isBlank(this.options.format)) {
      return this.fieldInformation.dateFormat;
    } else {
      return this.options.format;
    }
  }
}
