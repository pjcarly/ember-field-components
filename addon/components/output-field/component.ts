import BaseField from "../BaseField";
import { defineProperty, computed as classicComputed } from "@ember/object";
import { computed } from "@ember/object";
import { dasherize } from "@ember/string";

export default class OutputFieldComponent extends BaseField {
  /**
   * The CSS class you want to give to the output element in the DOM
   */
  outputClass: string = "";
  labelClass = "output-label";

  init() {
    super.init();

    // This is where the magic happens, we define a computed property on the instance of this component,
    // but because the name of the field is passed in, the dependent keys of the computed property are dynamic
    // by using defineProperty, we can set the computed property on Init of this component, with the correct dependent keys.

    defineProperty(
      this,
      "value",
      classicComputed("model", `model.${this.field}`, {
        get() {
          return this.model.get(this.field);
        },
      })
    );
  }

  @computed("class", "componentName")
  get computedClass(): string {
    const classes: string[] = [];

    classes.push("output-field");
    classes.push(this.componentName);
    if (this.modelName) {
      classes.push(`${dasherize(this.modelName)}-${dasherize(this.field)}`);
    }

    if (this.inline) {
      classes.push("inline");
    }

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(" ");
  }

  /**
   * The name of the subcomponent that will be injected as the output-field. This is dependent on the type of field
   */
  @computed("type")
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
  @computed("options.outputOptions")
  get outputOptions(): any {
    return this.options ? this.options.outputOptions : undefined;
  }
}
