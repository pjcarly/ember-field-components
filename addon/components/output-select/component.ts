import BaseOutput from "../BaseOutput";
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember-decorators/service';
import SelectOption from 'ember-field-components/interfaces/SelectOption';

export default class OutputSelectComponent extends BaseOutput {
  @service intl !: any;

  type = 'select';
  selectOptions !: SelectOption[];

  @computed('value')
  get selectedLabel() : string | undefined {
    if(!isBlank(this.value)) {
      const selectedOption = this.selectOptions.findBy('value', this.value);

      if(!isBlank(selectedOption)) {
        return selectedOption.label;
      }
    }

    return;
  }
}
