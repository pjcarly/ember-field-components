import Mixin from '@ember/object/mixin';
import FieldTypeComponent from '../mixins/component-field-type';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { isBlank } from '@ember/utils';

export default Mixin.create(FieldTypeComponent, {
  tagName: '',

  isBlankOrInline: computed('inline', function() {
    let field = this.get('field');
    let model = this.get('model');
    let inline = this.get('inline');

    let value = model.get(field);

    return inline || isEmpty(value);
  }),

  fieldOptions: computed('modelType', 'field', function() {
    let modelType = this.get('modelType');
    let field = this.get('field');

    const proto = modelType.proto();

    if(!(field in proto)){
      return;
    }

    // in the meta we find information about the property
    let meta = modelType.metaForProperty(field);

    if (meta.hasOwnProperty('options')) {
      return meta.options;
    }
  }),

  value: computed('model', 'field', {
    get: function() {
      let value = this.get('model').get(this.get('field'));
      return value;
    },
    set: function(key, value) {
      return this.setValue(value);
    }
  }),

  setValue(value){
    this.get('model').set(this.get('field'), value);
    return value;
  },

  notifyAction(){
    const valueChanged = this.get('valueChanged');
    if(!isBlank(valueChanged)){
      valueChanged(...arguments);
    }
  },

  actions: {
    valueChanged(value){
      this.setValue(value);
      this.notifyAction(...arguments);
    }
  }
});
