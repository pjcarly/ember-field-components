import BaseOutput, { Arguments } from "../BaseOutput";

export interface TextMaskArguments extends Arguments {
  regex: RegExp;
  mask: string;
  pattern: RegExp;
}

export default class OutputTextMaskComponent extends BaseOutput<
  TextMaskArguments
> {
  type = "text mask";

  pattern = /\{\{(\d+)\}\}/g;

  constructor(owner: any, args: TextMaskArguments) {
    super(owner, args);

    if (args.pattern) {
      this.pattern = args.pattern;
    }
  }

  get maskedValue(): string | undefined | null {
    if (!this.args.value) {
      return this.args.value;
    }

    const matchedValue = this.args.value.match(this.args.regex);

    let maskedValue = this.args.mask;
    let match: RegExpExecArray | null = null;
    while ((match = this.pattern.exec(this.args.mask))) {
      if (match) {
        // @ts-ignore
        const matchedIndex = parseInt(match[1]);
        // @ts-ignore
        maskedValue = maskedValue.replace(match[0], matchedValue[matchedIndex]);
      }
    }

    return maskedValue;
  }
}
