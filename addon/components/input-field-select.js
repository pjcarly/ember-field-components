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
  actions: {
    valueSelected: function(value) {

      if (!Ember.isBlank(value)) {
        this.set('value', value);
      } else {
        this.set('value', null);
      }

      this.notifyPropertyChange('model');
    }
  }
});