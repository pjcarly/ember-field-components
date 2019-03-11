import BaseField from "../../field/BaseField";
import { computed } from '@ember-decorators/object';
import { guidFor } from '@ember/object/internals';

export default class InputField extends BaseField {
  tagName : string = '';

  /**
   * Returns a unique dom id that can be used to identify the input element.
   * This is also bound to the label and put on the label "for" attribute
   */
  @computed
  get inputId() : string {
    return `${guidFor(this)}-input`;
  }

  @computed('model', 'field')
  get value() : any {
    return this.model.get(this.field);
  }
  set value(value: any) {
    this.model.set(this.field, value);
    this.valueChanged(value);
  }

  // This function can be passeed into each component to be notified of changes on the model field
  notifyAction(value : any) {}
}
