/* globals autosize */
import BaseInput from '../BaseInput';
import { guidFor } from '@ember/object/internals';
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';

declare function autosize(element: HTMLElement | null) : any;

export default class InputTextareaComponent extends BaseInput {
  type = 'textarea-resizeable';

  didInsertElement() {
    super.didInsertElement();
    autosize(document.getElementById(this.inputIdComputed));
  }

  @computed('inputId')
  get inputIdComputed() : string {
    if(!isBlank(this.inputId)) {
      return this.inputId;
    } else {
      return `${guidFor(this)}-select`;
    }
  }
}
