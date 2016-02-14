import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  actions: {
    valueSelected: function(value) {
      this.controller.set('value', value);
      this.sendAction('valueSelected', value);
    }
  }
});
