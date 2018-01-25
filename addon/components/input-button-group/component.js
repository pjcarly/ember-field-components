import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

const { Component } = Ember;

export default Component.extend(InputComponent, {
  type: 'button-group',
  actions: {
    valueChanged: function(value) {
      this.sendAction('valueChanged', value);
    }
  }
});
