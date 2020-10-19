import BaseInput, { Arguments } from "../BaseInput";
import { action } from "@ember/object";

export interface SwitchArguments extends Arguments {
  value?: boolean;
}

export default class InputSwitchComponent extends BaseInput<SwitchArguments> {
  type = "switch";

  @action
  toggleSwitch() {
    this.setNewValue(!this.args.value);
  }
}
