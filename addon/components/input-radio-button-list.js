import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'radio-button-list',
  hasPrefix: false,
  hasSuffix: false,
  emptyValue: Ember.computed('value', function(){
    return Ember.isBlank(this.get('value'));
  }),
  actions: {
    valueChanged: function(value) {
      this.set('value', value);
      this.sendAction('valueChanged', value);
    }
  }
});
