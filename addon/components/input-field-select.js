import Ember from 'ember';
import FieldInputComponent from '../mixins/component-field-input-super';

export default Ember.Component.extend(FieldInputComponent, {
  selectoptions: Ember.computed('fieldOptions', 'value', function() {
    var fieldOptions = this.get('fieldOptions');

    if (!Ember.isBlank(fieldOptions.defaultValue) && Ember.isBlank(this.get('value'))) {
      this.set('value', fieldOptions.defaultValue);
    }

    return fieldOptions.selectOptions;
  }),
  isButtonGroup: Ember.computed(function() {
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return !Ember.isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widget') && fieldAttributeOptions.widget === 'button-group';
  }),
  actions: {
    valueSelected: function(value) {
      if (!Ember.isBlank(value)) {
        this.set('value', value);
      } else {
        this.set('value', null);
      }
    }
  }
});
