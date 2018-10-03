import OutputField from '../output-field/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { isBlank } from '@ember/utils';

export default OutputField.extend({
  fieldType: 'input',
  classNameBindings: ['isRequired:required', 'hasError:has-error', 'isReadOnly:read-only', 'hasFocus:has-focus'],
  inputId: computed(function(){
    return guidFor(this) + '-lbl';
  }),
  isRequired: computed('fieldAttributes', 'relationshipAttributes', function() {
    const fieldAttributes = this.get('fieldAttributes');

    if (!isBlank(fieldAttributes)) {
      // We found field attributes (meaning it is a proper field)
      if (fieldAttributes.hasOwnProperty('options') && fieldAttributes.options.hasOwnProperty('validation')){

        if(fieldAttributes.options.validation.hasOwnProperty('required')) {
          // lets now see if there is a validation hash available, with required indicator
          return fieldAttributes.options.validation.required;
        }
        if(fieldAttributes.options.validation.hasOwnProperty('requiredAddress')) {
          // lets now see if there is a validation hash available, with requiredAddress indicator
          return fieldAttributes.options.validation.requiredAddress;
        }
      }
    } else {
      // No field attributes, perhaps the field is a relationship
      const relationshipAttributes = this.get('relationshipAttributes');

      if (!isBlank(relationshipAttributes)) {
        if (relationshipAttributes.hasOwnProperty('options') && relationshipAttributes.options.hasOwnProperty('validation') && relationshipAttributes.options.validation.hasOwnProperty('required')) {
          return relationshipAttributes.options.validation.required;
        }
      }
    }

    return this.get('required'); // No information found, we return a potential attribute, defaults to false.
  }),
  focusIn(){
    this.set('hasFocus', true);
  },
  focusOut(){
    this.set('hasFocus', false);
  },
  isReadOnly: computed('fieldAttributes', function() {
    const fieldAttributes = this.get('fieldAttributes');

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
