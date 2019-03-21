import BaseInput from '../../base/BaseInput';
import SelectOption from 'ember-gf-components/interfaces/SelectOption';
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember-decorators/service';

export default class InputSelectComponent extends BaseInput {
  @service intl !: any;

  type = 'select';
  required : boolean = false;
  noneLabel : string = '';
  selectOptions: Array<SelectOption> = [];

  @computed('value', 'required')
  get showNone() {
    return isBlank(this.value) || this.required === false;
  }

  @computed('value', 'required')
  get noneDisabled() {
    return isBlank(this.value) && this.required;
  }

  @computed('value', 'required')
  get noneSelected() {
    return isBlank(this.value) && this.required;
  }

  @computed('noneLabel', 'intl.local')
  get noneLabelComputed() {
    return isBlank(this.noneLabel) ? this.intl.t('label.select_none') : this.noneLabel;
  }
}
