import Ember from 'ember';
import FieldOutputComponent from '../mixins/component-field-output-super';

export default Ember.Component.extend(FieldOutputComponent, {
  store: Ember.inject.service(),
  link: true,

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
    var store = this.get('store');

    return store.findRecord(relationshipType, relationshipId);
  }),

  linkToType: Ember.computed('parentModelType', function() {
    return this.get('parentModelType') + '.view';
  })
});