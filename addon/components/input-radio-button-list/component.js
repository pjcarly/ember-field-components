import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

const { Component, computed, isBlank } = Ember;

export default Component.extend(InputComponent, {
  type: 'radio-button-list',
  hasPrefix: false,
  hasSuffix: false,
  emptyValue: computed('value', function(){
    return isBlank(this.get('value'));
  }),
  actions: {
    valueChanged: function(value) {
      this.set('value', value);
      this.sendAction('valueChanged', value);
    }
  }
});
