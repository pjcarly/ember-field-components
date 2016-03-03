import Ember from 'ember';
import FieldInputComponent from '../mixins/component-field-input-super';
import { hasWidget } from '../classes/model-utils';

export default Ember.Component.extend(FieldInputComponent, {
  isBootstrap: Ember.computed(function(){
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'bootstrap');
  })
});
