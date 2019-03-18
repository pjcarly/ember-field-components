import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { computed } from '@ember-decorators/object';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default class BaseInput extends Component {
  type : string = 'text';
  value !: any;
  inputClass : string = '';
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

    if(!isBlank(this.inputClass)){
      styleClass += ` ${this.inputClass}`;
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
