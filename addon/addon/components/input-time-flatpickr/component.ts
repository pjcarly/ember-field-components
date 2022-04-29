import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";
import InputDateFlatpickrComponent, {
  momentFormatToFlatpickrFormat
} from "../input-date-flatpickr/component";

export default class InputTimeFlatpickrComponent extends InputDateFlatpickrComponent {
  type = "time-flatpickr";
  format = "HH:mm:ss";

  @computed("format", "fieldInformation.dateFormat")
  get momentFormat(): string {
    if (isBlank(this.format)) {
      return this.fieldInformation.dateFormat;
    } else {
      return this.format;
    }
  }

  @computed("momentFormat")
  get flatpickrFormat(): string {
    return momentFormatToFlatpickrFormat(this.momentFormat);
  }
}
