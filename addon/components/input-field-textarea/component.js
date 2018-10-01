import Ember from 'ember';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { hasWidget } from '../../classes/model-utils';

import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend(FieldInputComponent, {
  isResizeable: computed(function() {
    const fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'resizeable');
  })
});
