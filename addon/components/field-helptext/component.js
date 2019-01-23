import Component from '@ember/component';
import { getModelName } from 'ember-field-components/classes/model-utils';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend({
  intl: service(),
  tagName: '',
  helptextComputed: computed('model', 'field', 'label', 'modelType', 'intl.locale', function(){
    const helptext = this.get('helptext');
    if(isBlank(helptext)){
      const { model, field, intl } = this.getProperties('model', 'field', 'intl');
      const modelType = isBlank(this.get('modelType')) ? getModelName(model) : this.get('modelType');

      if(intl.exists(`ember-field-components.${modelType}.helptexts.${field}`)) {
        return intl.t(`ember-field-components.${modelType}.helptexts.${field}`);
      } else if(intl.exists(`ember-field-components.global.helptexts.${field}`)) {
        return intl.t(`ember-field-components.global.helptexts.${field}`);
      }
    }
    else {
      return helptext;
    }
  })
});
