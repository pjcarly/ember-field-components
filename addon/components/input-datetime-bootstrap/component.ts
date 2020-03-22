import InputDateBootstrapComponent from "../input-date-bootstrap/component";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";

export default class InputDatetimeBootstrapComponent extends InputDateBootstrapComponent {
  type = "datetime-bootstrap";
  format = "YYYY-MM-DD HH:mm:ss";

  @computed("format", "fieldInformation.dateTimeFormat")
  get momentFormat(): string {
    if (isBlank(this.format)) {
      return this.fieldInformation.dateTimeFormat;
    } else {
      return this.format;
    }
  }
}
