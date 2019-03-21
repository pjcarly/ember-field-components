import InputSelectComponent from '../input-select/component';
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';

export default class InputMultiSelectComponent extends InputSelectComponent {
  @computed('value')
  get computedValue() {
    const value = super.computedValue;

    if(!isBlank(value)){
      return value;
    }

    return [];
  }
}
