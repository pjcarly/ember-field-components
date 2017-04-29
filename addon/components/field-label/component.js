import Ember from 'ember';
import ModelUtils from 'ember-field-components/classes/model-utils';

const { Component, inject, computed, isBlank } = Ember;
const { service } = inject;

export default Component.extend({
  store: service(),
  tagName: '',
  labelComputed: computed('model', 'field', 'label', 'modelTypeName', function(){
    const label = this.get('label');
    if(isBlank(label)){
      const { model, field, modelType } = this.getProperties('model', 'field', 'modelType');

      if(!isBlank(modelType)){
        return ModelUtils.getLabel(ModelUtils.getModelType(modelType, this.get('store')), field);
      } else {
        return ModelUtils.getLabel(model.constructor, field);
      }
    }
    else {
      return label;
    }
  })
});
