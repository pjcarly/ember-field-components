import BaseInput, { Arguments } from "../BaseInput";

interface CheckboxArguments extends Arguments {
  value?: boolean;
}

export default class InputTextComponent extends BaseInput<CheckboxArguments> {
  type = "checkbox";
}
