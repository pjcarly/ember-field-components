import Component from '@ember/component';
import { getHelptext, getModelType } from 'ember-field-components/classes/model-utils';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  tagName: '',
  helptextComputed: computed('model', 'field', 'label', 'modelTypeName', function(){
    const helptext = this.get('helptext');
    if(isBlank(helptext)){
      const { model, field, modelType } = this.getProperties('model', 'field', 'modelType');

      if(!isBlank(modelType)){
        return getHelptext(getModelType(modelType, this.get('store')), field);
      } else {
        return getHelptext(model.constructor, field);
      }
    }
    else {
      return helptext;
    }
  })
});
