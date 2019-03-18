import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { computed } from '@ember-decorators/object';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default class BaseInput extends Component {
  /**
   * The type of Input Component. This will be added to the classes later
   */
  type !: string;

  /**
   * The Value of the input component
   */
  value !: any;

  /**
   * The custom class you want to give to the component
   */
  class : string = '';
  placeholder : string = '';
  inputId : string = '';

  @computed('value')
  get computedValue() : any {
    return this.value;
  }
  set computedValue(value : any) {
    value = this.preSetHook(value);
    this.valueChanged(value);
  }


  @computed('type', 'inputClass')
  get computedClass() : string {
    let styleClass = `input ${this.type}`;

    if(!isBlank(this.class)){
      styleClass += ` ${this.class}`;
    }

    return styleClass;
  }

  preSetHook(value: any){
    return value;
  }

  valueChanged(value: any){
    return value;
  }
}
