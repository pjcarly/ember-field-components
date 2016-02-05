import Ember from 'ember';
import FieldInputComponent from '../mixins/component-field-input-super';

export default Ember.Component.extend(FieldInputComponent, {
  isSwitch: Ember.computed(function() {
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return !Ember.isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widget') && fieldAttributeOptions.widget === 'switch';
  })
});