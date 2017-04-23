import Ember from 'ember';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { hasWidget } from '../../classes/model-utils';

const { Component, computed } = Ember;

export default Component.extend(FieldInputComponent, {
  isBootstrap: computed(function(){
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'bootstrap');
  })
});
