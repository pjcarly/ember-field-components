import InputDateComponent from "../input-date/component";
import FieldInformationService from "ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { guidFor } from "@ember/object/internals";
import { isBlank } from "@ember/utils";
import { action } from "@ember/object";
import flatpickr from "flatpickr";
import moment from "moment";

export function momentFormatToFlatpickrFormat(momentFormat: string): string {
  if (!momentFormat) {
    return momentFormat;
  }

  return momentFormat
    .replace("YYYY", "Y")
    .replace("YY", "y")
    .replace("MM", "m")
    .replace("DD", "d")
    .replace("HH", "H")
    .replace("mm", "i")
    .replace("ss", "S");
}

export default class InputDateFlatpickrComponent extends InputDateComponent {
  @service fieldInformation!: FieldInformationService;

  type = "date-flatpickr";
  format: string = "";
  flatpickr?: flatpickr.Instance;

  @computed("value")
  get computedValue(): Date | null {
    if (this.value) {
      if (this.value instanceof Date) {
        return this.value;
      } else {
        return moment(this.value).toDate();
      }
    } else {
      return this.value;
    }
  }
  set computedValue(value: Date | null) {
    value = this.preSetHook(value);
    this.valueChanged(value);
  }

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

  @computed("inputId")
  get inputIdComputed(): string {
    if (!isBlank(this.inputId)) {
      return this.inputId;
    } else {
      return `${guidFor(this)}-select`;
    }
  }

  @computed("options.minDate")
  get minDate() {
    return this.options && this.options.minDate
      ? this.options.minDate
      : undefined;
  }

  @computed("options.maxDate")
  get maxDate() {
    return this.options && this.options.maxDate
      ? this.options.maxDate
      : undefined;
  }

  @action
  toggleCalendar() {
    if (this.flatpickr) {
      this.flatpickr.toggle();
    }
  }
}