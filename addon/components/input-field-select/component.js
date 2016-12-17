import Ember from 'ember';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { hasWidget } from '../../classes/model-utils';

export default Ember.Component.extend(FieldInputComponent, {
  init(){
    this._super(...arguments);
  },
  selectOptions: Ember.computed('fieldOptions', 'value', function() {
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.selectOptions;
  }),
  isRequired: Ember.computed('fieldOptions', function(){
    return !this.get('fieldOptions').validation.required;
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
    valueChanged: function(value) {
      if (!Ember.isBlank(value)) {
        this.set('value', value);
      } else {
        this.set('value', null);
      }
    }
  }
});
