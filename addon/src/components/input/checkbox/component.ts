import { action } from "@ember/object";
import BaseInput, { Arguments } from "../../BaseInput";

interface CheckboxArguments extends Arguments {
  value?: boolean;
}

export default class InputTextComponent extends BaseInput<CheckboxArguments> {
  type = "checkbox";

  @action
  toggleValue() {
    this.setNewValue(!this.args.value);
  }
}
