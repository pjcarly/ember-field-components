import BaseInput from '../BaseInput';
import { action } from '@ember/object';

export default class InputTextComponent extends BaseInput {
  type = 'switch';

  @action
  toggleSwitch() {
    this.toggleProperty('computedValue');
  }
}
