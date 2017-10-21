import Ember from 'ember';
import FieldComponent from '../../mixins/component-field';

const { Component } = Ember;
const { computed } = Ember;
const { guidFor } = Ember;
const { isBlank } = Ember;

export default Component.extend(FieldComponent, {
  fieldType: 'input',
  classNameBindings: ['isRequired:required', 'hasError:has-error', 'isReadOnly:read-only', 'hasFocus:has-focus'],
  inputId: computed(function(){
    return guidFor(this) + '-lbl';
  }),
  isRequired: computed('fieldAttributes', 'relationshipAttributes', function() {
    var fieldAttributes = this.get('fieldAttributes');

    if (!isBlank(fieldAttributes)) {
      // We found field attributes (meaning it is a proper field)
      if (fieldAttributes.hasOwnProperty('options') && fieldAttributes.options.hasOwnProperty('validation') && fieldAttributes.options.validation.hasOwnProperty('required')) {
        // lets now see if there is a validation hash available, with required indicator
        return fieldAttributes.options.validation.required;
      }
    } else {
      // No field attributes, perhaps the field is a relationship
      var relationshipAttributes = this.get('relationshipAttributes');

      if (!isBlank(relationshipAttributes)) {
        if (relationshipAttributes.hasOwnProperty('options') && relationshipAttributes.options.hasOwnProperty('validation') && relationshipAttributes.options.validation.hasOwnProperty('required')) {
          return relationshipAttributes.options.validation.required;
        }
      }
    }

    return this.get('required'); // No information found, we return a potential attribute, default it is false.
  }),
  focusIn(){
    this.set('hasFocus', true);
  },
  focusOut(){
    this.set('hasFocus', false);
  },
  isReadOnly: computed('fieldAttributes', function() {
    var fieldAttributes = this.get('fieldAttributes');

    if (!isBlank(fieldAttributes) && fieldAttributes.hasOwnProperty('options') && fieldAttributes.options.hasOwnProperty('readOnly')) {
      return fieldAttributes.options.readOnly;
    }

    return false;
  }),
  hasError: computed('model.errors.[]', function() {
    var errors = this.get('model.errors');

    return errors.has(this.get('field'));
  }),
  actions: {
    valueChanged(){
      if(this.get('valueChanged')){
        this.get('valueChanged')(...arguments);
      }
    }
  }
});
