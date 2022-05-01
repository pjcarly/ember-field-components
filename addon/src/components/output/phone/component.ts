import BaseOutput, { Arguments } from "../../BaseOutput";

export default class OutputPhoneComponent extends BaseOutput<Arguments> {
  type = "phone";
  showButton = true;
}
