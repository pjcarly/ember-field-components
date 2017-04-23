import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

const { Component, computed } = Ember;

export default Component.extend(InputComponent, {
  type: 'switch',
  hasPrefix: false,
  hasSuffix: false,
  isActive: computed(function() {
    return this.get('value');
  }),
  actions: {
    valueChanged: function() {
      this.set('value', !this.get('value'));
      this.sendAction('valueChanged', this.get('value'));
    }
  }
});
