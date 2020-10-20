import BaseField, { Arguments } from "../BaseField";
import { computed } from "@ember/object";
import { dasherize } from "@ember/string";

export interface OutputFieldArguments extends Arguments {
  /**
   * The CSS class you want to give to the output element in the DOM
   */
  outputClass?: string;
  options?: OutputFieldOptionsArgument;
}

export interface OutputFieldOptionsArgument {
  outputOptions?: any;
}

export default class OutputFieldComponent<
  T extends OutputFieldArguments
> extends BaseField<T> {
  get value(): any {
    // @ts-ignore
    return this.args.model.get(this.args.field);
  }

  get computedClass(): string {
    const classes: string[] = [];

    classes.push("output-field");
    classes.push(this.componentName);
    if (this.modelName) {
      classes.push(
        `${dasherize(this.modelName)}-${dasherize(this.args.field)}`
      );
    }

    if (this.args.inline) {
      classes.push("inline");
    }

    if (this.args.class) {
      classes.push(this.args.class);
    }

    return classes.join(" ");
  }

  /**
   * The name of the subcomponent that will be injected as the output-field. This is dependent on the type of field
   */
  @computed()
  get componentName(): string {
    let type = this.type;

    if (type === "id" || type === "string") {
      type = "text";
    }

    return `output-field-${type}`.toLowerCase();
  }

  /**
   * These are options that will get bassed down to the output component
   */
  get outputOptions(): any {
    return this.args.options ? this.args.options.outputOptions : undefined;
  }
}
