import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  actions: {
    valueSelected: function() {
      let value = this.$('select').val();
      this.sendAction('valueSelected', value);
    }
  }
});