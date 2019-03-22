import BaseInput from './BaseInput';
import moment from 'moment';
import { isBlank } from '@ember/utils';
import { computed } from '@ember-decorators/object';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default abstract class BaseInputDate extends BaseInput {
  /**
   * The format to which your date should be displayed (this follows the moment.js formatting)
   */
  format !: string;

  @computed('value')
  get computedValue() : any {
    if (!isBlank(this.value) && (this.value instanceof Date)) {
      return moment(this.value).format(this.format);
    }
  }
  set computedValue(value : any) {
    if (!isBlank(value)) {
      value = moment(value, this.format).toDate();
    }

    value = this.preSetHook(value);
    this.valueChanged(value);
  }
}
