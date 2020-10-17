import BaseInput, { Arguments } from "../BaseInput";
import { action } from "@ember/object";

export default class InputSwitchComponent extends BaseInput<Arguments> {
  type = "switch";

  @action
  toggleSwitch() {
    this.valueChanged(!this.args.value);
  }
}
