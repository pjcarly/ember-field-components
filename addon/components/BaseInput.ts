import { action } from "@ember/object";
import Component from "@glimmer/component";

export interface Arguments {
  /**
   * The Value of the input component
   */
  value?: any;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  inputId?: string;

  /**
   * The classes that will be applied to the outer element
   * If you want to add classes to the input component itself use the regular class syntax (without @)
   */
  class?: string;

  /**
   * Some input components display helper buttons (like a calendar for date input) you can hide those buttons by settings this bool
   */
  showButton?: boolean;

  /**
   * A pass in attribute that can be set to force an input element as an input-group
   */
  inputGroup?: boolean;

  /**
   * The options that can be passed in specifically for a component extending this base class
   * All subclasses should extend this interface to define their own options
   */
  options?: OptionsArgument;

  /**
   * A method that can be passed in, that will be called before setting the value, where you can change the value before setting
   */
  preSetHook?: (value: any) => any;

  /**
   * The action that can be passed into the component to get notified of changes
   */
  valueChanged?: (newValue: any) => void;
}

export interface OptionsArgument {}

export default abstract class BaseInput<T extends Arguments> extends Component<
  T
> {
  /**
   * The type of Input Component. This will be added to the classes later
   */
  abstract type: string;
  protected inputGroup = false;

  get computedClass(): string {
    const classes: string[] = [];
    classes.push("input");
    classes.push(this.type);

    if (this.args.class) {
      classes.push(this.args.class);
    }

    if (
      this.args.prefix ||
      this.args.suffix ||
      this.args.inputGroup || 
      this.inputGroup ||
      this.args.showButton
    ) {
      classes.push("input-group");
    }

    return classes.join(" ");
  }

  @action
  valueChanged(newValue: any) {
    if (this.args.preSetHook) {
      newValue = this.args.preSetHook(newValue);
    }

    if (this.args.valueChanged) {
      this.args.valueChanged(newValue);
    }
  }
}
