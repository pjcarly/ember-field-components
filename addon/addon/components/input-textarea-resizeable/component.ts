import BaseInput, { Arguments } from "../BaseInput";
import { guidFor } from "@ember/object/internals";

export default class InputTextareaComponent extends BaseInput<Arguments> {
  type = "textarea-resizeable";

  get inputIdComputed(): string {
    return this.args.inputId ?? `${guidFor(this)}-queue`;
  }
}
