import Ember from 'ember';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { hasWidget } from '../../classes/model-utils';

export default Ember.Component.extend(FieldInputComponent, {
  selectOptions: Ember.computed('fieldOptions', 'value', function() {
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.selectOptions;
  }),
  isRequired: Ember.computed('fieldOptions', function(){
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.hasOwnProperty('validation') && fieldOptions.validation.hasOwnProperty('required') && fieldOptions.validation.required;
  }),
  isButtonGroup: Ember.computed(function() {
    const fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'button-group');
  }),
  isSelectSearch: Ember.computed(function() {
    const fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'select-search');
  }),
  actions: {
    valueChanged(value) {
      if (!Ember.isBlank(value)) {
        this.set('value', value);
        this.sendAction('valueChanged', value);
      } else {
        this.set('value', null);
        this.sendAction('valueChanged', null);
      }
    }
  }
});
