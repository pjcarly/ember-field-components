import InputSelectComponent from "../input-select/component";
import { action } from "@ember/object";
import { guidFor } from "@ember/object/internals";

export default class InputMultiSelectComponent extends InputSelectComponent {
  get inputIdComputed(): string {
    return this.args.inputId ?? `${guidFor(this)}-select`;
  }

  @action
  multiSelectValueChanged() {
    const element: HTMLSelectElement | null = <HTMLSelectElement>(
      document.getElementById(this.inputIdComputed)
    );
    const values: string[] = [];

    if (!element) {
      this.valueChanged(values);
      return;
    }

    for (const option of element.options) {
      if (option.selected) {
        values.push(option.value);
      }
    }

    this.valueChanged(values);
  }
}
