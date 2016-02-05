import Ember from 'ember';
import FieldOutputComponent from '../mixins/component-field-output-super';

export default Ember.Component.extend(FieldOutputComponent, {
  isSwitch: Ember.computed(function() {
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return !Ember.isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widget') && fieldAttributeOptions.widget === 'switch';
  })
});