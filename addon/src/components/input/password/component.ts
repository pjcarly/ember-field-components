import BaseInput, { Arguments } from "../../BaseInput";

interface PasswordArguments extends Arguments {
  value?: string;
}

export default class InputPasswordComponent extends BaseInput<
  PasswordArguments
> {
  type = "password";
}
