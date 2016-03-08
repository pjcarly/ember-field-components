import Ember from 'ember';
import FieldInputComponent from '../mixins/component-field-input-super';

export default Ember.Component.extend(FieldInputComponent, {
  hasDecimals: Ember.computed('fieldAttributeOptions', function(){
    let fieldAttributeOptions = this.get('fieldAttributeOptions');

    return (!Ember.isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('decimals') && fieldAttributeOptions.decimals > 0);
  })
});
