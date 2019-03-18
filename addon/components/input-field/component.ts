import BaseField from "../../field/BaseField";
import { defineProperty, computed as classicComputed } from '@ember/object';
import { computed, action } from '@ember-decorators/object';
import { guidFor } from '@ember/object/internals';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default class InputField extends BaseField {
  /**
   * Returns a unique dom id that can be used to identify the input element.
   * This is also bound to the label and put on the label "for" attribute
   */
  inputId !: string;

  init() {
    super.init();

    // This is where the magic happens, we define a computed property on the instance of this component,
    // but because the name of the field is passed in, the dependent keys of the computed property are dynamic
    // by using defineProperty, we can set the computed property on Init of this component, with the correct dependent keys.

    defineProperty(this, 'value', classicComputed('model', `model.${this.field}`, {
      get(){
        return this.model.get(this.field);
      },
      set(key, value){
        this.model.set(this.field, value);
        this.notifyExternalAction(value);
        return value;
      }
    }));
  }

  /**
   * Returns a unique inputId for the instance of this field
   */
  @computed
  get calculatedInputId() : string {
    return `${guidFor(this)}-input`;
  }

  @computed('type')
  get componentName() : string {
    let type = this.type;

    if(type === 'id' || type === 'string') {
      type = 'text';
    }

    return `input-field-${type}`;
  }

  /**
   * Provide your own function and get notified of new values
   * @param value The new value of the field
   */
  valueChanged(value: any) {}

  /**
   * This function gives you the ability to perform modifications on the value before it is set on the model. Pass your own function and return the value
   * @param value The value that is going to be changed
   */
  preSetHook(value : any) : any {
    return value;
  }

  /**
   * The action responsible for notifying the external action
   * @param value The new value
   */
  @action
  notifyExternalAction(value : any) {
    this.valueChanged(value);
  }
}
