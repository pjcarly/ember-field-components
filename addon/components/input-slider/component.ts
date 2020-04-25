import BaseInput from "../BaseInput";
import { computed } from "@ember/object";
import { guidFor } from "@ember/object/internals";
import { isBlank } from "@ember/utils";

export default class InputSliderComponent extends BaseInput {
  type = "slider";

  @computed("inputId")
  get inputIdComputed(): string {
    if (!isBlank(this.inputId)) {
      return this.inputId;
    } else {
      return `${guidFor(this)}-select`;
    }
  }

  @computed("options.min")
  get min(): number {
    return this.options && (this.options.min || this.options.min === 0)
      ? this.options.min
      : 0;
  }

  @computed("options.max")
  get max(): number {
    return this.options && (this.options.max || this.options.max === 0)
      ? this.options.max
      : 100;
  }

  @computed("options.step")
  get step(): number {
    return this.options && this.options.step > 0 ? this.options.step : 1;
  }
}
