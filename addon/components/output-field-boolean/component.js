import Component from '@ember/component';
import FieldOutputComponent from '../../mixins/component-field-output-super';
import { hasWidget } from '../../classes/model-utils';
import { computed } from '@ember/object';

export default Component.extend(FieldOutputComponent, {
  isSwitch: computed(function() {
    let fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'switch');
  })
});
