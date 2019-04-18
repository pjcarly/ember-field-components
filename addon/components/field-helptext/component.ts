import Component from '@ember/component';
import FieldInformation from 'ember-field-components/services/field-information';
import Model from 'ember-data/model';
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember-decorators/service';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default class FieldHelptextComponent extends Component {
  @service intl !: any;
  @service fieldInformation !: FieldInformation;

  model !: Model;
  field !: string;
  helptextClass : string = 'helptext';
  helptext : string = '';
  modelName: string = '';

  @computed('model', 'field', 'helptext', 'modelName', 'intl.locale')
  get helptextComputed() {
    if(!isBlank(this.helptext)) {
      return this.helptext;
    }

    const modelName = isBlank(this.modelName) ? this.fieldInformation.getModelName(this.model) : this.modelName;
    return this.fieldInformation.getTranslatedFieldHelptext(modelName, this.field);
  }
}
