import BaseOutput from '../BaseOutput';
import FieldInformationService from 'ember-field-components/services/field-information';
import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';

export default class OutputTimeComponent extends BaseOutput {
  @service fieldInformation !: FieldInformationService;

  type = 'time';

  @computed('options.format', 'fieldInformation.timeFormat')
  get momentFormat() : string {
    if(isBlank(this.options) || isBlank(this.options.format)) {
      return this.fieldInformation.timeFormat;
    } else {
      return this.options.format;
    }
  }
}
