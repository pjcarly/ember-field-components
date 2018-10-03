import Component from '@ember/component';
import InputComponent from '../../mixins/component-input';
import { computed } from '@ember/object';

export default Component.extend(InputComponent, {
  type: 'switch',
  hasPrefix: false,
  hasSuffix: false,
  isActive: computed(function() {
    return this.get('value');
  }),
  actions: {
    valueChanged() {
      this.set('value', !this.get('value'));
      this.notifyAction(this.get('value'));
    }
  }
});
