import BaseOutput, { Arguments } from "../BaseOutput";

export interface NumberArguments extends Arguments {
  options?: NumberOptionsArgument;
}

export interface NumberOptionsArgument {
  positiveINFValue?: number | string;
  negativeINFValue?: number | string;
}

export default class OutputNumberComponent extends BaseOutput<NumberArguments> {
  type = "number";
}
