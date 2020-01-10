import BaseOutput from "../BaseOutput";
import { computed } from "@ember/object";

export default class OutputTextComponent extends BaseOutput {
  type = "text";

  regex!: RegExp;
  mask!: string;
  pattern = /\{\{(\d+)\}\}/g;

  @computed("value")
  get maskedValue(): string | undefined | null {
    if (!this.value) {
      return this.value;
    }

    const matchedValue = this.value.match(this.regex);

    let maskedValue = this.mask;
    let match: RegExpExecArray | null = null;
    while ((match = this.pattern.exec(this.mask))) {
      if (match) {
        const matchedIndex = parseInt(match[1]);
        maskedValue = maskedValue.replace(match[0], matchedValue[matchedIndex]);
      }
    }

    return maskedValue;
  }
}
