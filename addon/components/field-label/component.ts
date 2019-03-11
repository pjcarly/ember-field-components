import Component from '@ember/component';
import Model from 'ember-data/model';
import FieldInformation from 'ember-field-components/services/field-information';
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember-decorators/service';

export default class LabelComponent extends Component {
  @service intl !: any;
  @service fieldInformation !: FieldInformation;

  tagName = '';
  label : string = '';
  modelName : string = '';
  field !: string;
  model !: Model;

  @computed('model', 'field', 'label', 'modelType', 'intl.locale')
  get labelComputed() {
    if(!isBlank(this.label)) {
      return this.label;
    }

    const modelName = isBlank(this.modelName) ? this.fieldInformation.getModelName(this.model) : this.modelName;
    if(this.intl.exists(`ember-field-components.${modelName}.fields.${this.field}`)) {
      return this.intl.t(`ember-field-components.${modelName}.fields.${this.field}`);
    } else if(this.intl.exists(`ember-field-components.global.fields.${this.field}`)) {
      return this.intl.t(`ember-field-components.global.fields.${this.field}`);
    } else {
      return capitalize(this.field);
    }
  }
}
