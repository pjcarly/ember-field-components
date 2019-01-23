import Component from '@ember/component';
import { getModelName } from 'ember-field-components/classes/model-utils';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';

export default Component.extend({
  intl: service(),
  tagName: '',
  labelComputed: computed('model', 'field', 'label', 'modelType', 'intl.locale', function(){
    const label = this.get('label');

    if(isBlank(label)){
      const { model, field, intl } = this.getProperties('model', 'field', 'intl');
      const modelType = isBlank(this.get('modelType')) ? getModelName(model) : this.get('modelType');

      if(intl.exists(`ember-field-components.${modelType}.fields.${field}`)) {
        return intl.t(`ember-field-components.${modelType}.fields.${field}`);
      } else if(intl.exists(`ember-field-components.global.fields.${field}`)) {
        return intl.t(`ember-field-components.global.fields.${field}`);
      } else {
        return capitalize(field);
      }
    }
    else {
      return label;
    }
  })
});
