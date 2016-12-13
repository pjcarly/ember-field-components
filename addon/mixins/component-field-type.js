import Ember from 'ember';

export default Ember.Mixin.create({
  componentName: Ember.computed('fieldType', 'type', 'isText', function(){
    let type = this.get('type');
    let fieldType = this.get('fieldType'); //input or output
    if(this.get('isText') || Ember.isBlank(type)){
      type = 'text';
    }
    let component = `${fieldType}-field-${type}`;
    return component.toLowerCase();
  }),

  isText: Ember.computed('type', 'field', function() {
    let type = this.get('type');
    return type === 'string' || type === 'computed' || this.get('field') === 'id';
  }),
  isNotBlankType: Ember.computed('type', function() {
    return !Ember.isBlank(this.get('type'));
  }),
  modelType: Ember.computed('model', function() {
    return this.get('model').constructor;
  }),
  modelAttributes: Ember.computed('modelType', function() {
    return Ember.get(this.get('modelType'), 'attributes');
  }),
  fieldAttributes: Ember.computed('modelAttributes', 'field', function() {
    let attributes = this.get('modelAttributes');
    let field = this.get('field');

    if (!Ember.isBlank(attributes) && attributes.has(field)) {
      let fieldAttributes = attributes.get(field);
      return fieldAttributes;
    }
  }),
  fieldAttributeOptions: Ember.computed('fieldAttributes', function() {
    let fieldAttributes = this.get('fieldAttributes');

    if (!Ember.isBlank(fieldAttributes) && fieldAttributes.hasOwnProperty('options')) {
      return fieldAttributes.options;
    }
  }),
  relationshipAttributes: Ember.computed('model', 'field', function() {
    let relationships = Ember.get(this.get('modelType'), 'relationshipsByName');
    let field = this.get('field');

    if (!Ember.isBlank(relationships) && relationships.has(field)) {
      let relationship = relationships.get(field);
      return relationship;
    }
  }),
  type: Ember.computed('model', 'field', function() {
    let model = this.get('model');
    let protoKey = model.constructor.proto()[this.get('field')];
    if (protoKey) {
      // in the meta we find information about the property
      let meta = model.constructor.metaForProperty(this.get('field'));

      if (meta) {
        if (meta.isAttribute) {
          return meta.type;
        } else if (meta.isRelationship) {
          return meta.kind;
        } else { // computed property
          Ember.assert('Computed properties you want to use in a input or output component, should have the meta information defined via .meta', meta.hasOwnProperty('type'));
          return meta.type;
        }
      }
    }

    return null;
  })
});
