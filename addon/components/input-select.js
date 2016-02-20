import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'select',
  hasPrefix: false,
  hasSuffix: false,
  emptyValue: Ember.computed('value', function(){
    return Ember.isBlank(this.get('value'));
  }),
  actions: {
    valueChanged: function() {
      let value = this.$('select').val();
      this.sendAction('valueChanged', value);
    }
  }
});
