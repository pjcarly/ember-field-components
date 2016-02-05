import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  isActive: Ember.computed('value', function() {
    return this.get('value');
  }),
  actions: {
    valueChanged: function() {
      this.sendAction('valueChanged', this.get('value'));
    }
  }
});