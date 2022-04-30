import { action } from "@ember/object";
import InputSelectComponent, {
  SelectArguments,
} from "../select/component";

export default class InputMultiSelectComponent extends InputSelectComponent<
  SelectArguments
> {
  type = "multi-select";

  @action
  multiSelectValueChanged(event: Event) {
    const element = <HTMLSelectElement>event.target;
    const values: string[] = [];

    if (!element) {
      this.setNewValue(values);
      return;
    }

    for (const option of element.options) {
      if (option.selected && option.value) {
        values.push(option.value);
      }
    }

    this.setNewValue(values);
  }
}
