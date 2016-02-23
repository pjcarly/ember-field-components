import Ember from 'ember';
import FieldInputComponent from '../mixins/component-field-input-super';
import { hasWidget } from '../classes/model-utils';

export default Ember.Component.extend(FieldInputComponent, {
  selectOptions: Ember.computed('fieldOptions', 'value', function() {
    var fieldOptions = this.get('fieldOptions');

    if (!Ember.isBlank(fieldOptions.defaultValue) && Ember.isBlank(this.get('value'))) {
      this.set('value', fieldOptions.defaultValue);
    }

    return fieldOptions.selectOptions;
  }),
  isButtonGroup: Ember.computed(function() {
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'button-group');
  }),
  isSelectSearch: Ember.computed(function() {
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
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
