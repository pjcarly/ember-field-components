import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'switch',
  hasPrefix: false,
  hasSuffix: false,
  isActive: Ember.computed(function() {
    return this.get('value');
  }),
  actions: {
    valueChanged: function() {
      this.set('value', !this.get('value'));
      this.sendAction('valueChanged', this.get('value'));
    }
  }
});
