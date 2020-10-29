import BaseInput, { Arguments, OptionsArgument } from "../BaseInput";
import { guidFor } from "@ember/object/internals";

interface SliderArguments extends Arguments {
  options?: SliderOptionsArgument;
}

interface SliderOptionsArgument extends OptionsArgument {
  min?: number;
  max?: number;
  step?: number;
}

export default class InputSliderComponent extends BaseInput<SliderArguments> {
  type = "slider";

  get inputIdComputed(): string {
    return this.args.inputId ?? `${guidFor(this)}-select`;
  }

  get min(): number {
    return this.args.options &&
      (this.args.options.min || this.args.options.min === 0)
      ? this.args.options.min
      : 0;
  }

  get max(): number {
    return this.args.options &&
      (this.args.options.max || this.args.options.max === 0)
      ? this.args.options.max
      : 100;
  }

  get step(): number {
    return this.args.options &&
      this.args.options.step &&
      this.args.options.step > 0
      ? this.args.options.step
      : 1;
  }
}
