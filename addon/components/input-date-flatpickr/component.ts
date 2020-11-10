import InputDateComponent from "../input-date/component";
import FieldInformationService from "@getflights/ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { guidFor } from "@ember/object/internals";
import { action } from "@ember/object";
import flatpickr from "flatpickr";
import moment from "moment";
import { DateArguments } from "../BaseInputDate";
import { OptionsArgument } from "../BaseInput";

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

export interface DateFlatpickrArguments extends DateArguments {
  options?: DateFlatpickrOptionsArgument;
}

export interface DateFlatpickrOptionsArgument extends OptionsArgument {
  minDate?: string | Date;
  maxDate?: string | Date;
}

export default class InputDateFlatpickrComponent extends InputDateComponent<
  DateFlatpickrArguments
> {
  @service fieldInformation!: FieldInformationService;

  showButton = true;
  type = "date-flatpickr";
  format: string = "";
  flatpickr?: flatpickr.Instance;

  get flatpickrValue(): Date | null {
    if (this.args.value) {
      if (this.args.value instanceof Date) {
        return this.args.value;
      } else {
        return moment(this.args.value).toDate();
      }
    } else {
      return null;
    }
  }

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

  get inputIdComputed(): string {
    return this.args.inputId ?? `${guidFor(this)}-select`;
  }

  get minDate(): string | Date | undefined {
    return this.args.options && this.args.options.minDate
      ? this.args.options.minDate
      : undefined;
  }

  get maxDate(): string | Date | undefined {
    return this.args.options && this.args.options.maxDate
      ? this.args.options.maxDate
      : undefined;
  }

  inputBlurred() {
    if (this.flatpickr) {
      const inputValue = this.flatpickr.input.value;
      const parsedMoment = moment(inputValue);

      if (parsedMoment.isValid()) {
        this.setNewValue(parsedMoment.toDate());
      } else {
        this.flatpickr.input.value = "";
        this.setNewValue(null);
      }
    }
  }

  @action
  setFlatpickrValue(value: Date | null) {
    if (value instanceof Array) {
      value = value[0];
    }

    this.setNewValue(value);
  }

  @action
  toggleCalendar() {
    if (this.flatpickr) {
      this.flatpickr.toggle();
    }
  }

  @action
  onFlatpickrInstance(flatpickr: flatpickr.Instance) {
    flatpickr.input.addEventListener("blur", this.inputBlurred.bind(this));
  }

  willDestroy() {
    if (this.flatpickr) {
      this.flatpickr.input.removeEventListener("blur", this.inputBlurred);
    }
    super.willDestroy();
  }
}
