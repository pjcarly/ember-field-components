import BaseInput, { Arguments } from "../../BaseInput";

export interface NumberArguments extends Arguments {
  value?: number;
}

export default class InputNumberComponent extends BaseInput<NumberArguments> {
  type = "number";
}
