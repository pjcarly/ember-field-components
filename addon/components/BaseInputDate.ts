import BaseInput from "./BaseInput";
import moment from "moment";
import { isBlank } from "@ember/utils";
import { computed } from "@ember/object";
import { tagName } from "@ember-decorators/component";

@tagName("")
export default abstract class BaseInputDate extends BaseInput {
  /**
   * The format to which your date should be displayed (this follows the moment.js formatting)
   */
  format!: string;

  @computed("value")
  get computedValue(): any {
    if (!isBlank(this.value)) {
      if (this.value instanceof Date) {
        return moment(this.value).format(this.momentFormat);
      } else {
        return this.value;
      }
    }
  }
  set computedValue(value: any) {
    if (!isBlank(value)) {
      const momentValue = moment(value, this.momentFormat, true);

      if (momentValue.isValid()) {
        value = momentValue.toDate();
      }
    }

    value = this.preSetHook(value);
    this.valueChanged(value);
  }

  @computed("format")
  get momentFormat(): string {
    return this.format;
  }
}
