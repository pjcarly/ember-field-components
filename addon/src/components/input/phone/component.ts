import BaseInput, { Arguments } from "../../BaseInput";

export interface PhoneArguments extends Arguments {
  value?: string;
}

export default class InputPhoneComponent<T extends PhoneArguments> extends BaseInput<T> {
  type = "phone";
}
