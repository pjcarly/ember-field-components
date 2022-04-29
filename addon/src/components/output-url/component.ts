import BaseOutput, { Arguments } from "../BaseOutput";

export default class OutputUrlComponent extends BaseOutput<Arguments> {
  type = "url";
  showButton = true;
}
