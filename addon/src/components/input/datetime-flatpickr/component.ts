import InputDateFlatpickrComponent, {
  momentFormatToFlatpickrFormat,
} from "../date-flatpickr/component";

export default class InputDatetimeFlatpickrComponent extends InputDateFlatpickrComponent {
  type = "datetime-flatpickr";
  format = "YYYY-MM-DD HH:mm:ss";

  get momentFormat(): string {
    if (this.format) {
      return this.format;
    } else {
      return this.fieldInformation.dateFormat;
    }
  }

  get flatpickrFormat(): string {
    return momentFormatToFlatpickrFormat(this.momentFormat);
  }
}
