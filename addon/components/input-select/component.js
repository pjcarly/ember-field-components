import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'select',
  hasPrefix: false,
  hasSuffix: false,
  emptyValue: Ember.computed('value', function(){
    return Ember.isBlank(this.get('value'));
  }),
  computedValue: Ember.computed('value', function(){
    let value = this.get('value');
    if(!Ember.isBlank(value)){
      return this.get('value').toString();
    }
  }),
  actions: {
    valueChanged: function() {
      let value = this.$('select').val();
      this.sendAction('valueChanged', value);
    }
  }
});
