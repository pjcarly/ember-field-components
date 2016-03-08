import Ember from 'ember';
import FieldOutputComponent from '../mixins/component-field-output-super';
import { hasWidget } from '../../classes/model-utils';

export default Ember.Component.extend(FieldOutputComponent, {
  isSwitch: Ember.computed(function() {
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'switch');
  })
});
