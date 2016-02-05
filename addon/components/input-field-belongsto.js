import Ember from 'ember';
import FieldInputComponent from '../mixins/component-field-input-super';

export default Ember.Component.extend(FieldInputComponent, {
  store: Ember.inject.service(),

  parentModelType: Ember.computed('field', 'model', function() {
    var field = this.get('field');
    var model = this.get('model');

    var relationships = Ember.get(model.constructor, 'relationshipsByName');

    if (relationships.has(field) && relationships.get(field).kind === 'belongsTo') {
      var relationship = relationships.get(field);
      return relationship.type;
    }
  }),

  parentModel: Ember.computed('field', 'model', function() {
    var relationshipType = this.get('parentModelType');
    var relationshipId = this.get('model').get(this.get('field')).get('id');
    if (!Ember.isNone(relationshipId)) {
      var store = this.get('store');
      return store.find(relationshipType, relationshipId);
    }
  })
});