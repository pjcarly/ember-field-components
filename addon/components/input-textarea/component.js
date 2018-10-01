import Component from '@ember/component';
import InputComponent from '../../mixins/component-input';
import ComputedValue from '../../mixins/component-computed-value';

export default Component.extend(InputComponent, ComputedValue, {
  type: 'textarea',
  hasPrefix: false,
  hasSuffix: false
});
