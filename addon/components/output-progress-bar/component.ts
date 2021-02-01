import BaseOutput, { Arguments as BaseArguments } from "../BaseOutput";

export interface Arguments extends BaseArguments {
  value?: number;
  options?: OutputOptions;
}

export interface OutputOptions {
  min?: number;
  max?: number;
}

export default class OutputProgressBarComponent extends BaseOutput<Arguments> {
  type = "progress-bar";

  get min(): number {
    return this.args.options?.min ?? 0;
  }

  get max(): number {
    return this.args.options?.max ?? 100;
  }

  get value(): number {
    return this.args.value ?? 0;
  }

  get width(): number {
    return (this.value / (this.max - this.min)) * 100;
  }
}
