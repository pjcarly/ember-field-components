import Ember from 'ember';
import FieldTypeComponent from '../mixins/component-field-type';

const { Mixin, computed, isEmpty } = Ember;

export default Mixin.create(FieldTypeComponent, {
  tagName: '',

  isBlankOrInline: computed('inline', function() {
    let field = this.get('field');
    let model = this.get('model');
    let inline = this.get('inline');

    let value = model.get(field);

    return inline || isEmpty(value);
  }),

  fieldOptions: computed('model', 'field', function() {
    let model = this.get('model');
    let field = this.get('field');

    let protoKey = model.constructor.proto()[field];
    if (protoKey) {
      // in the meta we find information about the property
      let meta = model.constructor.metaForProperty(field);

      if (meta.hasOwnProperty('options')) {
        return meta.options;
      }
    }
  }),

  value: computed('model', 'field', {
    get: function() {
      let value = this.get('model').get(this.get('field'));
      return value;
    },
    set: function(key, value) {
      this.get('model').set(this.get('field'), value);
      return value;
    }
  }),

  actions: {
    valueChanged: function(value) {
      this.get('model').set(this.get('field'), value);

      if(this.get('valueChanged')){
        this.get('valueChanged')(...arguments);
      }
    }
  }
});
