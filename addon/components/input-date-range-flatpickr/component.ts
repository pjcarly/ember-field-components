import FieldInformationService from "@getflights/ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { guidFor } from "@ember/object/internals";
import { action } from "@ember/object";
import flatpickr from "flatpickr";
import {
  DateFlatpickrOptionsArgument,
  momentFormatToFlatpickrFormat,
} from "../input-date-flatpickr/component";
import BaseInput, { Arguments } from "../BaseInput";
import moment from 'moment';

export interface DateRangeFlatpickrArguments extends Arguments {
  value?: [Date, Date] | [Date] | [];

  /**
   * The format to which your date should be displayed (this follows the moment.js formatting)
   */
  format?: string;

  options?: DateFlatpickrOptionsArgument;
}

export default class InputDateRangeFlatpickrComponent extends BaseInput<
  DateRangeFlatpickrArguments
> {
  @service fieldInformation!: FieldInformationService;

  showButton = true;
  type = "date-range-flatpickr";
  format: string = "";
  flatpickr?: flatpickr.Instance;

  get flatpickrValue(): [Date, Date] | [Date] | [] | null {
    if (this.args.value) {
      if (this.args.value instanceof Array && this.args.value.length <= 2) {
        return <[Date, Date] | [Date] | []>this.args.value;
      } else {
        return [];
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

  @action
  setFlatpickrValue(value: [Date, Date] | [Date] | [] | null) {
    if (value && value instanceof Array && value.length <= 2) {
      value = <[Date, Date] | [Date] | []>value.filter((singleValue) => {
        // @ts-ignore
        return singleValue instanceof Date;
      });
    } else {
      value = null;
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
  onReady(_selectedDates: Date[], _dateStr: string, flatpickr: flatpickr.Instance) {
    this.flatpickr = flatpickr;
    this.flatpickr.changeMonth(moment(this.minDate).month());
  }
}
