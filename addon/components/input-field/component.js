import Ember from 'ember';
import FieldComponent from '../../mixins/component-field';

export default Ember.Component.extend(FieldComponent, {
  fieldType: 'input',
  classNameBindings: ['isRequired:required', 'hasError:has-error', 'isReadOnly:read-only'],
  inputId: Ember.computed(function(){
    return Ember.guidFor(this) + '-lbl';
  }),
  isRequired: Ember.computed('fieldAttributes', 'relationshipAttributes', function() {
    var fieldAttributes = this.get('fieldAttributes');

    if (!Ember.isNone(fieldAttributes)) {
      // We found field attributes (meaning it is a proper field)
      if (fieldAttributes.hasOwnProperty('options') && fieldAttributes.options.hasOwnProperty('validation') && fieldAttributes.options.validation.hasOwnProperty('required')) {
        // lets now see if there is a validation hash available, with required indicator
        return fieldAttributes.options.validation.required;
      }
    } else {
      // No field attributes, perhaps the field is a relationship
      var relationshipAttributes = this.get('relationshipAttributes');

      if (!Ember.isNone(relationshipAttributes)) {
        if (relationshipAttributes.hasOwnProperty('options') && relationshipAttributes.options.hasOwnProperty('validation') && relationshipAttributes.options.validation.hasOwnProperty('required')) {
          return relationshipAttributes.options.validation.required;
        }
      }
    }

    return false; // No information found, lets just assume not required
  }),
  isReadOnly: Ember.computed('fieldAttributes', function() {
    var fieldAttributes = this.get('fieldAttributes');

    if (!Ember.isNone(fieldAttributes) && fieldAttributes.hasOwnProperty('options') && fieldAttributes.options.hasOwnProperty('readOnly')) {
      return fieldAttributes.options.readOnly;
    }

    return false;
  })
});
