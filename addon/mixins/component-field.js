import Ember from 'ember';
import FieldTypeComponent from '../mixins/component-field-type';

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

    if (modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('labels') && modelType.settings.labels[field]) {
      return modelType.settings.labels[field];
    } else {
      return field.capitalize();
    }
  })
});