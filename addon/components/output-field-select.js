import Ember from 'ember';
import FieldOutputComponent from '../mixins/component-field-output-super';

export default Ember.Component.extend(FieldOutputComponent, {
  selectOptions: Ember.computed(function() {
    var fieldOptions = this.get('fieldOptions');
    return fieldOptions.selectOptions;
  })
});
