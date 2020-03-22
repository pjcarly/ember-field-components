import FieldInformationService from "ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { guidFor } from "@ember/object/internals";
import { isBlank } from "@ember/utils";
import { action } from "@ember/object";
import flatpickr from "flatpickr";
import InputDateComponent from "../input-date/component";
import { momentFormatToFlatpickrFormat } from "../input-date-flatpickr/component";

export default class InputDateRangeFlatpickrComponent extends InputDateComponent {
  @service fieldInformation!: FieldInformationService;

  type = "date-range-flatpickr";
  format: string = "";
  flatpickr?: flatpickr.Instance;

  @computed("value")
  get computedValue(): [Date, Date] | [Date] | [] | null {
    if (this.value) {
      if (this.value instanceof Array && this.value.length <= 2) {
        return <[Date, Date] | [Date] | []>this.value;
      } else {
        return [];
      }
    } else {
      return this.value;
    }
  }
  set computedValue(value: [Date, Date] | [Date] | [] | null) {
    if (value && value instanceof Array && value.length <= 2) {
      value = <[Date, Date] | [Date] | []>value.filter(singleValue => {
        // @ts-ignore
        singleValue instanceof Date;
      });
    } else {
      value = null;
    }

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
