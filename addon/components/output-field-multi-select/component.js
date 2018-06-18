import Ember from 'ember';
import FieldOutputComponent from '../../mixins/component-field-output-super';

const { Component, computed } = Ember;

export default Component.extend(FieldOutputComponent, {
  selectOptions: computed(function() {
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.selectOptions;
  }),
  none: computed(function(){
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.none;
  })
});
