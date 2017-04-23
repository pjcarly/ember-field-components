import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

const { Component, computed } = Ember;

export default Component.extend(InputComponent, {
  type: 'checkbox',
  hasPrefix: false,
  hasSuffix: false,
  isActive: computed('value', function() {
    return this.get('value');
  }),
  actions: {
    valueChanged: function() {
      this.set('value', !this.get('value'));
      this.sendAction('valueChanged', this.get('value'));
    }
  }
});
