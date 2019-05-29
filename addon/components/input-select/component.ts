import BaseInput from '../BaseInput';
import SelectOption from 'ember-field-components/interfaces/SelectOption';
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember-decorators/service';

export default class InputSelectComponent extends BaseInput {
  @service intl !: any;

  type = 'select';
  required : boolean = false;
  noneLabel : string = '';
  selectOptions: SelectOption[] = [];

  @computed('computedValue', 'required')
  get showNone() : boolean {
    return isBlank(this.computedValue) || this.required === false;
  }

  @computed('computedValue', 'required')
  get noneDisabled() : boolean {
    return isBlank(this.computedValue) && this.required;
  }

  @computed('computedValue', 'required')
  get noneSelected() : boolean {
    return isBlank(this.computedValue) && this.required;
  }

  @computed('noneLabel', 'intl.local')
  get noneLabelComputed() : string {
    return isBlank(this.noneLabel) ? this.intl.t('ember-field-components.label.select_none') : this.noneLabel;
  }

  @computed('selectOptions.[]')
  get selectOptionsContainsValue() : boolean {
    let returnValue = false;

    for(const selectOption of this.selectOptions) {
      if(selectOption.value === this.value) {
        returnValue = true;
        break;
      }
    }

    return returnValue;
  }
}
