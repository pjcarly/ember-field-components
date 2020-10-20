import BaseField, { Arguments } from "../BaseField";
import { action } from "@ember/object";
import { guidFor } from "@ember/object/internals";
import { dasherize } from "@ember/string";

export interface InputFieldArguments extends Arguments {
  /**
   * Returns a unique dom id that can be used to identify the input element.
   * This is also bound to the label and put on the label "for" attribute
   */
  inputId: string;

  /**
   * The CSS class you want to give to the input element in the DOM
   */
  inputClass?: string;

  /**
   * Provide your own function and get notified of new values
   * @param value The new value of the field
   * @param oldValue The old value of the field
   */
  valueChanged?: (_: any, _2: any) => void;

  /**
   * This function gives you the ability to perform modifications on the value before it is set on the model. Pass your own function and return the value
   * @param value The value that is going to be changed
   */
  preSetHook?: (value: any) => void;
}

export default class InputFieldComponent<
  T extends InputFieldArguments
> extends BaseField<T> {
  get value(): any {
    return (
      this.args.model
        // @ts-ignore
        .get(this.args.field)
    );
  }

  /**
   * Returns a unique inputId for the instance of this field
   */
  get calculatedInputId(): string {
    return this.args.inputId ?? `${guidFor(this)}-input`;
  }

  get computedClass(): string {
    const classes: string[] = [];

    classes.push("input-field");
    classes.push(this.componentName);

    if (this.modelName) {
      classes.push(
        `${dasherize(this.modelName)}-${dasherize(this.args.field)}`
      );
    }

    if (this.args.class) {
      classes.push(this.args.class);
    }

    if (this.args.inline) {
      classes.push("inline");
    }

    if (this.isRequired) {
      classes.push("is-required");
    }

    if (this.isReadOnly) {
      classes.push("is-readonly");
    }

    if (this.hasError) {
      classes.push("has-error");
    }

    if (this.focus) {
      classes.push("has-focus");
    }

    return classes.join(" ");
  }

  /**
   * The name of the subcomponent that will be injected as the input-field. This is dependent on the type of field
   */
  get componentName(): string {
    let type = this.type;

    if (type === "id" || type === "string") {
      type = "text";
    }

    return `input-field-${type}`.toLowerCase();
  }

  /**
   * These are options that will get bassed down to the input component
   */
  get inputOptions(): any {
    return this.args.options ? this.args.options.inputOptions : undefined;
  }

  @action
  setNewValue(value?: any): void {
    const oldValue = this.value;

    this.args.model
      // @ts-ignore
      .set(this.args.field, value);

    this.args.model.errors
      // @ts-ignore
      .remove(this.args.field);

    this.notifyExternalAction(value, oldValue);
  }

  /**
   * The action responsible for notifying the external action
   * @param value The new value
   */
  @action
  notifyExternalAction(value: any, oldValue: any) {
    if (this.args.valueChanged) {
      this.args.valueChanged(value, oldValue);
    }
  }

  @action
  doFocusIn() {
    this.focus = true;
  }

  @action
  doFocusOut() {
    this.focus = false;
  }
}
