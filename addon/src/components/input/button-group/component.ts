import { action } from "@ember/object";
import SelectOption from "../../../interfaces/SelectOption";
import { OptionsArgument } from "../../BaseInput";
import InputSelectComponent, {
  SelectArguments,
} from "../select/component";

export interface ButtonGroupArguments extends SelectArguments {
  options?: ButtonGroupOptionsArgument;
}

export interface ButtonGroupOptionsArgument extends OptionsArgument {
  buttonClass?: string;
}

export default class InputButtonGroupComponent extends InputSelectComponent<ButtonGroupArguments> {
  get classComputed(): string {
    return this.args.class ?? "btn-group";
  }

  get buttonClassComputed(): string {
    return this.args.options && this.args.options.buttonClass
      ? this.args.options.buttonClass
      : "btn btn-default";
  }

  @action
  buttonClicked(selectOption: SelectOption) {
    this.setNewValue(selectOption.value);
  }
}
