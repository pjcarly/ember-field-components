import InputDateComponent from "../input-date/component";
import FieldInformationService from "@getflights/ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { guidFor } from "@ember/object/internals";
import { isBlank } from "@ember/utils";
import { action } from "@ember/object";
import $ from "jquery";

declare global {
  interface JQuery {
    data(value: string): DateTimePicker;
    datetimepicker(): JQuery;
    datetimepicker(options: any): JQuery;
  }
}

interface DateTimePicker {
  minDate(date: Date | boolean): void;
  maxDate(date: Date | boolean): void;
  toggle(): void;
}

export default class InputDateBootstrapComponent extends InputDateComponent {
  @service fieldInformation!: FieldInformationService;

  type = "date-bootstrap";
  format: string = "";

  @computed("format", "fieldInformation.dateFormat")
  get momentFormat(): string {
    if (isBlank(this.format)) {
      return this.fieldInformation.dateFormat;
    } else {
      return this.format;
    }
  }

  @computed("inputId")
  get inputIdComputed(): string {
    if (!isBlank(this.inputId)) {
      return this.inputId;
    } else {
      return `${guidFor(this)}-select`;
    }
  }

  didInsertElement() {
    super.didInsertElement();

    const domElement = $(`#${this.inputIdComputed}`);
    const options = this.options ? this.options : {};

    options.format = options.hasOwnProperty("format")
      ? options.format
      : this.momentFormat;
    options.icons = options.hasOwnProperty("icons")
      ? options.icons
      : { previous: "fa fa-chevron-left", next: "fa fa-chevron-right" };
    // options.debug = true;

    domElement.datetimepicker(options);

    if (this.minDate) {
      domElement.data("DateTimePicker").minDate(this.minDate);
    } else {
      domElement.data("DateTimePicker").minDate(false);
    }

    if (this.maxDate) {
      domElement.data("DateTimePicker").maxDate(this.maxDate);
    } else {
      domElement.data("DateTimePicker").maxDate(false);
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
    const domElement = $(`#${this.inputIdComputed}`);
    domElement.data("DateTimePicker").toggle();
  }
}
