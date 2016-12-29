import Ember from 'ember';
import ModelUtils from 'ember-field-components/classes/model-utils';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  tagName: '',
  labelComputed: Ember.computed('model', 'field', 'modelTypeName', function(){
    const label = this.get('label');
    if(Ember.isBlank(label)){
      const { model, field, modelType } = this.getProperties('model', 'field', 'modelType');

      if(!Ember.isBlank(modelType)){
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
