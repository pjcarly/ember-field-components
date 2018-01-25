import Ember from 'ember';
import { getHelptext, getModelType } from 'ember-field-components/classes/model-utils';

const { Component, inject, computed, isBlank } = Ember;
const { service } = inject;

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
