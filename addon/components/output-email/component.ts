import BaseOutput, { Arguments } from "../BaseOutput";

export default class OutputTextComponent extends BaseOutput<Arguments> {
  type = "email";
  showButton = true;
}
