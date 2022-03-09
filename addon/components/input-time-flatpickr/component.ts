import { isBlank } from "@ember/utils";
import InputDateFlatpickrComponent, {
  momentFormatToFlatpickrFormat
} from "../input-date-flatpickr/component";

export default class InputTimeFlatpickrComponent extends InputDateFlatpickrComponent {
  type = "time-flatpickr";
  format = "HH:mm:ss";

  get momentFormat(): string {
    if (isBlank(this.format)) {
      return this.fieldInformation.dateFormat;
    } else {
      return this.format;
    }
  }

  get flatpickrFormat(): string {
    return momentFormatToFlatpickrFormat(this.momentFormat);
  }
}
