import Ember from 'ember';
import FieldOutputComponent from '../mixins/component-field-output-super';

export default Ember.Component.extend(FieldOutputComponent, {
  field: null,
  model: null,
  link: null,

  shouldLink: Ember.computed('field', 'modelType', 'link', function() {
    var link = this.get('link');

    if (!Ember.isNone(link)) {
      return link;
    }

    var field = this.get('field');
    var modelType = this.get('modelType');
    return modelType.settings.linkFields.contains(field);
  }),

  modelType: Ember.computed('model', function() {
    return this.get('model').constructor;
  }),

  modelView: Ember.computed('modelType', function() {
    return this.get('modelType').modelName + '.view';
  })
});