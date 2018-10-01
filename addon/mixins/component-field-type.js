import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { get } from '@ember/object';
import { assert } from '@ember/debug';

export default Mixin.create({
  componentName: computed('fieldType', 'type', 'isText', function(){
    let type = this.get('type');
    let fieldType = this.get('fieldType'); //input or output
    if(this.get('isText') || isBlank(type)){
      type = 'text';
    }
    let component = `${fieldType}-field-${type}`;
    return component.toLowerCase();
  }),

  isText: computed('type', 'field', function() {
    let type = this.get('type');
    return type === 'string' || type === 'computed' || this.get('field') === 'id';
  }),
  isNotBlankType: computed('type', function() {
    return !isBlank(this.get('type'));
  }),
  modelType: computed('model', function() {
    return this.get('model').constructor;
  }),
  modelAttributes: computed('modelType', function() {
    return get(this.get('modelType'), 'attributes');
  }),
  fieldAttributes: computed('modelAttributes', 'field', function() {
    let attributes = this.get('modelAttributes');
    let field = this.get('field');

    if (!isBlank(attributes) && attributes.has(field)) {
      let fieldAttributes = attributes.get(field);
      return fieldAttributes;
    }
  }),
  fieldAttributeOptions: computed('fieldAttributes', function() {
    let fieldAttributes = this.get('fieldAttributes');

    if (!isBlank(fieldAttributes) && fieldAttributes.hasOwnProperty('options')) {
      return fieldAttributes.options;
    }
  }),
  relationshipAttributes: computed('modelType', 'field', function() {
    let relationships = get(this.get('modelType'), 'relationshipsByName');
    let field = this.get('field');

    if (!isBlank(relationships) && relationships.has(field)) {
      let relationship = relationships.get(field);
      return relationship;
    }
  }),
  relationshipAttributeOptions: computed('relationshipAttributes', function() {
    let relationshipAttributes = this.get('relationshipAttributes');

    if (!isBlank(relationshipAttributes) && relationshipAttributes.hasOwnProperty('options')) {
      return relationshipAttributes.options;
    }
  }),
  type: computed('modelType', 'field', function() {
    const modelType = this.get('modelType');
    const proto = modelType.proto();

    if(!(this.get('field') in proto)){
      return;
    }

    // in the meta we find information about the property
    const meta = modelType.metaForProperty(this.get('field'));
    if (meta) {
      if (meta.isAttribute) {
        let returnValue = meta.type;
        // support for ember-data-model-fragments
        if(!isBlank(returnValue)){
          returnValue = returnValue.replace('-mf-fragment$', '');
        }

        return returnValue;
      } else if (meta.isRelationship) {
        return meta.kind;
      } else { // computed property
        assert('Computed properties you want to use in a input or output component, should have the meta information defined via .meta', meta.hasOwnProperty('type'));
        return meta.type;
      }
    }

    return null;
  })
});
