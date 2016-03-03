import Ember from 'ember';
import FieldTypeComponent from '../mixins/component-field-type';

export default Ember.Mixin.create(FieldTypeComponent, {
  tagName: 'span',
  field: null,
  model: null,
  link: null,
  inline: false,

  isBlankOrInline: Ember.computed('inline', function() {
    let field = this.get('field');
    let model = this.get('model');
    let inline = this.get('inline');

    let value = model.get(field);

    return inline || Ember.isEmpty(value);
  }),

  fieldOptions: Ember.computed('model', 'field', function() {
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

  formatGetter: function(value) {
    return value;
  },

  formatSetter: function(value) {
    return value;
  },

  value: Ember.computed('model', 'field', {
    get: function() {
      let value = this.formatGetter(this.get('model').get(this.get('field')));
      return value;
    },
    set: function(key, value) {
      Ember.run.once(this, function() {
        value = this.formatSetter(value);
        this.get('model').set(this.get('field'), value);
      });

      return value;
    }
  }),

  actions: {
    valueChanged: function(value) {
      this.get('model').set(this.get('field'), value);
    }
  }
});
