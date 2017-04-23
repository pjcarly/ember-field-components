import Ember from 'ember';
import FieldInputComponent from '../../mixins/component-field-input-super';

const { Component, computed, isBlank } = Ember;

export default Component.extend(FieldInputComponent, {
  hasDecimals: computed('fieldAttributeOptions', function(){
    let fieldAttributeOptions = this.get('fieldAttributeOptions');

    return (!isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('decimals') && fieldAttributeOptions.decimals > 0);
  })
});
