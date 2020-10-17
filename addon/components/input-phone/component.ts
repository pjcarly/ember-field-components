import BaseInput, { Arguments } from "../BaseInput";

interface PhoneArguments extends Arguments {
  value?: string;
}

export default class InputPhoneComponent extends BaseInput<PhoneArguments> {
  type = "phone";
}
