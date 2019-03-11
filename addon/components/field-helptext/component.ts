import Component from '@ember/component';
import FieldInformation from 'ember-field-components/services/field-information';
import Model from 'ember-data/model';
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember-decorators/service';

export default class FieldHelptextComponent extends Component {
  @service intl !: any;
  @service fieldInformation !: FieldInformation;

  tagName = '';

  model !: Model;
  field !: string;
  helptextClass : string = 'helptext';
  helptext : string = '';
  modelName: string = '';

  @computed('model', 'field', 'helptext', 'modelName', 'intl.locale')
  get helptextComputed() {
    if(!isBlank(this.helptext)){
      return this.helptext;
    }

    const modelName = isBlank(this.modelName) ? this.fieldInformation.getModelName(this.model) : this.modelName;

    if(this.intl.exists(`ember-field-components.${modelName}.helptexts.${this.field}`)) {
      return this.intl.t(`ember-field-components.${modelName}.helptexts.${this.field}`);
    } else if(this.intl.exists(`ember-field-components.global.helptexts.${this.field}`)) {
      return this.intl.t(`ember-field-components.global.helptexts.${this.field}`);
    }
  }
}
