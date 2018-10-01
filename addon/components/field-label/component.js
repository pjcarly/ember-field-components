import Ember from 'ember';
import { getLabel, getModelType } from 'ember-field-components/classes/model-utils';

import Component from '@ember/component';

import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  tagName: '',
  labelComputed: computed('model', 'field', 'label', 'modelTypeName', function(){
    const label = this.get('label');
    if(isBlank(label)){
      const { model, field, modelType } = this.getProperties('model', 'field', 'modelType');

      if(!isBlank(modelType)){
        return getLabel(getModelType(modelType, this.get('store')), field);
      } else {
        return getLabel(model.constructor, field);
      }
    }
    else {
      return label;
    }
  })
});
