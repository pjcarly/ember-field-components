import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'button-group',
  actions: {
    valueChanged: function(value) {
      this.controller.set('value', value);
      this.sendAction('valueChanged', value);
    }
  }
});
