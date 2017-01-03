import Ember from 'ember';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { hasWidget } from '../../classes/model-utils';

export default Ember.Component.extend(FieldInputComponent, {
  isResizeable: Ember.computed(function() {
    const fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'resizeable');
  })
});
