import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'checkbox',
  hasPrefix: false,
  hasSuffix: false,
  isActive: Ember.computed('value', function() {
    return this.get('value');
  }),
  actions: {
    valueChanged: function(value) {
      this.set('value', !this.get('value'));
      this.sendAction('valueChanged', this.get('value'));
    }
  }
});
