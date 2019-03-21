import InputField from '../input-field/component';
import SelectOption from 'ember-field-components/interfaces/SelectOption';
import { computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { capitalize } from '@ember/string';
import { isArray } from '@ember/array';

export default class InputFieldSelectComponent extends InputField {
  @service intl !: any;

  @computed('fieldOptions', 'intl.locale')
  get selectOptions() : SelectOption[] {
    const fieldOptions = this.fieldOptions;
    const selectOptions : SelectOption[] = [];

    if(!fieldOptions.hasOwnProperty('selectOptions') || !isArray(fieldOptions.selectOptions)) {
      return selectOptions;
    }

    for(const fieldSelectOption of fieldOptions.selectOptions) {
      const selectOption : SelectOption = {
        value: fieldSelectOption.value
      };

      selectOption.label = this.getSelectOptionLabel(fieldSelectOption.value);
      selectOptions.push(selectOption);
    }

    return selectOptions;
  }

  @computed('fieldOptions')
  get noneLabel() {
    return this.fieldOptions.noneLabel;
  }

  getSelectOptionLabel(value : string) {
    if(this.intl.exists(`ember-field-components.${this.modelName}.select.${this.field}.${value}`)) {
      return this.intl.t(`ember-field-components.${this.modelName}.select.${this.field}.${value}`);
    } else if(this.intl.exists(`ember-field-components.global.select.${this.field}.${value}`)) {
      return this.intl.t(`ember-field-components.global.select.${this.field}.${value}`);
    } else {
      return capitalize(value);
    }
  }
}
