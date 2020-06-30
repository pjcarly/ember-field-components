import BaseInput from "../BaseInput";
import { guidFor } from "@ember/object/internals";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";

export default class InputTextareaComponent extends BaseInput {
  type = "textarea-resizeable";

  @computed("inputId")
  get inputIdComputed(): string {
    if (!isBlank(this.inputId)) {
      return this.inputId;
    } else {
      return `${guidFor(this)}-select`;
    }
  }
}
