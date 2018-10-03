import Component from '@ember/component';
import InputComponent from '../../mixins/component-input';

export default Component.extend(InputComponent, {
  type: 'button-group',
  actions: {
    valueChanged(value) {
      this.notifyAction(value);
    }
  }
});
