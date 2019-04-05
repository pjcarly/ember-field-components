import InputSelectComponent from '../input-select/component';
import { computed } from '@ember-decorators/object';
import { guidFor } from '@ember/object/internals';
import { isBlank } from '@ember/utils';

export default class InputMultiSelectComponent extends InputSelectComponent {
  @computed('inputId')
  get inputIdComputed() : string {
    if(!isBlank(this.inputId)) {
      return this.inputId;
    } else {
      return `${guidFor(this)}-select`;
    }
  }
}
