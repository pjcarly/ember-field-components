import Component from '@ember/component';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { hasWidget } from '../../classes/model-utils';
import { computed } from '@ember/object';

export default Component.extend(FieldInputComponent, {
  isBootstrap: computed(function(){
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'bootstrap');
  })
});
