import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  computedValue: Ember.computed('value', {
    get: function() {
      var value = this.get('value');
      return value;
    },
    set: function(key, value) {
      this.set('value', value);
      this.sendAction('valueChanged', value);
      return value;
    }
  })
});