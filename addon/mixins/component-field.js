import Ember from 'ember';
import FieldTypeComponent from '../mixins/component-field-type';
import ModelUtils from '../classes/model-utils';

export default Ember.Mixin.create(FieldTypeComponent, {
  model: null,
  field: null,
  inline: false,
  link: null,

  isInline: Ember.computed('inline', function() {
    return !this.get('inline');
  }),
  label: Ember.computed('modelType', 'field', function() {
    var modelType = this.get('modelType');
    var field = this.get('field');

    return ModelUtils.getLabel(modelType, field);
  })
});
