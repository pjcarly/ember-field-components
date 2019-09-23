import InputSelectComponent from '../input-select/component';
import { computed, action } from '@ember/object';
import { isBlank } from '@ember/utils';
import { guidFor } from '@ember/object/internals';

export default class InputMultiSelectComponent extends InputSelectComponent {
  @computed('inputId')
  get inputIdComputed() : string {
    if(!isBlank(this.inputId)) {
      return this.inputId;
    } else {
      return `${guidFor(this)}-select`;
    }
  }

  @action
  setValue() {
    const element : HTMLSelectElement | null = <HTMLSelectElement> document.getElementById(this.inputIdComputed);
    const values : string[] = [];

    if(!element) {
      this.computedValue = values;
      return;
    }

    for(const option of element.options) {
      if(option.selected) {
        values.push(option.value);
      }
    }

    this.computedValue = values;
  }
}
