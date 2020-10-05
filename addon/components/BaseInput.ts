import Component from "@ember/component";
import { isBlank } from "@ember/utils";
import { computed } from "@ember/object";
import { tagName } from "@ember-decorators/component";

@tagName("")
export default abstract class BaseInput extends Component {
  /**
   * The type of Input Component. This will be added to the classes later
   */
  type!: string;

  /**
   * The Value of the input component
   */
  value?: any;

  /**
   * The custom class you want to give to the component
   */
  class: string = "";
  placeholder: string = "";
  inputId: string = "";
  options: any = {};
  prefix: string = "";
  suffix: string = "";

  /**
   * A pass in attribute that can be set to force an input element as an input-group
   */
  inputGroup: boolean = false;

  /**
   * Some input components display helper buttons (like a calendar for date input) you can hide those buttons by settings this bool
   */
  showButton: boolean = true;

  @computed("value")
  get computedValue(): any {
    return this.value;
  }
  set computedValue(value: any) {
    value = this.preSetHook(value);
    this.valueChanged(value);
  }

  @computed("type", "class")
  get computedClass(): string {
    const classes: string[] = [];
    classes.push("input");
    classes.push(this.type);

    if (this.class) {
      classes.push(this.class);
    }

    if (
      !isBlank(this.prefix) ||
      !isBlank(this.suffix) ||
      this.inputGroup ||
      this.showButton
    ) {
      classes.push("input-group");
    }

    return classes.join(" ");
  }

  preSetHook(value: any) {
    return value;
  }

  /**
   * The action that can be passed into the component to get notified of changes
   */
  valueChanged(_: any) {}
}
