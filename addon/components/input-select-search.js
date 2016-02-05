import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  didInsertElement: function() {
    var domElement = this.$('select');
    domElement.selectpicker();
  },
  actions: {
    valueSelected: function() {
      let value = this.$('select').val();
      this.sendAction('valueSelected', value);
    }
  }
});